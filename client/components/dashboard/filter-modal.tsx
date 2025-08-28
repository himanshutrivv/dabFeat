"use client";
import React, { useCallback, useState, useMemo } from "react";
import styled from "@emotion/styled";
import { Search, X, Filter, ChevronRight, Sparkles } from "lucide-react";

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

// Base Card Components
const Card = styled.div`
  border-radius: 12px;
  border: 1px solid hsl(var(--border));
  background: hsl(var(--card));
  color: hsl(var(--card-foreground));
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
`;

const CardHeader = styled.div`
  display: flex;
  flex-direction: column;
  space-y: 6px;
  padding: 24px;
`;

const CardTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  line-height: 1;
  letter-spacing: -0.025em;
  margin: 0;
`;

const CardContent = styled.div`
  padding: 24px;
  padding-top: 0;
`;

const CardFooter = styled.div`
  display: flex;
  align-items: center;
  padding: 24px;
  padding-top: 0;
`;

// Button Component
const Button = styled.button<{
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  white-space: nowrap;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;
  cursor: pointer;
  border: none;
  outline: none;

  &:focus-visible {
    outline: 2px solid hsl(var(--ring));
    outline-offset: 2px;
  }

  &:disabled {
    pointer-events: none;
    opacity: 0.5;
  }

  /* Variants */
  ${(props) => {
    switch (props.variant) {
      case "outline":
        return `
          border: 1px solid hsl(var(--border));
          background: hsl(var(--background));
          color: hsl(var(--foreground));
          
          &:hover {
            background: hsl(var(--accent));
            color: hsl(var(--accent-foreground));
          }
        `;
      case "ghost":
        return `
          background: transparent;
          color: hsl(var(--foreground));
          
          &:hover {
            background: hsl(var(--accent));
            color: hsl(var(--accent-foreground));
          }
        `;
      default:
        return `
          background: hsl(var(--primary));
          color: hsl(var(--primary-foreground));
          
          &:hover {
            background: hsl(var(--primary) / 0.9);
          }
        `;
    }
  }}

  /* Sizes */
  ${(props) => {
    switch (props.size) {
      case "sm":
        return `
          height: 36px;
          border-radius: 6px;
          padding: 0 12px;
          font-size: 12px;
        `;
      case "lg":
        return `
          height: 44px;
          border-radius: 8px;
          padding: 0 32px;
          font-size: 16px;
        `;
      case "icon":
        return `
          height: 40px;
          width: 40px;
          padding: 0;
        `;
      default:
        return `
          height: 40px;
          padding: 0 16px;
        `;
    }
  }}
`;

// Input Component
const Input = styled.input`
  display: flex;
  height: 40px;
  width: 100%;
  border-radius: 8px;
  border: 1px solid hsl(var(--border));
  background: hsl(var(--background));
  padding: 8px 12px;
  font-size: 14px;
  color: hsl(var(--foreground));
  transition: all 0.2s ease;

  &::placeholder {
    color: hsl(var(--muted-foreground));
  }

  &:focus {
    outline: none;
    border-color: hsl(var(--ring));
    box-shadow: 0 0 0 2px hsl(var(--ring) / 0.2);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

// Badge Component
const Badge = styled.div<{
  variant?: "default" | "secondary" | "destructive" | "outline";
}>`
  display: inline-flex;
  align-items: center;
  border-radius: 12px;
  border: 1px solid transparent;
  padding: 2px 8px;
  font-size: 11px;
  font-weight: 600;
  transition: all 0.2s ease;

  ${(props) => {
    switch (props.variant) {
      case "secondary":
        return `
          border-color: transparent;
          background: hsl(var(--secondary));
          color: hsl(var(--secondary-foreground));
          
          &:hover {
            background: hsl(var(--secondary) / 0.8);
          }
        `;
      case "destructive":
        return `
          border-color: transparent;
          background: hsl(var(--destructive));
          color: hsl(var(--destructive-foreground));
          
          &:hover {
            background: hsl(var(--destructive) / 0.8);
          }
        `;
      case "outline":
        return `
          color: hsl(var(--foreground));
        `;
      default:
        return `
          border-color: transparent;
          background: hsl(var(--primary));
          color: hsl(var(--primary-foreground));
          
          &:hover {
            background: hsl(var(--primary) / 0.8);
          }
        `;
    }
  }}
`;

// Separator Component
const Separator = styled.div<{
  orientation?: "horizontal" | "vertical";
}>`
  flex-shrink: 0;
  background: hsl(var(--border));

  ${(props) =>
    props.orientation === "vertical"
      ? "height: 100%; width: 1px;"
      : "height: 1px; width: 100%;"}
`;

// Collapsible Components
const Collapsible = styled.div``;

const CollapsibleTrigger = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  font: inherit;
  outline: inherit;
`;

const CollapsibleContent = styled.div<{ isOpen?: boolean }>`
  overflow: hidden;
  transition: all 0.2s ease;

  ${(props) =>
    props.isOpen
      ? "opacity: 1; max-height: 1000px;"
      : "opacity: 0; max-height: 0;"}
`;

// Styled components with modern design
const ModalBackdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 99999998;
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

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 420px;
  height: 100vh;
  z-index: 99999999;
  display: flex;
  flex-direction: column;
  animation: slideIn 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow:
    0 25px 50px -12px rgba(0, 0, 0, 0.25),
    0 0 0 1px rgba(255, 255, 255, 0.1);

  @keyframes slideIn {
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

const StyledCard = styled(Card)`
  height: 100%;
  border-radius: 24px 0 0 24px;
  border-right: none;
  background: #ffffff;
  display: flex;
  flex-direction: column;
`;

const HeaderContainer = styled(CardHeader)`
  background: linear-gradient(
    135deg,
    hsl(var(--primary)) 0%,
    hsl(var(--primary) / 0.9) 100%
  );
  color: hsl(var(--primary-foreground));
  border-radius: 24px 0 0 0;
  padding: 24px;
  flex-shrink: 0;
`;

const HeaderTitle = styled(CardTitle)`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 20px;
  font-weight: 600;
  margin: 0;
`;

const CloseButton = styled(Button)`
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: hsl(var(--primary-foreground));

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: scale(1.05);
  }
`;

const ContentArea = styled(CardContent)`
  flex: 1;
  overflow-y: auto;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const SearchContainer = styled.div`
  position: relative;
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: hsl(var(--muted-foreground));
  z-index: 1;
`;

const SearchInput = styled(Input)`
  padding-left: 40px;
  height: 44px;
  border-radius: 12px;
  border: 2px solid hsl(var(--border));
  background: hsl(var(--background));

  &:focus {
    border-color: hsl(var(--primary));
    box-shadow: 0 0 0 3px hsl(var(--primary) / 0.1);
  }
`;

const FiltersGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const FilterSection = styled(Collapsible)`
  border: 1px solid hsl(var(--border));
  border-radius: 12px;
  background: hsl(var(--card));
  transition: all 0.2s ease;

  &:hover {
    border-color: hsl(var(--primary) / 0.3);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  }
`;

const FilterHeader = styled(CollapsibleTrigger)`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  background: none;
  border: none;
  text-align: left;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: hsl(var(--accent) / 0.5);
  }

  &[data-state="open"] {
    background: hsl(var(--accent));
    border-bottom: 1px solid hsl(var(--border));
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

const FilterCount = styled(Badge)`
  background: hsl(var(--primary));
  color: hsl(var(--primary-foreground));
  font-size: 11px;
  min-width: 20px;
  height: 20px;
  border-radius: 10px;
`;

const ExpandIcon = styled.div<{ isOpen: boolean }>`
  transition: transform 0.2s ease;
  transform: ${(props) => (props.isOpen ? "rotate(90deg)" : "rotate(0deg)")};
  color: hsl(var(--muted-foreground));
`;

const FilterOptions = styled(CollapsibleContent)`
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

const OptionItem = styled.div<{ isSelected: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  background: ${(props) =>
    props.isSelected ? "hsl(var(--primary) / 0.1)" : "transparent"};
  border: 1px solid
    ${(props) =>
      props.isSelected ? "hsl(var(--primary) / 0.3)" : "transparent"};

  &:hover {
    background: hsl(var(--accent));
    transform: translateX(2px);
  }
`;

const OptionText = styled.span`
  font-size: 14px;
  color: hsl(var(--foreground));
`;

const CheckBox = styled.div<{ checked: boolean }>`
  width: 18px;
  height: 18px;
  border: 2px solid
    ${(props) => (props.checked ? "hsl(var(--primary))" : "hsl(var(--border))")};
  border-radius: 4px;
  background: ${(props) =>
    props.checked ? "hsl(var(--primary))" : "transparent"};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    border-color: hsl(var(--primary));
  }
`;

const CheckIcon = styled.svg`
  width: 10px;
  height: 10px;
  color: hsl(var(--primary-foreground));
`;

const SectionSearchContainer = styled.div`
  position: relative;
  margin-bottom: 12px;
`;

const SectionSearchInput = styled(Input)`
  padding-left: 36px;
  height: 36px;
  border-radius: 8px;
  border: 1px solid hsl(var(--border));
  background: hsl(var(--muted) / 0.3);
  font-size: 13px;

  &:focus {
    border-color: hsl(var(--primary));
    background: hsl(var(--background));
    box-shadow: 0 0 0 2px hsl(var(--primary) / 0.1);
  }

  &::placeholder {
    color: hsl(var(--muted-foreground));
    font-size: 12px;
  }
`;

const SectionSearchIcon = styled.div`
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: hsl(var(--muted-foreground));
  z-index: 1;
`;

const FooterContainer = styled(CardFooter)`
  padding: 24px;
  border-top: 1px solid hsl(var(--border));
  flex-shrink: 0;
  background: hsl(var(--background) / 0.8);
  backdrop-filter: blur(8px);
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
`;

const StyledButton = styled(Button)<{ variant?: any }>`
  height: 44px;
  border-radius: 12px;
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 40px 20px;
  color: hsl(var(--muted-foreground));
`;

const EmptyIcon = styled.div`
  font-size: 48px;
  margin-bottom: 12px;
  opacity: 0.5;
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
  onApplyFilters,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sectionSearchTerms, setSectionSearchTerms] = useState<{
    [key: string]: string;
  }>({});

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
    (options: string[], sectionKey: string) => {
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

  const handleModalClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
  }, []);

  const handleFilterOptionClick = useCallback(
    (e: React.MouseEvent, key: string, option: string) => {
      e.stopPropagation();
      e.preventDefault();
      onFilterChange(key, option);
    },
    [onFilterChange],
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
      }
    },
    [onApplyFilters, onClose],
  );

  // Clear section search terms when modal closes
  React.useEffect(() => {
    if (!isOpen) {
      setSectionSearchTerms({});
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      <ModalBackdrop onClick={onClose} />
      <ModalContainer>
        <StyledCard>
          <HeaderContainer>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <HeaderTitle>
                <Sparkles size={20} />
                Advanced Filters
              </HeaderTitle>
              <CloseButton variant="ghost" size="icon" onClick={onClose}>
                <X size={18} />
              </CloseButton>
            </div>
          </HeaderContainer>

          <ContentArea>
            {/* Internal search for filtering available filter options/columns */}
            <SearchContainer>
              <SearchIcon>
                <Search size={16} />
              </SearchIcon>
              <SearchInput
                type="text"
                placeholder="Search filter categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </SearchContainer>

            <Separator />

            <FiltersGrid>
              {filteredOptions.length === 0 ? (
                <EmptyState>
                  <EmptyIcon>🔍</EmptyIcon>
                  <h3>No filters found</h3>
                  <p>Try adjusting your search terms</p>
                </EmptyState>
              ) : (
                filteredOptions.map(({ key, label, options }) => {
                  const hasActiveFilters = filters[key]?.length > 0;
                  const isExpanded =
                    openFilterDropdowns[`modal-${key}`] || false;

                  return (
                    <FilterSection key={key}>
                      <FilterHeader
                        onClick={() => onToggleFilterSection(`modal-${key}`)}
                        data-state={isExpanded ? "open" : "closed"}
                      >
                        <FilterHeaderContent>
                          <Filter size={16} />
                          <FilterTitle hasActive={hasActiveFilters}>
                            {label}
                          </FilterTitle>
                          {hasActiveFilters && (
                            <FilterCount variant="default">
                              {filters[key]?.length}
                            </FilterCount>
                          )}
                        </FilterHeaderContent>
                        <ExpandIcon isOpen={isExpanded}>
                          <ChevronRight size={16} />
                        </ExpandIcon>
                      </FilterHeader>

                      <FilterOptions isOpen={isExpanded}>
                        {/* Section-specific search */}
                        <SectionSearchContainer>
                          <SectionSearchIcon>
                            <Search size={14} />
                          </SectionSearchIcon>
                          <SectionSearchInput
                            type="text"
                            placeholder={`Search ${label.toLowerCase()}...`}
                            value={sectionSearchTerms[key] || ""}
                            onChange={(e) =>
                              handleSectionSearchChange(key, e.target.value)
                            }
                            onClick={(e) => e.stopPropagation()}
                          />
                        </SectionSearchContainer>

                        <OptionsContainer>
                          {(() => {
                            const filteredSectionOptions =
                              getFilteredSectionOptions(options, key);

                            if (filteredSectionOptions.length === 0) {
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
                                <OptionItem
                                  key={option}
                                  isSelected={isSelected}
                                  onClick={(e) =>
                                    handleFilterOptionClick(e, key, option)
                                  }
                                >
                                  <OptionText>{option}</OptionText>
                                  <CheckBox checked={isSelected}>
                                    {isSelected && (
                                      <CheckIcon
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                      >
                                        <path
                                          fillRule="evenodd"
                                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                          clipRule="evenodd"
                                        />
                                      </CheckIcon>
                                    )}
                                  </CheckBox>
                                </OptionItem>
                              );
                            });
                          })()}
                        </OptionsContainer>
                      </FilterOptions>
                    </FilterSection>
                  );
                })
              )}
            </FiltersGrid>
          </ContentArea>

          <FooterContainer>
            <ButtonContainer>
              {activeFilters.length > 0 && (
                <StyledButton variant="outline" onClick={handleClearAll}>
                  Clear All Filters ({activeFilters.length})
                </StyledButton>
              )}
              <StyledButton onClick={handleApplyFilters}>
                Apply Filters
              </StyledButton>
            </ButtonContainer>
          </FooterContainer>
        </StyledCard>
      </ModalContainer>
    </>
  );
};

export default FilterModal;
