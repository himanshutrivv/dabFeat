"use client";
import React, { useCallback } from "react";
import styled from "@emotion/styled";
import { Search, X } from "lucide-react";
import {
  flexBetween,
  flexCenter,
  flexColumn,
  cardStyles,
  buttonBaseStyles,
  inputStyles,
  primaryButtonStyles,
  outlineButtonStyles
} from "../../styles/styled-components";

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

const MainFilterBackdrop = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 9998;
  animation: fadeIn 0.3s ease-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const MainFilterModal = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 33.333333%;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
  border-left: 1px solid ${({ theme }) => theme.colors.border};
  border-top-left-radius: ${({ theme }) => theme.borderRadius["3xl"]};
  border-bottom-left-radius: ${({ theme }) => theme.borderRadius["3xl"]};
  box-shadow: ${({ theme }) => theme.shadows.xl};
  z-index: 9999;
  display: flex;
  flex-direction: column;
  animation: slideInFromRight 0.3s ease-out;

  @keyframes slideInFromRight {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0);
    }
  }
`;

const MainFilterHeader = styled.div`
  ${flexBetween}
  padding: ${({ theme }) => theme.spacing[6]};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  flex-shrink: 0;
`;

const MainFilterContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: ${({ theme }) => theme.spacing[6]};
`;

const MainFilterSearch = styled.div`
  position: relative;
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`;

const MainFilterListItem = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  &:last-child {
    border-bottom: none;
  }
`;

const MainFilterItemHeader = styled.div<{ isActive?: boolean }>`
  ${flexBetween}
  padding: ${({ theme }) => theme.spacing[4]} 0;
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.all};
  color: ${(props) =>
    props.isActive ? props.theme.colors.primary : props.theme.colors.foreground};

  &:hover {
    background-color: ${({ theme }) => theme.colors.muted};
    margin: 0 -${({ theme }) => theme.spacing[6]};
    padding-left: ${({ theme }) => theme.spacing[6]};
    padding-right: ${({ theme }) => theme.spacing[6]};
  }
`;

const MainFilterExpandIcon = styled.div<{ isExpanded: boolean }>`
  ${flexCenter}
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: ${(props) =>
    props.isExpanded ? props.theme.colors.primary : props.theme.colors.muted};
  color: ${(props) =>
    props.isExpanded ? "white" : props.theme.colors.mutedForeground};
  transition: ${({ theme }) => theme.transitions.all};
`;

const MainFilterOptionsContainer = styled.div`
  padding: 0 0 ${({ theme }) => theme.spacing[4]} 0;
  margin-top: -${({ theme }) => theme.spacing[2]};
`;

const MainFilterOptions = styled.div`
  max-height: 256px;
  overflow-y: auto;
`;

const MainFilterCheckbox = styled.div<{ selected: boolean }>`
  width: 20px;
  height: 20px;
  border: 2px solid
    ${(props) =>
    props.selected ? props.theme.colors.primary : props.theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  background-color: ${(props) =>
    props.selected ? props.theme.colors.primary : "transparent"};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: ${({ theme }) => theme.transitions.all};
`;

const MainFilterFooter = styled.div`
  padding: ${({ theme }) => theme.spacing[6]};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  flex-shrink: 0;
`;

const Button = styled.button<{
  variant?: "default" | "outline";
}>`
  ${buttonBaseStyles()}

  ${(props) => {
    switch (props.variant) {
      case "outline":
        return outlineButtonStyles(props.theme);
      default:
        return primaryButtonStyles(props.theme);
    }
  }}

  width: 100%;
  margin-bottom: ${({ theme }) => theme.spacing[2]};

  &:last-child {
    margin-bottom: 0;
  }
`;

const FilterModalHeaderTitle = styled.h2`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.foreground};
`;

const FilterModalSearchIcon = styled.div`
  position: absolute;
  left: ${({ theme }) => theme.spacing[3]};
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.colors.mutedForeground};
`;

const FilterModalSearchInput = styled.input`
  ${inputStyles()}
  padding-left: ${({ theme }) => theme.spacing[10]};
`;

const FilterModalSectionContent = styled.div`
  ${flexColumn}
  gap: 0;
`;

const FilterModalItemTitle = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: ${({ theme }) => theme.fontWeights.normal};
`;

const FilterModalItemTitleActive = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
`;

const FilterModalItemCount = styled.span`
  margin-left: ${({ theme }) => theme.spacing[2]};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: ${({ theme }) => theme.spacing[1]} ${({ theme }) => theme.spacing[2]};
  border-radius: ${({ theme }) => theme.borderRadius.full};
`;

const FilterModalSectionSearchIcon = styled.div`
  position: absolute;
  left: ${({ theme }) => theme.spacing[3]};
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.colors.mutedForeground};
`;

const FilterModalSectionSearchInput = styled.input`
  ${inputStyles()}
  padding-left: ${({ theme }) => theme.spacing[10]};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  background-color: ${({ theme }) => theme.colors.muted};
`;

const FilterModalOptionItem = styled.div<{ isSelected?: boolean }>`
  ${flexBetween}
  padding: ${({ theme }) => theme.spacing[2]} ${({ theme }) => theme.spacing[3]};
  cursor: pointer;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  background-color: ${(props) =>
    props.isSelected ? props.theme.colors.accent : "transparent"};
  margin-bottom: ${({ theme }) => theme.spacing[1]};
  transition: ${({ theme }) => theme.transitions.all};

  &:hover {
    background-color: ${({ theme }) => theme.colors.accent};
  }
`;

const FilterModalOptionText = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.foreground};
`;

const FilterModalCheckIcon = styled.svg`
  color: white;
`;

const FilterModalSearchContainer = styled(MainFilterSearch)`
  margin-bottom: ${({ theme }) => theme.spacing[6]};
`;

const FilterModalSearchContainerSmall = styled(MainFilterSearch)`
  margin-bottom: ${({ theme }) => theme.spacing[3]};
`;

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
