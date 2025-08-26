"use client";
/** @jsxImportSource @emotion/react */
import React, { useState, useEffect, useCallback } from "react";
import { Global } from "@emotion/react";
import { Search, Filter, RefreshCw, X } from "lucide-react";
import { toast, Toaster } from "sonner";
import { ThemeControllerProvider } from "../../styles/theme-controller";
import { globalStyles } from "../../styles/global-styles";
import { appTheme } from "../../styles/themes";
import {
  DashboardContainer,
  MainContent,
  Header,
  FilterContainer,
  FilterGrid,
  FilterGroup,
  Button,
  SearchBarContainer,
  SearchIcon,
  SearchInput,
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

import FilterDropdown from "./filter-dropdown";
import FilterModal from "./filter-modal";
import TimelineFilter from "./timeline-filter";
import { useBusinessStore } from "../../store/business-store";
import { srGetDashboardTableData } from "../../sources/dashboard";
import Loader from "../common/loader";

interface FilterState {
  [key: string]: string[];
}

export interface TableDataRow {
  [key: string]: string | null;
}

export interface ColumnMetadata {
  label: string;
  filterable: boolean;
  searchable: boolean;
  hidden: boolean;
  filerValues?: string;
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
  const { selectedBusiness } = useBusinessStore();

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;

      // Don't close if clicking inside modal or dropdown containers
      if (
        target.closest("[data-dropdown-container]") ||
        target.closest("[data-modal-container]") ||
        target.closest("input") ||
        target.closest("button")
      ) {
        return;
      }

      setOpenFilterDropdowns({});
      setShowTimelineFilter(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const bussId = selectedBusiness?.bussId;
      if (!bussId) return;
      try {
        setLoading(true);
        setError(null);

        const response = await srGetDashboardTableData({
          bussId: selectedBusiness?.bussId,
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
    [data],
  );

  const toggleTimelineDropdown = useCallback(() => {
    // Close all other filter dropdowns
    setOpenFilterDropdowns({});
    setShowTimelineFilter(!showTimelineFilter);
  }, [showTimelineFilter]);

  const clearAllFilters = useCallback(() => {
    const clearedFilters: FilterState = {};
    Object.keys(filters).forEach((key) => {
      clearedFilters[key] = [];
    });
    setFilters(clearedFilters);
    setSearchTerm("");
    setOpenFilterDropdowns({});
  }, [filters]);

  const clearIndividualFilter = useCallback((filterKey: string) => {
    setFilters((prev) => ({
      ...prev,
      [filterKey]: [],
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
      }));
  }, [data, getFilterOptions]);

  const getActiveFilters = useCallback(() => {
    const activeFilters: Array<{ key: string; value: string; label: string }> =
      [];

    Object.entries(filters).forEach(([key, values]) => {
      if (values && values.length > 0 && data?.columnData[key]) {
        values.forEach((value) => {
          activeFilters.push({
            key,
            value,
            label: data.columnData[key].label,
          });
        });
      }
    });

    if (searchTerm) {
      activeFilters.push({
        key: "search",
        value: searchTerm,
        label: "Search",
      });
    }

    return activeFilters;
  }, [filters, searchTerm, data]);

  const copyToClipboard = useCallback((text: string) => {
    // Use setTimeout to ensure toast is called outside of render cycle
    setTimeout(() => {
      try {
        const textToCopy = text || "";
        // Create a temporary textarea element
        const textarea = document.createElement("textarea");
        textarea.value = textToCopy;
        textarea.style.position = "fixed";
        textarea.style.left = "-9999px";
        textarea.style.top = "-9999px";
        document.body.appendChild(textarea);
        textarea.select();
        const success = document.execCommand("copy");
        document.body.removeChild(textarea);

        // Show success message
        if (success) {
          toast.success("Text copied!");
        } else {
          toast.error("Failed to copy text");
        }
      } catch (error) {
        console.error("Copy failed:", error);
        toast.error("Failed to copy text");
      }
    }, 0);
  }, []);

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

  if (error) {
    return (
      <ThemeControllerProvider>
        <Global styles={globalStyles(appTheme)} />
        <ErrorContainer>
          <ErrorText>Error: {error}</ErrorText>
          <RetryButton onClick={() => window.location.reload()}>
            <RefreshCw size={16} />
            Retry
          </RetryButton>
        </ErrorContainer>
      </ThemeControllerProvider>
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
    <ThemeControllerProvider>
      <Global styles={globalStyles(appTheme)} />
      <Toaster />
      <DashboardContainer>
        <MainContent>
          <Header>
            {(hasSearchableColumns || hasFilterableColumns) && (
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

                  {Object.entries(data?.columnData || [])
                    .filter(([, columnInfo]) => columnInfo.filterable === true)
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
                    <AllFiltersButton onClick={() => setShowMainFilter(true)}>
                      <Filter size={16} />
                      <span>All Filters</span>
                    </AllFiltersButton>
                  </FilterGroup>
                </FilterGrid>

                {hasSearchableColumns && (
                  <SearchBarContainer>
                    <SearchIcon>
                      <Search size={20} />
                    </SearchIcon>
                    <SearchInput
                      type="text"
                      placeholder="Search records..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </SearchBarContainer>
                )}

                {activeFilters.length > 0 && (
                  <ActiveFiltersSection>
                    <ActiveFiltersLabel>Active Filters:</ActiveFiltersLabel>
                    <ActiveFiltersContainer>
                      {activeFilters.map((filter) => (
                        <FilterBadge key={`${filter.key}-${filter.value}`}>
                          {filter.label}: {filter.value}
                          <FilterBadgeClose
                            onClick={(e) => {
                              e.stopPropagation();
                              e.preventDefault();
                              if (filter.key === "search") {
                                setSearchTerm("");
                              } else {
                                clearIndividualFilter(filter.key);
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
            )}
          </Header>

          <Table
            columns={Object.entries(data?.columnData || {})
              .filter(([, columnInfo]) => columnInfo && !columnInfo.hidden)
              .map(([key, columnInfo]) => ({
                key,
                label: columnInfo.label,
                minWidth: "150px",
              }))}
            data={filteredData}
            showPagination={true}
            pageSize={5}
            onCellClick={(value, rowData, columnKey) => {
              const textValue = typeof value === "string" ? value : String(value || "");
              copyToClipboard(textValue);
            }}
            minHeight="450px"
          />
        </MainContent>

        <FilterModal
          isOpen={showMainFilter}
          filterOptions={getMainFilterOptions()}
          filters={filters}
          activeFilters={activeFilters}
          openFilterDropdowns={openFilterDropdowns}
          onClose={() => setShowMainFilter(false)}
          onFilterChange={handleFilterChange}
          onClearAllFilters={clearAllFilters}
          onToggleFilterSection={(key: string) => {
            setOpenFilterDropdowns((prev) => ({
              ...prev,
              [key]: !prev[key],
            }));
          }}
        />
      </DashboardContainer>
    </ThemeControllerProvider>
  );
}
