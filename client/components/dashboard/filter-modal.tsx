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
  FilterModalHeaderTitle,
  FilterModalSearchIconStyled,
  FilterModalSearchInputStyled,
  FilterModalSectionContentStyled,
  FilterModalItemTitleStyled,
  FilterModalItemTitleActiveStyled,
  FilterModalItemCountStyled,
  FilterModalSectionSearchIconStyled,
  FilterModalSectionSearchInputStyled,
  FilterModalOptionItemStyled,
  FilterModalOptionTextStyled,
  FilterModalCheckIconStyled,
  FilterModalFooterClearButtonStyled,
  FilterModalFooterApplyButtonStyled,
  FilterModalSearchContainerWithMargin,
  FilterModalSearchContainerSmallMargin,
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
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X size={20} />
          </Button>
        </MainFilterHeader>

        <MainFilterContent>
          <FilterModalSearchContainerWithMargin>
            <FilterModalSearchIconStyled>
              <Search size={16} />
            </FilterModalSearchIconStyled>
            <FilterModalSearchInputStyled
              type="text"
              placeholder="Search all filters..."
              onClick={handleInputInteraction}
              onFocus={handleInputInteraction}
              onChange={(e) => e.stopPropagation()}
            />
          </FilterModalSearchContainerWithMargin>

          <FilterModalSectionContentStyled>
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
                      <FilterModalItemTitleActiveStyled>
                        {label}
                        <FilterModalItemCountStyled>
                          {filters[key]?.length}
                        </FilterModalItemCountStyled>
                      </FilterModalItemTitleActiveStyled>
                    ) : (
                      <FilterModalItemTitleStyled>
                        {label}
                      </FilterModalItemTitleStyled>
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
                      <FilterModalSearchContainerSmallMargin>
                        <FilterModalSectionSearchIconStyled>
                          <Search size={14} />
                        </FilterModalSectionSearchIconStyled>
                        <FilterModalSectionSearchInputStyled
                          type="text"
                          placeholder={`Search ${label.toLowerCase()}...`}
                          onClick={handleInputInteraction}
                          onFocus={handleInputInteraction}
                          onChange={(e) => e.stopPropagation()}
                        />
                      </FilterModalSearchContainerSmallMargin>

                      <MainFilterOptions>
                        {options.map((option) => {
                          const isSelected =
                            filters[key]?.includes(option) || false;
                          return (
                            <FilterModalOptionItemStyled
                              key={option}
                              onClick={(e) =>
                                handleFilterOptionClick(e, key, option)
                              }
                              isSelected={isSelected}
                            >
                              <FilterModalOptionTextStyled>
                                {option}
                              </FilterModalOptionTextStyled>
                              <MainFilterCheckbox selected={isSelected}>
                                {isSelected && (
                                  <FilterModalCheckIconStyled
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
                                  </FilterModalCheckIconStyled>
                                )}
                              </MainFilterCheckbox>
                            </FilterModalOptionItemStyled>
                          );
                        })}
                      </MainFilterOptions>
                    </MainFilterOptionsContainer>
                  )}
                </MainFilterListItem>
              );
            })}
          </FilterModalSectionContentStyled>
        </MainFilterContent>

        <MainFilterFooter>
          {activeFilters.length > 0 && (
            <FilterModalFooterClearButtonStyled
              variant="outline"
              onClick={handleClearAll}
            >
              Clear all ({activeFilters.length})
            </FilterModalFooterClearButtonStyled>
          )}
          <FilterModalFooterApplyButtonStyled onClick={handleApplyFilters}>
            Apply Filters
          </FilterModalFooterApplyButtonStyled>
        </MainFilterFooter>
      </MainFilterModal>
    </>
  );
};

export default FilterModal;
