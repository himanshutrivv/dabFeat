"use client";
import React, { useCallback, useState, useMemo } from "react";
import { Search, X, Filter, ChevronRight, Sparkles } from "lucide-react";
import {
  FilterModalBackdrop,
  FilterModalContainer,
  FilterModalHeader,
  FilterModalHeaderTitle,
  FilterModalCloseButton,
  FilterModalContent,
  FilterModalSearch,
  FilterModalSearchIcon,
  FilterModalSearchInput,
  FilterModalSeparator,
  FilterModalSectionContent,
  FilterModalListItem,
  FilterModalItemHeader,
  FilterModalHeaderContent,
  FilterModalTitle,
  FilterModalCount,
  FilterModalExpandIcon,
  FilterModalOptionsContainer,
  FilterModalOptionsInner,
  FilterModalSectionSearchContainer,
  FilterModalSectionSearchIcon,
  FilterModalSectionSearchInput,
  FilterModalOptionItem,
  FilterModalOptionText,
  FilterModalCheckbox,
  FilterModalCheckIcon,
  FilterModalEmptyState,
  FilterModalEmptyIcon,
  FilterModalManualContainer,
  FilterModalManualLabel,
  FilterModalManualInput,
  FilterModalTypeIcon,
  FilterModalFooter,
  FilterModalButtonContainer,
  FilterModalButton,
} from "./style";

interface FilterState {
  [key: string]: string[];
}

interface FilterOption {
  key: string;
  label: string;
  options: string[];
  searchable?: boolean;
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
  manualFilterInputs: { [key: string]: string };
  activeFilters: ActiveFilter[];
  openFilterDropdowns: { [key: string]: boolean };
  onClose: () => void;
  onFilterChange: (columnKey: string, value: string) => void;
  onManualFilterChange: (key: string, value: string) => void;
  onClearAllFilters: () => void;
  onToggleFilterSection: (key: string) => void;
  onApplyFilters: () => Promise<void>;
}


const FilterModal: React.FC<FilterModalProps> = ({
  isOpen,
  filterOptions,
  filters,
  manualFilterInputs,
  activeFilters,
  openFilterDropdowns,
  onClose,
  onFilterChange,
  onManualFilterChange,
  onClearAllFilters,
  onToggleFilterSection,
  onApplyFilters,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sectionSearchTerms, setSectionSearchTerms] = useState<{
    [key: string]: string;
  }>({});
  // Remove local state as it's now managed by parent

  // Filter options based on search term (internal search for filtering columns)
  const filteredOptions = useMemo(() => {
    if (!searchTerm.trim()) return filterOptions;

    return filterOptions.filter(
      (option) =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
        option.options.some((opt) =>
          opt.toLowerCase().includes(searchTerm.toLowerCase()),
        ),
    );
  }, [filterOptions, searchTerm]);

  // Filter individual section options based on section-specific search
  const getFilteredSectionOptions = useCallback(
    (options: string[], sectionKey: string, isSearchable: boolean) => {
      // If not searchable, return all options
      if (!isSearchable) return options;

      const sectionSearch = sectionSearchTerms[sectionKey];
      if (!sectionSearch?.trim()) return options;

      return options.filter((option) =>
        option.toLowerCase().includes(sectionSearch.toLowerCase()),
      );
    },
    [sectionSearchTerms],
  );

  // Handle section search change
  const handleSectionSearchChange = useCallback(
    (sectionKey: string, value: string) => {
      setSectionSearchTerms((prev) => ({
        ...prev,
        [sectionKey]: value,
      }));
    },
    [],
  );

  // Handle manual filter input change
  const handleManualFilterInputChange = useCallback(
    (sectionKey: string, value: string) => {
      onManualFilterChange(sectionKey, value);
    },
    [onManualFilterChange],
  );

  const handleModalClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
  }, []);

  const handleInputInteraction = useCallback(
    (e: React.MouseEvent | React.FocusEvent) => {
      e.stopPropagation();
    },
    [],
  );

  const handleFilterOptionClick = useCallback(
    (e: React.MouseEvent, key: string, option: string) => {
      e.stopPropagation();
      e.preventDefault();
      onFilterChange(key, option);
    },
    [onFilterChange],
  );

  const handleSectionToggle = useCallback(
    (e: React.MouseEvent, key: string) => {
      e.stopPropagation();
      onToggleFilterSection(`modal-${key}`);
    },
    [onToggleFilterSection],
  );

  const handleClearAll = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onClearAllFilters();
    },
    [onClearAllFilters],
  );

  const handleApplyFilters = useCallback(
    async (e: React.MouseEvent) => {
      e.stopPropagation();
      try {
        await onApplyFilters();
        onClose();
      } catch (error) {
        console.error("Error applying filters:", error);
        // Keep modal open if there's an error
      }
    },
    [onApplyFilters, onClose],
  );

  // Clear section search terms when modal closes
  React.useEffect(() => {
    if (!isOpen) {
      setSectionSearchTerms({});
      setSearchTerm("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      <FilterModalBackdrop onClick={onClose} />
      <FilterModalContainer
        data-modal-container
        onClick={handleModalClick}
        onMouseDown={handleModalClick}
        onMouseUp={handleModalClick}
      >
        <FilterModalHeader>
          <FilterModalHeaderTitle>
            <Sparkles size={20} />
            Advanced Filters
          </FilterModalHeaderTitle>
          <FilterModalCloseButton onClick={onClose}>
            <X size={18} />
          </FilterModalCloseButton>
        </FilterModalHeader>

        <FilterModalContent>
          {/* Internal search for filtering available filter options/columns */}
          <FilterModalSearch>
            <FilterModalSearchIcon>
              <Search size={16} />
            </FilterModalSearchIcon>
            <FilterModalSearchInput
              type="text"
              placeholder="Search filter categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onClick={handleInputInteraction}
              onFocus={handleInputInteraction}
            />
          </FilterModalSearch>

          <FilterModalSeparator />

          <FilterModalSectionContent>
            {filteredOptions.length === 0 ? (
              <FilterModalEmptyState>
                <FilterModalEmptyIcon>🔍</FilterModalEmptyIcon>
                <h3>No filters found</h3>
                <p>Try adjusting your search terms</p>
              </FilterModalEmptyState>
            ) : (
              filteredOptions.map(({ key, label, options, searchable }) => {
                const hasActiveFilters = filters[key]?.length > 0;
                const isExpanded = openFilterDropdowns[`modal-${key}`] || false;
                const isSearchable = searchable !== false;

                return (
                  <FilterModalListItem
                    key={key}
                    className={isExpanded ? "expanded" : ""}
                  >
                    <FilterModalItemHeader
                      onClick={(e) => handleSectionToggle(e, key)}
                      onMouseDown={handleModalClick}
                      isActive={hasActiveFilters}
                      data-state={isExpanded ? "open" : "closed"}
                    >
                      <FilterModalHeaderContent>
                        <Filter size={16} />
                        <FilterModalTitle hasActive={hasActiveFilters}>
                          {label}
                        </FilterModalTitle>
                        {hasActiveFilters && (
                          <FilterModalCount>{filters[key]?.length}</FilterModalCount>
                        )}
                      </FilterModalHeaderContent>
                      <FilterModalExpandIcon isOpen={isExpanded}>
                        <ChevronRight size={16} />
                      </FilterModalExpandIcon>
                    </FilterModalItemHeader>

                    {isExpanded && (
                      <FilterModalOptionsContainer>
                        {/* Section-specific search or manual input */}
                        {isSearchable ? (
                          <FilterModalSectionSearchContainer>
                            <FilterModalSectionSearchIcon>
                              <Search size={14} />
                            </FilterModalSectionSearchIcon>
                            <FilterModalSectionSearchInput
                              type="text"
                              placeholder={`Search ${label.toLowerCase()}...`}
                              value={sectionSearchTerms[key] || ""}
                              onChange={(e) =>
                                handleSectionSearchChange(key, e.target.value)
                              }
                              onClick={handleInputInteraction}
                              onFocus={handleInputInteraction}
                            />
                          </FilterModalSectionSearchContainer>
                        ) : (
                          <FilterModalManualContainer>
                            <FilterModalManualLabel>
                              <FilterModalTypeIcon>🔍</FilterModalTypeIcon>
                              Enter {label.toLowerCase()} value:
                            </FilterModalManualLabel>
                            <FilterModalManualInput
                              type="text"
                              placeholder={`Type ${label.toLowerCase()} value...`}
                              value={manualFilterInputs[key] || ""}
                              onChange={(e) =>
                                handleManualFilterInputChange(
                                  key,
                                  e.target.value,
                                )
                              }
                              onClick={handleInputInteraction}
                              onFocus={handleInputInteraction}
                            />
                          </FilterModalManualContainer>
                        )}

                        <FilterModalOptionsInner>
                          {(() => {
                            const filteredSectionOptions =
                              getFilteredSectionOptions(
                                options,
                                key,
                                isSearchable,
                              );

                            if (
                              filteredSectionOptions.length === 0 &&
                              isSearchable &&
                              sectionSearchTerms[key]?.trim()
                            ) {
                              return (
                                <div
                                  style={{
                                    textAlign: "center",
                                    padding: "20px",
                                    color: "hsl(var(--muted-foreground))",
                                    fontSize: "13px",
                                  }}
                                >
                                  <div
                                    style={{
                                      fontSize: "20px",
                                      marginBottom: "8px",
                                    }}
                                  >
                                    🔍
                                  </div>
                                  No {label.toLowerCase()} found
                                  <div
                                    style={{
                                      fontSize: "11px",
                                      marginTop: "4px",
                                    }}
                                  >
                                    Try different search terms
                                  </div>
                                </div>
                              );
                            }

                            return filteredSectionOptions.map((option) => {
                              const isSelected =
                                filters[key]?.includes(option) || false;
                              return (
                                <FilterModalOptionItem
                                  key={option}
                                  onClick={(e) =>
                                    handleFilterOptionClick(e, key, option)
                                  }
                                  isSelected={isSelected}
                                >
                                  <FilterModalOptionText>
                                    {option}
                                  </FilterModalOptionText>
                                  <FilterModalCheckbox selected={isSelected}>
                                    {isSelected && (
                                      <FilterModalCheckIcon
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                      >
                                        <path
                                          fillRule="evenodd"
                                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                          clipRule="evenodd"
                                        />
                                      </FilterModalCheckIcon>
                                    )}
                                  </FilterModalCheckbox>
                                </FilterModalOptionItem>
                              );
                            });
                          })()}
                        </FilterModalOptionsInner>
                      </FilterModalOptionsContainer>
                    )}
                  </FilterModalListItem>
                );
              })
            )}
          </FilterModalSectionContent>
        </FilterModalContent>

        <FilterModalFooter>
          <FilterModalButtonContainer>
            {activeFilters.length > 0 && (
              <FilterModalButton variant="outline" onClick={handleClearAll}>
                Clear All Filters ({activeFilters.length})
              </FilterModalButton>
            )}
            <FilterModalButton onClick={handleApplyFilters}>Apply Filters</FilterModalButton>
          </FilterModalButtonContainer>
        </FilterModalFooter>
      </FilterModalContainer>
    </>
  );
};

export default FilterModal;
