"use client";
import React, { useCallback, useState, useMemo } from "react";
import styled from "@emotion/styled";
import {
  Search,
  X,
  Filter,
  ChevronDown,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { flexBetween, flexCenter, flexColumn } from "../../styles/styled";

// Import modern UI components
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";

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

// Styled components with modern design
const ModalBackdrop = styled.div`
  position: fixed;
  inset: 0;
  background: linear-gradient(
    135deg,
    rgba(0, 0, 0, 0.4) 0%,
    rgba(0, 0, 0, 0.6) 100%
  );
  backdrop-filter: blur(8px);
  z-index: 99999998;
  animation: fadeIn 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  @keyframes fadeIn {
    from {
      opacity: 0;
      backdrop-filter: blur(0px);
    }
    to {
      opacity: 1;
      backdrop-filter: blur(8px);
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
  background: linear-gradient(
    135deg,
    hsl(var(--background)) 0%,
    hsl(var(--background) / 0.98) 100%
  );
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
  const [sectionSearchTerms, setSectionSearchTerms] = useState<{[key: string]: string}>({});

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
  const getFilteredSectionOptions = useCallback((options: string[], sectionKey: string) => {
    const sectionSearch = sectionSearchTerms[sectionKey];
    if (!sectionSearch?.trim()) return options;

    return options.filter(option =>
      option.toLowerCase().includes(sectionSearch.toLowerCase())
    );
  }, [sectionSearchTerms]);

  // Handle section search change
  const handleSectionSearchChange = useCallback((sectionKey: string, value: string) => {
    setSectionSearchTerms(prev => ({
      ...prev,
      [sectionKey]: value
    }));
  }, []);

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
                    <FilterSection
                      key={key}
                      open={isExpanded}
                      onOpenChange={() => onToggleFilterSection(`modal-${key}`)}
                    >
                      <FilterHeader>
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

                      <FilterOptions>
                        <OptionsContainer>
                          {options.map((option) => {
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
                          })}
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
