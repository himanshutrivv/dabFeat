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

// Beautiful backdrop with proper z-index
const MainFilterBackdrop = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 1000;
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

// Beautiful modal container with theme integration
const MainFilterModal = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 420px;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.card};
  border-left: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 24px 0 0 24px;
  box-shadow:
    0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 4px 16px rgba(0, 0, 0, 0.08);
  z-index: 1001;
  display: flex;
  flex-direction: column;
  animation: slideInFromRight 0.4s cubic-bezier(0.4, 0, 0.2, 1);

  @keyframes slideInFromRight {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

// Beautiful gradient header
const MainFilterHeader = styled.div`
  ${flexBetween}
  background: linear-gradient(135deg, ${({ theme }) =>
    theme.colors.primary} 0%, hsl(215, 25%, 20%) 100%);
  color: ${({ theme }) => theme.colors.primaryForeground};
  border-radius: 24px 0 0 0;
  padding: ${({ theme }) => theme.spacing[6]};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  flex-shrink: 0;
`;

const MainFilterContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: ${({ theme }) => theme.spacing[6]};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[5]};
`;

const MainFilterSearch = styled.div`
  position: relative;
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`;

const MainFilterListItem = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.card};
  transition: all 0.2s ease;
  margin-bottom: ${({ theme }) => theme.spacing[3]};

  &:hover {
    border-color: hsl(var(--primary) / 0.3);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

const MainFilterItemHeader = styled.div<{ isActive?: boolean }>`
  ${flexBetween}
  width: 100%;
  padding: 16px 20px;
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.all};
  background: none;
  border: none;
  text-align: left;
  color: ${(props) =>
    props.isActive
      ? props.theme.colors.primary
      : props.theme.colors.foreground};

  &:hover {
    background: hsl(var(--accent) / 0.5);
  }

  &[data-state="open"] {
    background: hsl(var(--accent));
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  }
`;

const FilterHeaderContent = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const FilterTitle = styled.h3<{ hasActive: boolean }>`
  font-size: 16px;
  font-weight: ${(props) => (props.hasActive ? "600" : "500")};
  color: ${(props) =>
    props.hasActive ? "hsl(var(--primary))" : "hsl(var(--foreground))"};
  margin: 0;
`;

const FilterCount = styled.div`
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.primaryForeground};
  font-size: 11px;
  min-width: 20px;
  height: 20px;
  border-radius: 10px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 2px 8px;
  font-weight: 600;
`;

const ExpandIcon = styled.div<{ isOpen: boolean }>`
  transition: transform 0.2s ease;
  transform: ${(props) => (props.isOpen ? "rotate(90deg)" : "rotate(0deg)")};
  color: ${({ theme }) => theme.colors.mutedForeground};
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
  padding: 0 20px 20px 20px;
`;

const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: 200px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: hsl(var(--muted) / 0.3);
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: hsl(var(--muted-foreground) / 0.3);
    border-radius: 3px;
  }
`;

const MainFilterOptions = styled.div`
  max-height: 256px;
  overflow-y: auto;
`;

const MainFilterCheckbox = styled.div<{ selected: boolean }>`
  width: 18px;
  height: 18px;
  border: 2px solid
    ${(props) =>
      props.selected ? props.theme.colors.primary : props.theme.colors.border};
  border-radius: 4px;
  background-color: ${(props) =>
    props.selected ? props.theme.colors.primary : "transparent"};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: ${({ theme }) => theme.transitions.all};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const MainFilterFooter = styled.div`
  padding: ${({ theme }) => theme.spacing[6]};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  flex-shrink: 0;
  background: ${({ theme }) => theme.colors.card};
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
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
  height: 44px;
  border-radius: 12px;
  font-weight: 500;
  transition: all 0.2s ease;
  margin-bottom: ${({ theme }) => theme.spacing[2]};

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

const FilterModalHeaderTitle = styled.h2`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 20px;
  font-weight: 600;
  margin: 0;
  color: ${({ theme }) => theme.colors.primaryForeground};
`;

const FilterModalSearchIcon = styled.div`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.colors.mutedForeground};
  z-index: 1;
`;

const FilterModalSearchInput = styled.input`
  ${inputStyles()}
  padding-left: 40px;
  height: 44px;
  border-radius: 12px;
  border: 2px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.background};

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px hsl(var(--primary) / 0.1);
  }
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

const SectionSearchContainer = styled.div`
  position: relative;
  margin-bottom: 12px;
`;

const FilterModalSectionSearchIcon = styled.div`
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.colors.mutedForeground};
  z-index: 1;
`;

const FilterModalSectionSearchInput = styled.input<{ disabled?: boolean }>`
  ${inputStyles()}
  padding-left: 36px;
  height: 36px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${(props) =>
    props.disabled ? "hsl(var(--muted) / 0.1)" : "hsl(var(--muted) / 0.3)"};
  font-size: 13px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "text")};
  opacity: ${(props) => (props.disabled ? "0.6" : "1")};

  &:focus {
    border-color: ${({ theme, disabled }) =>
      disabled ? theme.colors.border : theme.colors.primary};
    background: ${({ theme, disabled }) =>
      disabled ? "hsl(var(--muted) / 0.1)" : theme.colors.background};
    box-shadow: ${({ disabled }) =>
      disabled ? "none" : "0 0 0 2px hsl(var(--primary) / 0.1)"};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.mutedForeground};
    font-size: 12px;
  }
`;

const FilterModalOptionItem = styled.div<{ isSelected?: boolean }>`
  ${flexBetween}
  padding: 10px 12px;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.2s ease;
  background: ${(props) =>
    props.isSelected ? "hsl(var(--primary) / 0.1)" : "transparent"};
  border: 1px solid
    ${(props) =>
      props.isSelected ? "hsl(var(--primary) / 0.3)" : "transparent"};
  margin-bottom: ${({ theme }) => theme.spacing[1]};

  &:hover {
    background: hsl(var(--accent));
    transform: translateX(2px);
  }
`;

const FilterModalOptionText = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.foreground};
`;

const FilterModalCheckIcon = styled.svg`
  width: 10px;
  height: 10px;
  color: ${({ theme }) => theme.colors.primaryForeground};
`;

const FilterModalSearchContainer = styled(MainFilterSearch)`
  margin-bottom: ${({ theme }) => theme.spacing[6]};
`;

const FilterModalSearchContainerSmall = styled(MainFilterSearch)`
  margin-bottom: ${({ theme }) => theme.spacing[3]};
`;

const CloseButton = styled.button`
  ${flexCenter}
  width: 40px;
  height: 40px;
  border: none;
  background: hsl(var(--primary-foreground) / 0.1);
  border: 1px solid hsl(var(--primary-foreground) / 0.2);
  cursor: pointer;
  border-radius: 12px;
  color: ${({ theme }) => theme.colors.primaryForeground};
  transition: ${({ theme }) => theme.transitions.all};

  &:hover {
    background: hsl(var(--primary-foreground) / 0.2);
    transform: scale(1.05);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.ring};
  }
`;

const Separator = styled.div`
  flex-shrink: 0;
  background: ${({ theme }) => theme.colors.border};
  height: 1px;
  width: 100%;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 40px 20px;
  color: ${({ theme }) => theme.colors.mutedForeground};
`;

const EmptyIcon = styled.div`
  font-size: 48px;
  margin-bottom: 12px;
  opacity: 0.5;
`;

const ManualFilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 12px;
`;

const ManualFilterLabel = styled.label`
  font-size: 12px;
  font-weight: 500;
  color: hsl(var(--foreground));
  display: flex;
  align-items: center;
  gap: 6px;
`;

const ManualFilterInput = styled.input`
  ${inputStyles()}
  height: 36px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.background};
  font-size: 13px;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px hsl(var(--primary) / 0.1);
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.mutedForeground};
    font-size: 12px;
  }
`;

const FilterTypeIcon = styled.div`
  font-size: 12px;
  color: hsl(var(--primary));
`;

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
              <Button variant="outline" onClick={handleClearAll}>
                Clear All Filters ({activeFilters.length})
              </Button>
            )}
            <Button onClick={handleApplyFilters}>Apply Filters</Button>
          </ButtonContainer>
        </MainFilterFooter>
      </MainFilterModal>
    </>
  );
};

export default FilterModal;
