"use client";
import React, { useState } from "react";
import { X, Search, Check } from "lucide-react";
import {
  FilterModalBackdrop,
  FilterModalContainer,
  FilterModalHeaderContainer,
  FilterModalHeaderTitle,
  FilterModalContentContainer,
  FilterModalListItem,
  FilterModalItemHeaderContainer,
  FilterModalExpandIcon,
  FilterModalOptionsContainer,
  FilterModalOptions,
  FilterModalCheckboxContainer,
  FilterModalFooterContainer,
  FilterModalButton,
  FilterModalSearchContainerWithMargin,
  FilterModalSearchIconStyled,
  FilterModalSearchInputStyled,
  FilterModalSectionContentStyled,
  FilterModalItemTitleStyled,
  FilterModalItemTitleActiveStyled,
  FilterModalItemCountStyled,
  FilterModalSearchContainerSmallMargin,
  FilterModalSectionSearchIconStyled,
  FilterModalSectionSearchInputStyled,
  FilterModalOptionItemStyled,
  FilterModalOptionTextStyled,
  FilterModalCheckIconStyled,
} from "./style";

interface FilterOption {
  key: string;
  label: string;
  options: string[];
}

interface FilterState {
  [key: string]: string[];
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
  const [searchTerm, setSearchTerm] = useState("");
  const [sectionSearchTerms, setSectionSearchTerms] = useState<{ [key: string]: string }>({});

  if (!isOpen) return null;

  const handleApplyFilters = async () => {
    await onApplyFilters();
    onClose();
  };

  const filteredOptions = filterOptions.filter(option =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <FilterModalBackdrop onClick={onClose} />
      <FilterModalContainer data-modal-container>
        <FilterModalHeaderContainer>
          <FilterModalHeaderTitle>All Filters</FilterModalHeaderTitle>
          <FilterModalButton
            variant="ghost"
            size="sm"
            onClick={onClose}
          >
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
              placeholder="Search filters..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </FilterModalSearchContainerWithMargin>

          {filteredOptions.map((filterOption) => {
            const isExpanded = openFilterDropdowns[filterOption.key] || false;
            const selectedValues = filters[filterOption.key] || [];
            const sectionSearchTerm = sectionSearchTerms[filterOption.key] || "";

            const filteredSectionOptions = filterOption.options.filter(option =>
              option.toLowerCase().includes(sectionSearchTerm.toLowerCase())
            );

            return (
              <FilterModalListItem key={filterOption.key}>
                <FilterModalItemHeaderContainer
                  isActive={selectedValues.length > 0}
                  onClick={() => onToggleFilterSection(filterOption.key)}
                >
                  <FilterModalSectionContentStyled>
                    {selectedValues.length > 0 ? (
                      <FilterModalItemTitleActiveStyled>
                        {filterOption.label}
                        <FilterModalItemCountStyled>
                          {selectedValues.length}
                        </FilterModalItemCountStyled>
                      </FilterModalItemTitleActiveStyled>
                    ) : (
                      <FilterModalItemTitleStyled>
                        {filterOption.label}
                      </FilterModalItemTitleStyled>
                    )}
                  </FilterModalSectionContentStyled>
                  <FilterModalExpandIcon isExpanded={isExpanded}>
                    {isExpanded ? <X size={12} /> : "+"}
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
                        placeholder={`Search ${filterOption.label.toLowerCase()}...`}
                        value={sectionSearchTerm}
                        onChange={(e) => {
                          setSectionSearchTerms(prev => ({
                            ...prev,
                            [filterOption.key]: e.target.value
                          }));
                        }}
                      />
                    </FilterModalSearchContainerSmallMargin>

                    <FilterModalOptions>
                      <FilterModalOptionItemStyled
                        isSelected={selectedValues.length === 0}
                        onClick={(e) => {
                          e.stopPropagation();
                          onFilterChange(filterOption.key, "all");
                        }}
                      >
                        <FilterModalOptionTextStyled>
                          All {filterOption.label}
                        </FilterModalOptionTextStyled>
                        <FilterModalCheckboxContainer selected={selectedValues.length === 0}>
                          {selectedValues.length === 0 && (
                            <FilterModalCheckIconStyled
                              width="12"
                              height="12"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <Check size={12} />
                            </FilterModalCheckIconStyled>
                          )}
                        </FilterModalCheckboxContainer>
                      </FilterModalOptionItemStyled>

                      {filteredSectionOptions.map((option) => {
                        const isSelected = selectedValues.includes(option);
                        return (
                          <FilterModalOptionItemStyled
                            key={option}
                            isSelected={isSelected}
                            onClick={(e) => {
                              e.stopPropagation();
                              onFilterChange(filterOption.key, option);
                            }}
                          >
                            <FilterModalOptionTextStyled>
                              {option}
                            </FilterModalOptionTextStyled>
                            <FilterModalCheckboxContainer selected={isSelected}>
                              {isSelected && (
                                <FilterModalCheckIconStyled
                                  width="12"
                                  height="12"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <Check size={12} />
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
        </FilterModalContentContainer>

        <FilterModalFooterContainer>
          <FilterModalButton
            variant="outline"
            onClick={onClearAllFilters}
          >
            Clear All
          </FilterModalButton>
          <FilterModalButton
            onClick={handleApplyFilters}
          >
            Apply Filters ({activeFilters.length})
          </FilterModalButton>
        </FilterModalFooterContainer>
      </FilterModalContainer>
    </>
  );
};

export default FilterModal;
