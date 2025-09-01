"use client";
/** @jsxImportSource @emotion/react */
import React, { useState, useEffect, useCallback } from "react";
import { Global } from "@emotion/react";
import { Search, Filter, RefreshCw, X } from "lucide-react";
import { toast, Toaster } from "sonner";
import { globalStyles } from "@/styles/global";
import { appTheme } from "@/styles/themes/appTheme";
import {
  DashboardContainer,
  MainContent,
  Header,
  HeaderContent,
  DashboardTitle,
  DashboardSubtitle,
  MainContentLayout,
  TableSection,
  FilterCard,
  FilterCardHeader,
  FilterCardTitle,
  FilterCardSubtitle,
  FilterContainer,
  FilterGrid,
  FilterGroup,
  Button,
  SearchBarContainer,
  SearchInputWrapper,
  SearchIcon,
  SearchInput,
  SearchButton,
  RefreshButton,
  ActiveFiltersSection,
  ActiveFiltersLabel,
  ActiveFiltersContainer,
  FilterBadge,
  FilterBadgeClose,
  ClearAllButton,
  FilterResults,
  ErrorContainer,
  ErrorText,
  AllFiltersButton,
  ClearAllFiltersButton,
  RetryButton,
} from "./style";

import DashboardTable, { TableDataRow, ColumnMetadata } from "./table";
import FilterDropdown from "./filter-dropdown";
import FilterModal from "./filter-modal";
import TimelineFilter from "./timeline-filter";
import { useBusinessStore } from "@/store/business-store";
import { srGetDashboardTableData, srGetMonitoringData } from "@/sources/dashboard";
import Loader from "../common/loader";

interface FilterState {
  [key: string]: string[];
}

export interface ColumnData {
  [key: string]: ColumnMetadata;
}

export interface DashboardResponse {
  status: boolean;
  code: number;
  respMessage: string;
  tableData: TableDataRow[];
  columnData: ColumnData;
}

export interface FilterDataItem {
  key: string;
  operator: "EQUALS" | "IN" | "BETWEEN" | "LIKE";
  value?: string | string[];
  from?: string;
  to?: string;
}

// Helper function to convert datetime input format to ISO string
const parseDateTimeToISO = (dateTimeString: string): string | null => {
  try {
    const [datePart, timePart] = dateTimeString.split(" ");
    if (!datePart || !timePart) return null;

    const [day, month, year] = datePart.split("/");
    const [hours, minutes, seconds] = timePart.split(":");

    const date = new Date(
      parseInt(year),
      parseInt(month) - 1,
      parseInt(day),
      parseInt(hours),
      parseInt(minutes),
      parseInt(seconds),
    );

    return date.toISOString();
  } catch (error) {
    console.error("Error parsing datetime:", error);
    return null;
  }
};

// Transform filters state to API format
const transformFiltersToAPIFormat = (
  filters: FilterState,
  manualFilterInputs: { [key: string]: string },
  searchTerm: string,
  startDateTime: string,
  endDateTime: string,
): FilterDataItem[] => {
  const filterData: FilterDataItem[] = [];

  // Add regular filters (from dropdown selections)
  Object.entries(filters).forEach(([key, values]) => {
    if (values && values.length > 0) {
      if (values.length === 1) {
        // Single value - use EQUALS
        filterData.push({
          key,
          operator: "EQUALS",
          value: values[0],
        });
      } else {
        // Multiple values - use IN
        filterData.push({
          key,
          operator: "IN",
          value: values,
        });
      }
    }
  });

  // Add manual filter inputs (from text inputs for non-searchable columns)
  Object.entries(manualFilterInputs).forEach(([key, value]) => {
    if (value && value.trim()) {
      // Use LIKE operator for manual text inputs
      filterData.push({
        key,
        operator: "LIKE",
        value: value.trim(),
      });
    }
  });

  // Add search term if present
  if (searchTerm.trim()) {
    filterData.push({
      key: "search", // TODO: Make this configurable from API response
      operator: "LIKE",
      value: searchTerm.trim(),
    });
  }

  // Add date range if both start and end are present
  if (startDateTime && endDateTime) {
    const startDate = parseDateTimeToISO(startDateTime);
    const endDate = parseDateTimeToISO(endDateTime);

    if (startDate && endDate) {
      filterData.push({
        key: "created_at", // TODO: Make this configurable from API response
        operator: "BETWEEN",
        from: startDate,
        to: endDate,
      });
    }
  }

  return filterData;
};

export default function TaskManagementDashboard() {
  const [data, setData] = useState<DashboardResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filteredData, setFilteredData] = useState<TableDataRow[]>([]);
  const [filters, setFilters] = useState<FilterState>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [showMainFilter, setShowMainFilter] = useState(false);
  const [showTimelineFilter, setShowTimelineFilter] = useState(false);
  const [startDateTime, setStartDateTime] = useState("");
  const [endDateTime, setEndDateTime] = useState("");
  const [openFilterDropdowns, setOpenFilterDropdowns] = useState<{
    [key: string]: boolean;
  }>({});
  const [isFilterLoading, setIsFilterLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [manualFilterInputs, setManualFilterInputs] = useState<{
    [key: string]: string;
  }>({});
  const { selectedBusiness } = useBusinessStore();

  // Function to apply filters and fetch data from API
  const applyFiltersAndFetchData = useCallback(async () => {
    try {
      setIsFilterLoading(true);
      setError(null);

      const bussId = selectedBusiness?.bussId || "default"; // TODO: Handle missing business selection properly
      const filterData = transformFiltersToAPIFormat(
        filters,
        manualFilterInputs,
        searchTerm,
        startDateTime,
        endDateTime,
      );

      console.log("Applying filters with data:", {
        bussId,
        filterData,
      });

      const response = await srGetDashboardTableData({
        bussId,
        filterData: filterData.length > 0 ? filterData : null,
      });

      console.log("Filtered dashboard data received:", response);
      setData(response);
      setFilteredData(response.tableData);
    } catch (err) {
      console.error("Filter fetch error:", err);
      setError("Failed to apply filters and fetch data.");
    } finally {
      setIsFilterLoading(false);
    }
  }, [
    filters,
    manualFilterInputs,
    searchTerm,
    startDateTime,
    endDateTime,
    selectedBusiness,
  ]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;

      // Don't close if clicking inside modal or dropdown containers
      if (
        target.closest('[data-dropdown-container="true"]') ||
        target.closest("[data-dropdown-container]") ||
        target.closest("[data-modal-container]") ||
        target.closest(".filter-content") ||
        target.closest("input") ||
        target.closest("button")
      ) {
        return;
      }

      // Only close if we're not interacting with filter elements
      if (!target.closest(".css-la24vj") && !target.closest(".css-bb8i8d")) {
        setOpenFilterDropdowns({});
        setShowTimelineFilter(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const bussId = selectedBusiness?.bussId || "default"; // TODO: Handle missing business selection properly
      try {
        setLoading(true);
        setError(null);

        const response = await srGetDashboardTableData({
          bussId: bussId,
          filterData: null,
        });
        setData(response);
        setFilteredData(response.tableData);

        const initialFilters: FilterState = {};
        Object.keys(response.columnData).forEach((key) => {
          if (response.columnData[key].filterable) {
            initialFilters[key] = [];
          }
        });
        setFilters(initialFilters);
      } catch (err) {
        setError("Failed to initialize dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedBusiness]);

  // Apply filters and search
  useEffect(() => {
    if (!data) return;

    let filtered = data.tableData;

    // Apply search
    if (searchTerm) {
      filtered = filtered.filter((row) => {
        return Object.entries(data.columnData).some(([key, columnInfo]) => {
          if (columnInfo.searchable === true) {
            const value = row[key];
            return (
              value && value.toLowerCase().includes(searchTerm.toLowerCase())
            );
          }
          return false;
        });
      });
    }

    // Apply filters
    Object.entries(filters).forEach(([filterKey, filterValues]) => {
      if (filterValues && filterValues.length > 0) {
        filtered = filtered.filter((row) =>
          filterValues.includes(row[filterKey] || ""),
        );
      }
    });

    setFilteredData(filtered);
  }, [data, filters, searchTerm]);

  const handleFilterChange = useCallback((columnKey: string, value: string) => {
    if (value === "all") {
      // Clear all selections for this filter
      setFilters((prev) => ({
        ...prev,
        [columnKey]: [],
      }));
    } else {
      // Toggle the selection
      setFilters((prev) => {
        const currentValues = prev[columnKey] || [];
        const isSelected = currentValues.includes(value);

        return {
          ...prev,
          [columnKey]: isSelected
            ? currentValues.filter((v) => v !== value)
            : [...currentValues, value],
        };
      });
    }
  }, []);

  const toggleFilterDropdown = useCallback(
    (columnKey: string) => {
      // Don't allow opening dropdowns if modal is open
      if (showMainFilter) return;

      // Close timeline filter if it's open
      setShowTimelineFilter(false);

      setOpenFilterDropdowns((prev) => {
        // Close all other dropdowns and toggle the current one
        const newState: { [key: string]: boolean } = {};

        // Get all filterable columns to ensure we initialize all keys
        if (data && data.columnData) {
          Object.keys(data.columnData).forEach((key) => {
            if (data.columnData[key] && data.columnData[key].filterable) {
              newState[key] = key === columnKey ? !prev[columnKey] : false;
            }
          });
        }

        return newState;
      });
    },
    [data, showMainFilter],
  );

  const toggleTimelineDropdown = useCallback(() => {
    // Don't allow opening timeline filter if modal is open
    if (showMainFilter) return;

    // Close all other filter dropdowns
    setOpenFilterDropdowns({});
    setShowTimelineFilter(!showTimelineFilter);
  }, [showTimelineFilter, showMainFilter]);

  const clearAllFilters = useCallback(() => {
    const clearedFilters: FilterState = {};
    Object.keys(filters).forEach((key) => {
      clearedFilters[key] = [];
    });
    setFilters(clearedFilters);
    setManualFilterInputs({});
    setSearchTerm("");
    setOpenFilterDropdowns({});
  }, [filters]);

  const clearIndividualFilter = useCallback((filterKey: string) => {
    setFilters((prev) => ({
      ...prev,
      [filterKey]: [],
    }));
    // Also clear manual input for this filter
    setManualFilterInputs((prev) => {
      const newInputs = { ...prev };
      delete newInputs[filterKey];
      return newInputs;
    });
  }, []);

  const handleManualFilterChange = useCallback((key: string, value: string) => {
    setManualFilterInputs((prev) => ({
      ...prev,
      [key]: value,
    }));
  }, []);

  const getFilterOptions = useCallback(
    (columnKey: string) => {
      if (
        !data ||
        !data.columnData ||
        !data.columnData[columnKey] ||
        !data.columnData[columnKey].filerValues
      ) {
        return [];
      }
      return data.columnData[columnKey]
        .filerValues!.split(",")
        .map((val) => val.trim())
        .filter((val) => val.length > 0);
    },
    [data],
  );

  const getMainFilterOptions = useCallback(() => {
    if (!data) return [];
    return Object.entries(data.columnData)
      .filter(([, columnInfo]) => columnInfo.filterable === true)
      .map(([key, columnInfo]) => ({
        key,
        label: columnInfo.label,
        options: getFilterOptions(key),
        searchable: columnInfo.searchable,
      }));
  }, [data, getFilterOptions]);

  const getActiveFilters = useCallback(() => {
    const activeFilters: Array<{
      key: string;
      value: string;
      label: string;
      type?: string;
    }> = [];

    // Add dropdown filter selections
    Object.entries(filters).forEach(([key, values]) => {
      if (values && values.length > 0 && data?.columnData[key]) {
        values.forEach((value) => {
          activeFilters.push({
            key,
            value,
            label: data.columnData[key].label,
            type: "dropdown",
          });
        });
      }
    });

    // Add manual filter inputs
    Object.entries(manualFilterInputs).forEach(([key, value]) => {
      if (value && value.trim() && data?.columnData[key]) {
        activeFilters.push({
          key,
          value: value.trim(),
          label: data.columnData[key].label,
          type: "manual",
        });
      }
    });

    if (searchTerm) {
      activeFilters.push({
        key: "search",
        value: searchTerm,
        label: "Search",
        type: "search",
      });
    }

    return activeFilters;
  }, [filters, manualFilterInputs, searchTerm, data]);

  // Timeline Filter helpers
  const formatDateTimeForInput = useCallback((date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  }, []);

  const parseDateTimeFromInput = useCallback((value: string) => {
    const [datePart, timePart] = value.split(" ");
    if (!datePart || !timePart) return null;

    const [day, month, year] = datePart.split("/");
    const [hours, minutes, seconds] = timePart.split(":");

    return new Date(
      parseInt(year),
      parseInt(month) - 1,
      parseInt(day),
      parseInt(hours),
      parseInt(minutes),
      parseInt(seconds),
    );
  }, []);

  const validateAndAdjustTimeRange = useCallback(
    (start: string, end: string, isStartChanged: boolean) => {
      const startDate = parseDateTimeFromInput(start);
      const endDate = parseDateTimeFromInput(end);

      if (!startDate || !endDate) return { start, end };

      const diffInMs = endDate.getTime() - startDate.getTime();
      const maxDiffMs = 5 * 60 * 1000; // 5 minutes in milliseconds

      if (diffInMs > maxDiffMs) {
        if (isStartChanged) {
          // Adjust end time to be start + 5 minutes
          const newEndDate = new Date(startDate.getTime() + maxDiffMs);
          return { start, end: formatDateTimeForInput(newEndDate) };
        } else {
          // Adjust start time to be end - 5 minutes
          const newStartDate = new Date(endDate.getTime() - maxDiffMs);
          return { start: formatDateTimeForInput(newStartDate), end };
        }
      }

      if (diffInMs < 0) {
        if (isStartChanged) {
          // Set end to start + 1 minute
          const newEndDate = new Date(startDate.getTime() + 60000);
          return { start, end: formatDateTimeForInput(newEndDate) };
        } else {
          // Set start to end - 1 minute
          const newStartDate = new Date(endDate.getTime() - 60000);
          return { start: formatDateTimeForInput(newStartDate), end };
        }
      }

      return { start, end };
    },
    [parseDateTimeFromInput, formatDateTimeForInput],
  );

  const handleStartDateTimeChange = useCallback(
    (value: string) => {
      const adjusted = validateAndAdjustTimeRange(value, endDateTime, true);
      setStartDateTime(adjusted.start);
      setEndDateTime(adjusted.end);
    },
    [endDateTime, validateAndAdjustTimeRange],
  );

  const handleEndDateTimeChange = useCallback(
    (value: string) => {
      const adjusted = validateAndAdjustTimeRange(startDateTime, value, false);
      setStartDateTime(adjusted.start);
      setEndDateTime(adjusted.end);
    },
    [startDateTime, validateAndAdjustTimeRange],
  );

  // Handle search button click
  const handleSearchClick = useCallback(() => {
    // Trigger search - the effect will handle the actual filtering
    // Since searchTerm is already being watched by useEffect, we just need to ensure it's applied
    console.log("Search triggered with term:", searchTerm);
  }, [searchTerm]);

  // Handle refresh button click
  const handleRefreshClick = useCallback(async () => {
    try {
      setIsRefreshing(true);
      setError(null);

      const bussId = selectedBusiness?.bussId || null;

      // Set time to current time - 15 minutes
      const now = new Date();
      const fifteenMinutesAgo = new Date(now.getTime() - 15 * 60 * 1000);

      const timeRange = {
        startTime: fifteenMinutesAgo.toISOString(),
        endTime: now.toISOString(),
      };

      console.log("Refreshing data with time range:", timeRange);

      const response = await srGetMonitoringData({
        bussId: bussId || "default",
        timeRange,
      });

      console.log("Monitoring data refreshed:", response);
      setData(response);
      setFilteredData(response.tableData);

      // Show success message
      toast.success("Data refreshed successfully!");
    } catch (err) {
      console.error("Refresh error:", err);
      setError("Failed to refresh monitoring data.");
      toast.error("Failed to refresh data. Please try again.");
    } finally {
      setIsRefreshing(false);
    }
  }, [selectedBusiness]);

  const initializeDefaultTimeRange = useCallback(() => {
    const now = new Date();
    const start = new Date(now.getTime() - 5 * 60 * 1000); // 5 minutes ago
    setStartDateTime(formatDateTimeForInput(start));
    setEndDateTime(formatDateTimeForInput(now));
  }, [formatDateTimeForInput]);

  // Initialize default time range on first load
  useEffect(() => {
    if (!startDateTime && !endDateTime) {
      initializeDefaultTimeRange();
    }
  }, [startDateTime, endDateTime, initializeDefaultTimeRange]);

  // Close all dropdowns when modal opens
  useEffect(() => {
    if (showMainFilter) {
      setOpenFilterDropdowns({});
      setShowTimelineFilter(false);
    }
  }, [showMainFilter]);

  if (error) {
    return (
      <>
        <Global styles={globalStyles(appTheme)} />
        <ErrorContainer>
          <ErrorText>Error: {error}</ErrorText>
          <RetryButton onClick={() => window.location.reload()}>
            <RefreshCw size={16} />
            Retry
          </RetryButton>
        </ErrorContainer>
      </>
    );
  }

  if (loading) {
    return <Loader size="lg" />;
  }

  const activeFilters = getActiveFilters();
  const hasSearchableColumns = Object.values(data?.columnData || []).some(
    (col) => col.searchable,
  );
  const hasFilterableColumns = Object.values(data?.columnData || []).some(
    (col) => col.filterable,
  );

  return (
    <>
      <Global styles={globalStyles(appTheme)} />
      <Toaster />
      <DashboardContainer>
        <MainContent>
          <MainContentLayout>
            {(hasSearchableColumns || hasFilterableColumns) && (
              <FilterCard>
                <FilterCardHeader>
                  <FilterCardTitle>
                    <Filter size={20} />
                    Filter & Search
                  </FilterCardTitle>
                  <FilterCardSubtitle>
                    Filter your data by categories, search through records, or
                    set time ranges to find exactly what you need
                  </FilterCardSubtitle>
                </FilterCardHeader>

                <FilterContainer show={true}>
                  <FilterGrid>
                    <TimelineFilter
                      startDateTime={startDateTime}
                      endDateTime={endDateTime}
                      isOpen={showTimelineFilter}
                      onToggle={toggleTimelineDropdown}
                      onStartDateTimeChange={handleStartDateTimeChange}
                      onEndDateTimeChange={handleEndDateTimeChange}
                      onReset={initializeDefaultTimeRange}
                      onApply={() => setShowTimelineFilter(false)}
                    />

                    {data &&
                      data.columnData &&
                      Object.entries(data.columnData)
                        .filter(
                          ([, columnInfo]) =>
                            columnInfo && columnInfo.filterable === true,
                        )
                        .slice(0, 3)
                        .map(([columnKey, columnInfo]) => (
                          <FilterDropdown
                            key={columnKey}
                            label={columnInfo.label}
                            columnKey={columnKey}
                            options={getFilterOptions(columnKey)}
                            selectedValues={filters[columnKey] || []}
                            isOpen={openFilterDropdowns[columnKey] || false}
                            onToggle={toggleFilterDropdown}
                            onFilterChange={handleFilterChange}
                          />
                        ))}

                    <FilterGroup>
                      <AllFiltersButton
                        onClick={() => {
                          setShowMainFilter(true);
                          setOpenFilterDropdowns({});
                          setShowTimelineFilter(false);
                        }}
                      >
                        <Filter size={16} />
                        <span>All Filters</span>
                      </AllFiltersButton>
                    </FilterGroup>
                  </FilterGrid>

                  <SearchBarContainer>
                    <SearchInputWrapper>
                      <SearchIcon>
                        <Search size={20} />
                      </SearchIcon>
                      <SearchInput
                        type="text"
                        placeholder={
                          hasSearchableColumns
                            ? "Search through all records and data..."
                            : "Search is disabled - no searchable columns available"
                        }
                        value={searchTerm}
                        onChange={(e) =>
                          hasSearchableColumns && setSearchTerm(e.target.value)
                        }
                        onKeyPress={(e) => {
                          if (e.key === "Enter" && hasSearchableColumns) {
                            handleSearchClick();
                          }
                        }}
                        disabled={!hasSearchableColumns}
                      />
                    </SearchInputWrapper>
                    <SearchButton
                      onClick={
                        hasSearchableColumns ? handleSearchClick : undefined
                      }
                      disabled={!hasSearchableColumns}
                      title={
                        hasSearchableColumns
                          ? "Search through records"
                          : "Search is disabled - no searchable columns available"
                      }
                    >
                      <Search size={18} />
                      Search
                    </SearchButton>
                    <RefreshButton
                      onClick={handleRefreshClick}
                      disabled={isRefreshing}
                      title="Refresh monitoring data (current time - 15 minutes)"
                    >
                      <RefreshCw
                        size={16}
                        className={isRefreshing ? 'animate-spin' : undefined}
                      />
                      {isRefreshing ? 'Refreshing...' : 'Refresh'}
                    </RefreshButton>
                  </SearchBarContainer>

                  {activeFilters.length > 0 && (
                    <ActiveFiltersSection>
                      <ActiveFiltersLabel>Active Filters:</ActiveFiltersLabel>
                      <ActiveFiltersContainer>
                        {activeFilters.map((filter) => (
                          <FilterBadge key={`${filter.key}-${filter.value}`}>
                            {filter.type === "manual" && "?? "}
                            {filter.type === "search" && "?? "}
                            {filter.label}: {filter.value}
                            <FilterBadgeClose
                              onClick={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                if (filter.key === "search") {
                                  setSearchTerm("");
                                } else {
                                  // Check if it's a manual filter input or dropdown filter
                                  if (
                                    manualFilterInputs[filter.key] ===
                                    filter.value
                                  ) {
                                    // Clear manual filter input
                                    setManualFilterInputs((prev) => {
                                      const newInputs = { ...prev };
                                      delete newInputs[filter.key];
                                      return newInputs;
                                    });
                                  } else {
                                    // Clear dropdown filter
                                    clearIndividualFilter(filter.key);
                                  }
                                }
                              }}
                            >
                              <X size={12} />
                            </FilterBadgeClose>
                          </FilterBadge>
                        ))}
                        <ClearAllFiltersButton
                          onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            clearAllFilters();
                          }}
                        >
                          <X size={12} />
                          Clear All
                        </ClearAllFiltersButton>
                      </ActiveFiltersContainer>
                    </ActiveFiltersSection>
                  )}

                  <FilterResults>
                    Showing {filteredData.length} of {data?.tableData?.length}{" "}
                    results
                  </FilterResults>
                </FilterContainer>
              </FilterCard>
            )}

            <TableSection>
              <DashboardTable
                data={filteredData}
                columnData={data?.columnData || {}}
              />
            </TableSection>
          </MainContentLayout>
        </MainContent>

        <FilterModal
          isOpen={showMainFilter}
          filterOptions={getMainFilterOptions()}
          filters={filters}
          manualFilterInputs={manualFilterInputs}
          activeFilters={activeFilters}
          openFilterDropdowns={openFilterDropdowns}
          onClose={() => setShowMainFilter(false)}
          onFilterChange={handleFilterChange}
          onManualFilterChange={handleManualFilterChange}
          onClearAllFilters={clearAllFilters}
          onToggleFilterSection={(key: string) => {
            setOpenFilterDropdowns((prev) => ({
              ...prev,
              [key]: !prev[key],
            }));
          }}
          onApplyFilters={applyFiltersAndFetchData}
        />
      </DashboardContainer>
    </>
  );
}
