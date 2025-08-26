"use client";
/** @jsxImportSource @emotion/react */
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
  FilterModalSearchInput,
  FilterModalSearchIcon,
  FilterModalSectionContent,
  FilterModalItemTitle,
  FilterModalItemTitleActive,
  FilterModalItemCount,
  FilterModalSectionSearchInput,
  FilterModalSectionSearchIcon,
  FilterModalOptionItem,
  FilterModalOptionItemSelected,
  FilterModalOptionText,
  FilterModalCheckIcon,
  FilterModalFooterClearButton,
  FilterModalFooterApplyButton,
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
          <h2 css={FilterModalHeaderTitle}>Filters</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X size={20} />
          </Button>
        </MainFilterHeader>

        <MainFilterContent>
          <MainFilterSearch style={{ marginBottom: 24 }}>
            <Search
              size={16}
              css={FilterModalSearchIcon}
            />
            <input
              type="text"
              placeholder="Search all filters..."
              onClick={handleInputInteraction}
              onFocus={handleInputInteraction}
              onChange={(e) => e.stopPropagation()}
              css={FilterModalSearchInput}
            />
          </MainFilterSearch>

          <div css={FilterModalSectionContent}>
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
                    <span css={hasActiveFilters ? FilterModalItemTitleActive : FilterModalItemTitle}>
                      {label}
                      {hasActiveFilters && (
                        <span
                          css={FilterModalItemCount}
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
                          css={FilterModalSectionSearchIcon}
                        />
                        <input
                          type="text"
                          placeholder={`Search ${label.toLowerCase()}...`}
                          onClick={handleInputInteraction}
                          onFocus={handleInputInteraction}
                          onChange={(e) => e.stopPropagation()}
                          css={FilterModalSectionSearchInput}
                        />
                      </MainFilterSearch>

                      <MainFilterOptions>
                        {options.map((option) => {
                          const isSelected = filters[key]?.includes(option) || false;
                          return (
                            <MainFilterOption
                              key={option}
                              onClick={(e) => handleFilterOptionClick(e, key, option)}
                              css={[
                                FilterModalOptionItem,
                                isSelected && FilterModalOptionItemSelected
                              ]}
                            >
                              <span css={FilterModalOptionText}>{option}</span>
                              <MainFilterCheckbox selected={isSelected}>
                                {isSelected && (
                                  <svg width={12} height={12} viewBox="0 0 20 20" fill="currentColor" css={FilterModalCheckIcon}>
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
            <Button variant="outline" onClick={handleClearAll} css={FilterModalFooterClearButton}>
              Clear all ({activeFilters.length})
            </Button>
          )}
          <Button onClick={handleApplyFilters} css={FilterModalFooterApplyButton}>
            Apply Filters
          </Button>
        </MainFilterFooter>
      </MainFilterModal>
    </>
  );
};

export default FilterModal;
