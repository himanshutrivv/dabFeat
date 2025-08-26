"use client";
import React, { useCallback } from "react";
import { Search, X } from "lucide-react";
import {
  FilterModalBackdrop,
  FilterModalContainer,
  FilterModalHeaderContainer,
  FilterModalContentContainer,
  FilterModalListItem,
  FilterModalItemHeaderContainer,
  FilterModalExpandIcon,
  FilterModalOptionsContainer,
  FilterModalOptions,
  FilterModalCheckboxContainer,
  FilterModalFooterContainer,
  FilterModalButton,
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
  onApplyFilters: () => Promise<void>;
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
  onApplyFilters,
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
        <FilterModalHeaderContainer>
          <FilterModalHeaderTitle>Filters</FilterModalHeaderTitle>
          <FilterModalButton variant="outline" onClick={onClose}>
            <X size={20} />
          </FilterModalButton>
        </FilterModalHeaderContainer>

        <FilterModalContentContainer>
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
                <FilterModalListItem key={key}>
                  <FilterModalItemHeaderContainer
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
                    <FilterModalExpandIcon isExpanded={isExpanded}>
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
                    </FilterModalExpandIcon>
                  </FilterModalItemHeaderContainer>

                  {isExpanded && (
                    <FilterModalOptionsContainer>
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

                      <FilterModalOptions>
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
                              <FilterModalCheckboxContainer
                                selected={isSelected}
                              >
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
                              </FilterModalCheckboxContainer>
                            </FilterModalOptionItemStyled>
                          );
                        })}
                      </FilterModalOptions>
                    </FilterModalOptionsContainer>
                  )}
                </FilterModalListItem>
              );
            })}
          </FilterModalSectionContentStyled>
        </FilterModalContentContainer>

        <FilterModalFooterContainer>
          {activeFilters.length > 0 && (
            <FilterModalButton variant="outline" onClick={handleClearAll}>
              Clear all ({activeFilters.length})
            </FilterModalButton>
          )}
          <FilterModalButton onClick={handleApplyFilters}>
            Apply Filters
          </FilterModalButton>
        </FilterModalFooterContainer>
      </FilterModalContainer>
    </>
  );
};

export default FilterModal;
