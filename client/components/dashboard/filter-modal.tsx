"use client";
import React, { useCallback } from "react";
import { Search, X } from "lucide-react";
import {
  MainFilterBackdrop,
  MainFilterModal,
  MainFilterHeader,
  MainFilterContent,
  MainFilterListItem,
  MainFilterItemHeader,
  MainFilterExpandIcon,
  MainFilterOptionsContainer,
  MainFilterOptions,
  MainFilterCheckbox,
  MainFilterFooter,
  Button,
  FilterModalHeaderTitle,
  FilterModalSearchIcon,
  FilterModalSearchInput,
  FilterModalSectionContent,
  FilterModalItemTitle,
  FilterModalItemTitleActive,
  FilterModalItemCount,
  FilterModalSectionSearchIcon,
  FilterModalSectionSearchInput,
  FilterModalOptionItem,
  FilterModalOptionText,
  FilterModalCheckIcon,
  FilterModalSearchContainer,
  FilterModalSearchContainerSmall
} from "./filter-modal.styles";

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
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onClose();
    },
    [onClose],
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
          <FilterModalHeaderTitle>Filters</FilterModalHeaderTitle>
          <Button variant="outline" onClick={onClose}>
            <X size={20} />
          </Button>
        </MainFilterHeader>

        <MainFilterContent>
          <FilterModalSearchContainer>
            <FilterModalSearchIcon>
              <Search size={16} />
            </FilterModalSearchIcon>
            <FilterModalSearchInput
              type="text"
              placeholder="Search all filters..."
              onClick={handleInputInteraction}
              onFocus={handleInputInteraction}
              onChange={(e) => e.stopPropagation()}
            />
          </FilterModalSearchContainer>

          <FilterModalSectionContent>
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
                    {hasActiveFilters ? (
                      <FilterModalItemTitleActive>
                        {label}
                        <FilterModalItemCount>
                          {filters[key]?.length}
                        </FilterModalItemCount>
                      </FilterModalItemTitleActive>
                    ) : (
                      <FilterModalItemTitle>
                        {label}
                      </FilterModalItemTitle>
                    )}
                    <MainFilterExpandIcon isExpanded={isExpanded}>
                      {isExpanded ? (
                        <X size={18} />
                      ) : (
                        <svg
                          width={18}
                          height={18}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <line x1={12} y1={5} x2={12} y2={19}></line>
                          <line x1={5} y1={12} x2={19} y2={12}></line>
                        </svg>
                      )}
                    </MainFilterExpandIcon>
                  </MainFilterItemHeader>

                  {isExpanded && (
                    <MainFilterOptionsContainer>
                      <FilterModalSearchContainerSmall>
                        <FilterModalSectionSearchIcon>
                          <Search size={14} />
                        </FilterModalSectionSearchIcon>
                        <FilterModalSectionSearchInput
                          type="text"
                          placeholder={`Search ${label.toLowerCase()}...`}
                          onClick={handleInputInteraction}
                          onFocus={handleInputInteraction}
                          onChange={(e) => e.stopPropagation()}
                        />
                      </FilterModalSearchContainerSmall>

                      <MainFilterOptions>
                        {options.map((option) => {
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
                                    width={12}
                                    height={12}
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
                        })}
                      </MainFilterOptions>
                    </MainFilterOptionsContainer>
                  )}
                </MainFilterListItem>
              );
            })}
          </FilterModalSectionContent>
        </MainFilterContent>

        <MainFilterFooter>
          {activeFilters.length > 0 && (
            <Button variant="outline" onClick={handleClearAll}>
              Clear all ({activeFilters.length})
            </Button>
          )}
          <Button onClick={handleApplyFilters}>
            Apply Filters
          </Button>
        </MainFilterFooter>
      </MainFilterModal>
    </>
  );
};

export default FilterModal;
