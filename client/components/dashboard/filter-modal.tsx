"use client";
import React, { useCallback } from "react";
import { Search, X } from "lucide-react";
import {
  MainFilterBackdrop,
  MainFilterModal,
  MainFilterHeader,
  MainFilterContent,
  MainFilterSearch,
  MainFilterListItem,
  MainFilterItemHeader,
  MainFilterExpandIcon,
  MainFilterOptionsContainer,
  MainFilterOptions,
  MainFilterOption,
  MainFilterCheckbox,
  MainFilterFooter,
  Button,
} from "./style";

interface FilterState {
  [key: string]: string[];
}

interface FilterOption {
  key: string;
  label: string;
  options: string[];
}

interface ActiveFilter {
  key: string;
  value: string;
  label: string;
}

interface FilterModalProps {
  isOpen: boolean;
  filterOptions: FilterOption[];
  filters: FilterState;
  activeFilters: ActiveFilter[];
  openFilterDropdowns: { [key: string]: boolean };
  onClose: () => void;
  onFilterChange: (columnKey: string, value: string) => void;
  onClearAllFilters: () => void;
  onToggleFilterSection: (key: string) => void;
}

const FilterModal: React.FC<FilterModalProps> = ({
  isOpen,
  filterOptions,
  filters,
  activeFilters,
  openFilterDropdowns,
  onClose,
  onFilterChange,
  onClearAllFilters,
  onToggleFilterSection,
}) => {
  const handleModalClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
  }, []);

  const handleInputInteraction = useCallback((e: React.MouseEvent | React.FocusEvent) => {
    e.stopPropagation();
  }, []);

  const handleFilterOptionClick = useCallback(
    (e: React.MouseEvent, key: string, option: string) => {
      e.stopPropagation();
      e.preventDefault();
      onFilterChange(key, option);
    },
    [onFilterChange]
  );

  const handleSectionToggle = useCallback(
    (e: React.MouseEvent, key: string) => {
      e.stopPropagation();
      onToggleFilterSection(`modal-${key}`);
    },
    [onToggleFilterSection]
  );

  const handleClearAll = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onClearAllFilters();
    },
    [onClearAllFilters]
  );

  const handleApplyFilters = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onClose();
    },
    [onClose]
  );

  if (!isOpen) return null;

  return (
    <>
      <MainFilterBackdrop onClick={onClose} />
      <MainFilterModal
        data-modal-container
        onClick={handleModalClick}
        onMouseDown={handleModalClick}
        onMouseUp={handleModalClick}
      >
        <MainFilterHeader>
          <h2 style={{ margin: 0, fontSize: 20, fontWeight: 600 }}>Filters</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X size={20} />
          </Button>
        </MainFilterHeader>

        <MainFilterContent>
          <MainFilterSearch style={{ marginBottom: 24 }}>
            <Search
              size={16}
              style={{
                position: "absolute",
                left: 12,
                top: "50%",
                transform: "translateY(-50%)",
                color: "hsl(var(--muted-foreground))",
              }}
            />
            <input
              type="text"
              placeholder="Search all filters..."
              onClick={handleInputInteraction}
              onFocus={handleInputInteraction}
              onChange={(e) => e.stopPropagation()}
              style={{
                width: "100%",
                paddingLeft: 40,
                paddingRight: 12,
                paddingTop: 12,
                paddingBottom: 12,
                border: "1px solid hsl(var(--border))",
                borderRadius: 8,
                fontSize: 14,
                backgroundColor: "hsl(var(--background))",
                color: "hsl(var(--foreground))",
              }}
            />
          </MainFilterSearch>

          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {filterOptions.map(({ key, label, options }) => {
              const hasActiveFilters = filters[key]?.length > 0;
              const isExpanded = openFilterDropdowns[`modal-${key}`] || false;

              return (
                <MainFilterListItem key={key}>
                  <MainFilterItemHeader
                    onClick={(e) => handleSectionToggle(e, key)}
                    onMouseDown={handleModalClick}
                    isActive={hasActiveFilters}
                  >
                    <span style={{ fontSize: 16, fontWeight: hasActiveFilters ? 600 : 400 }}>
                      {label}
                      {hasActiveFilters && (
                        <span
                          style={{
                            marginLeft: 8,
                            fontSize: 12,
                            backgroundColor: "hsl(var(--primary))",
                            color: "white",
                            padding: "2px 6px",
                            borderRadius: 10,
                          }}
                        >
                          {filters[key]?.length}
                        </span>
                      )}
                    </span>
                    <MainFilterExpandIcon isExpanded={isExpanded}>
                      {isExpanded ? (
                        <X size={18} />
                      ) : (
                        <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                          <line x1={12} y1={5} x2={12} y2={19}></line>
                          <line x1={5} y1={12} x2={19} y2={12}></line>
                        </svg>
                      )}
                    </MainFilterExpandIcon>
                  </MainFilterItemHeader>

                  {isExpanded && (
                    <MainFilterOptionsContainer>
                      <MainFilterSearch style={{ marginBottom: 12 }}>
                        <Search
                          size={14}
                          style={{
                            position: "absolute",
                            left: 12,
                            top: "50%",
                            transform: "translateY(-50%)",
                            color: "hsl(var(--muted-foreground))",
                          }}
                        />
                        <input
                          type="text"
                          placeholder={`Search ${label.toLowerCase()}...`}
                          onClick={handleInputInteraction}
                          onFocus={handleInputInteraction}
                          onChange={(e) => e.stopPropagation()}
                          style={{
                            width: "100%",
                            paddingLeft: 36,
                            paddingRight: 12,
                            paddingTop: 8,
                            paddingBottom: 8,
                            border: "1px solid hsl(var(--border))",
                            borderRadius: 6,
                            fontSize: 13,
                            backgroundColor: "hsl(var(--muted))",
                            color: "hsl(var(--foreground))",
                          }}
                        />
                      </MainFilterSearch>

                      <MainFilterOptions>
                        {options.map((option) => {
                          const isSelected = filters[key]?.includes(option) || false;
                          return (
                            <MainFilterOption
                              key={option}
                              onClick={(e) => handleFilterOptionClick(e, key, option)}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                padding: "8px 12px",
                                cursor: "pointer",
                                borderRadius: 4,
                                backgroundColor: isSelected ? "hsl(var(--accent))" : "transparent",
                                marginBottom: 2,
                              }}
                            >
                              <span style={{ fontSize: 14 }}>{option}</span>
                              <MainFilterCheckbox selected={isSelected}>
                                {isSelected && (
                                  <svg width={12} height={12} viewBox="0 0 20 20" fill="currentColor" style={{ color: "white" }}>
                                    <path
                                      fillRule="evenodd"
                                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                )}
                              </MainFilterCheckbox>
                            </MainFilterOption>
                          );
                        })}
                      </MainFilterOptions>
                    </MainFilterOptionsContainer>
                  )}
                </MainFilterListItem>
              );
            })}
          </div>
        </MainFilterContent>

        <MainFilterFooter>
          {activeFilters.length > 0 && (
            <Button variant="outline" onClick={handleClearAll} style={{ marginBottom: 8, width: "100%" }}>
              Clear all ({activeFilters.length})
            </Button>
          )}
          <Button onClick={handleApplyFilters} style={{ width: "100%" }}>
            Apply Filters
          </Button>
        </MainFilterFooter>
      </MainFilterModal>
    </>
  );
};

export default FilterModal;
