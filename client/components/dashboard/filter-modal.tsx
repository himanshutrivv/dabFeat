"use client";
import React, { useCallback, useState, useMemo } from "react";
import { Search, X, Filter, ChevronRight, Sparkles } from "lucide-react";
import {
  MainFilterBackdrop,
  MainFilterModal,
  MainFilterHeader,
  MainFilterContent,
  MainFilterSearch,
  MainFilterListItem,
  MainFilterItemHeader,
  FilterHeaderContent,
  FilterTitle,
  FilterCount,
  ExpandIcon,
  MainFilterExpandIcon,
  MainFilterOptionsContainer,
  OptionsContainer,
  MainFilterOptions,
  MainFilterCheckbox,
  MainFilterFooter,
  ButtonContainer,
  FilterModalButton,
  FilterModalHeaderTitle,
  FilterModalSearchIcon,
  FilterModalSearchInput,
  FilterModalSectionContent,
  FilterModalItemTitle,
  FilterModalItemTitleActive,
  FilterModalItemCount,
  SectionSearchContainer,
  FilterModalSectionSearchIcon,
  FilterModalSectionSearchInput,
  FilterModalOptionItem,
  FilterModalOptionText,
  FilterModalCheckIcon,
  FilterModalSearchContainer,
  FilterModalSearchContainerSmall,
  CloseButton,
  Separator,
  EmptyState,
  EmptyIcon,
  ManualFilterContainer,
  ManualFilterLabel,
  ManualFilterInput,
  FilterTypeIcon,
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

// All styled components are now imported from ./style.ts

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
      <MainFilterBackdrop onClick={onClose} />
      <MainFilterModal
        data-modal-container
        onClick={handleModalClick}
        onMouseDown={handleModalClick}
        onMouseUp={handleModalClick}
      >
        <MainFilterHeader>
          <FilterModalHeaderTitle>
            <Sparkles size={20} />
            Advanced Filters
          </FilterModalHeaderTitle>
          <CloseButton onClick={onClose}>
            <X size={18} />
          </CloseButton>
        </MainFilterHeader>

        <MainFilterContent>
          {/* Internal search for filtering available filter options/columns */}
          <FilterModalSearchContainer>
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
          </FilterModalSearchContainer>

          <Separator />

          <FilterModalSectionContent>
            {filteredOptions.length === 0 ? (
              <EmptyState>
                <EmptyIcon>🔍</EmptyIcon>
                <h3>No filters found</h3>
                <p>Try adjusting your search terms</p>
              </EmptyState>
            ) : (
              filteredOptions.map(({ key, label, options, searchable }) => {
                const hasActiveFilters = filters[key]?.length > 0;
                const isExpanded = openFilterDropdowns[`modal-${key}`] || false;
                const isSearchable = searchable !== false;

                return (
                  <MainFilterListItem key={key}>
                    <MainFilterItemHeader
                      onClick={(e) => handleSectionToggle(e, key)}
                      onMouseDown={handleModalClick}
                      isActive={hasActiveFilters}
                      data-state={isExpanded ? "open" : "closed"}
                    >
                      <FilterHeaderContent>
                        <Filter size={16} />
                        <FilterTitle hasActive={hasActiveFilters}>
                          {label}
                        </FilterTitle>
                        {hasActiveFilters && (
                          <FilterCount>{filters[key]?.length}</FilterCount>
                        )}
                      </FilterHeaderContent>
                      <ExpandIcon isOpen={isExpanded}>
                        <ChevronRight size={16} />
                      </ExpandIcon>
                    </MainFilterItemHeader>

                    {isExpanded && (
                      <MainFilterOptionsContainer>
                        {/* Section-specific search or manual input */}
                        {isSearchable ? (
                          <SectionSearchContainer>
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
                          </SectionSearchContainer>
                        ) : (
                          <ManualFilterContainer>
                            <ManualFilterLabel>
                              <FilterTypeIcon>🔍</FilterTypeIcon>
                              Enter {label.toLowerCase()} value:
                            </ManualFilterLabel>
                            <ManualFilterInput
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
                          </ManualFilterContainer>
                        )}

                        <OptionsContainer>
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
                                  <MainFilterCheckbox selected={isSelected}>
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
                                  </MainFilterCheckbox>
                                </FilterModalOptionItem>
                              );
                            });
                          })()}
                        </OptionsContainer>
                      </MainFilterOptionsContainer>
                    )}
                  </MainFilterListItem>
                );
              })
            )}
          </FilterModalSectionContent>
        </MainFilterContent>

        <MainFilterFooter>
          <ButtonContainer>
            {activeFilters.length > 0 && (
              <FilterModalButton variant="outline" onClick={handleClearAll}>
                Clear All Filters ({activeFilters.length})
              </FilterModalButton>
            )}
            <FilterModalButton onClick={handleApplyFilters}>Apply Filters</FilterModalButton>
          </ButtonContainer>
        </MainFilterFooter>
      </MainFilterModal>
    </>
  );
};

export default FilterModal;
