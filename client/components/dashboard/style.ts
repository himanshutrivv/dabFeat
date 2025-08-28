import styled from "@emotion/styled";
import { css } from "@emotion/react";

// Main layout components
export const DashboardContainer = styled.div`
  min-height: 100vh;
  background-color: hsl(var(--background));
  display: flex;
`;

export const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
`;

export const Header = styled.div`
  background-color: hsl(var(--card));
  border-bottom: 1px solid hsl(var(--border));
  padding: 16px 32px;
  position: sticky;
  top: 0;
  z-index: 50;
  flex-shrink: 0;
  min-height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const HeaderContent = styled.div`
  display: flex;
  flex-direction: column;
`;

export const DashboardTitle = styled.h1`
  margin: 0;
  font-size: 24px;
  font-weight: 600;
  color: hsl(var(--foreground));
`;

export const DashboardSubtitle = styled.p`
  margin: 0;
  color: #6b7280;
  font-size: 14px;
`;

export const MainContentLayout = styled.div`
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  flex: 1;
  overflow: visible;
`;

export const TableSection = styled.div`
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

export const FilterCard = styled.div`
  background: white;
  border-radius: 16px;
  border: 1px solid hsl(var(--border));
  box-shadow:
    0 4px 12px rgba(0, 0, 0, 0.05),
    0 2px 4px rgba(0, 0, 0, 0.08);
  margin-top: 24px;
  margin-bottom: 24px;
  overflow: visible;
  transition: all 0.3s ease;

  &:hover {
    box-shadow:
      0 8px 24px rgba(0, 0, 0, 0.08),
      0 4px 8px rgba(0, 0, 0, 0.12);
    transform: translateY(-1px);
  }
`;

export const FilterCardHeader = styled.div`
  padding: 24px 24px 0 24px;
  border-bottom: 1px solid hsl(var(--border) / 0.5);
`;

export const FilterCardTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: hsl(var(--foreground));
  margin: 0 0 8px 0;
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const FilterCardSubtitle = styled.p`
  font-size: 14px;
  color: hsl(var(--muted-foreground));
  margin: 0 0 16px 0;
`;

export const FilterContainer = styled.div<{ show: boolean }>`
  padding: 24px;
  background: transparent;
  display: ${(props) => (props.show ? "block" : "none")};
  position: relative;
  z-index: 10;
  isolation: isolate;
`;

export const SearchBarContainer = styled.div`
  margin-bottom: 24px;
  margin-top: 24px;
  position: relative;
  display: flex;
  gap: 12px;
  align-items: center;
`;

export const SearchInputWrapper = styled.div`
  position: relative;
  flex: 1;
`;

export const SearchIcon = styled.div`
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: hsl(var(--muted-foreground));
`;

export const FilterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
  position: relative;
  z-index: 10;
  isolation: isolate;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(5, 1fr);
  }
`;

export const FilterGroup = styled.div``;

export const FilterLabel = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: hsl(var(--foreground));
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
`;

export const ActiveFiltersSection = styled.div`
  margin-top: 16px;
  padding: 0;
  border-top: none;
`;

export const ActiveFiltersLabel = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: hsl(var(--foreground));
  margin-bottom: 12px;
`;

export const ActiveFiltersContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
`;

export const FilterBadge = styled.div`
  background-color: hsl(var(--primary) / 0.15);
  color: hsl(var(--primary));
  border: 1px solid hsl(var(--primary) / 0.3);
  padding: 8px 12px;
  display: flex;
  align-items: center;
  gap: 8px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
`;

export const FilterBadgeClose = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  border-radius: 50%;
  padding: 2px;
  transition: background-color 0.3s ease;
  color: hsl(var(--primary));

  &:hover {
    background-color: hsl(var(--primary) / 0.2);
  }
`;

export const ClearAllButton = css`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  background-color: transparent;
  color: hsl(var(--destructive));
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s;

  &:hover {
    background-color: hsl(var(--destructive) / 0.1);
  }
`;

export const FilterResults = styled.div`
  margin-top: 16px;
  padding: 0;
  border-top: none;
  font-size: 14px;
  color: hsl(var(--muted-foreground));
  text-align: right;
`;

// Button components
export const Button = styled.button<{
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
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
  transition: all 0.3s ease;
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

  ${(props) => {
    switch (props.variant) {
      case "destructive":
        return css`
          background-color: hsl(var(--destructive));
          color: hsl(var(--destructive-foreground));
          &:hover {
            background-color: hsl(var(--destructive) / 0.9);
          }
        `;
      case "outline":
        return css`
          border: 1px solid hsl(var(--border));
          background-color: hsl(var(--background));
          color: hsl(var(--foreground));
          &:hover {
            background-color: hsl(var(--accent));
            color: hsl(var(--accent-foreground));
          }
        `;
      case "secondary":
        return css`
          background-color: hsl(var(--secondary));
          color: hsl(var(--secondary-foreground));
          &:hover {
            background-color: hsl(var(--secondary) / 0.8);
          }
        `;
      case "ghost":
        return css`
          background-color: transparent;
          color: hsl(var(--foreground));
          &:hover {
            background-color: hsl(var(--accent));
            color: hsl(var(--accent-foreground));
          }
        `;
      case "link":
        return css`
          background-color: transparent;
          color: hsl(var(--primary));
          text-decoration: underline;
          text-underline-offset: 4px;
          &:hover {
            text-decoration: underline;
          }
        `;
      default:
        return css`
          background-color: hsl(var(--primary));
          color: hsl(var(--primary-foreground));
          &:hover {
            background-color: hsl(var(--primary) / 0.9);
          }
        `;
    }
  }}

  ${(props) => {
    switch (props.size) {
      case "sm":
        return css`
          height: 36px;
          border-radius: 6px;
          padding: 0 12px;
        `;
      case "lg":
        return css`
          height: 44px;
          border-radius: 8px;
          padding: 0 32px;
        `;
      case "icon":
        return css`
          height: 40px;
          width: 40px;
          padding: 0;
        `;
      default:
        return css`
          height: 40px;
          padding: 0 16px;
        `;
    }
  }}
`;

export const AllFiltersButton = styled(Button)`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  justify-content: center;
  background: hsl(215, 25%, 27%);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 16px;
  font-weight: 500;
  font-size: 14px;
  box-shadow: 0 4px 12px rgba(139, 92, 246, 0.25);
  transition: all 0.2s ease;

  &:hover {
    background: hsl(215, 25%, 35%);
    transform: translateY(-1px);
    box-shadow: 0 6px 16px rgba(139, 92, 246, 0.35);
  }
`;

export const ClearAllFiltersButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  background-color: transparent;
  color: hsl(var(--destructive));
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s;

  &:hover {
    background-color: hsl(var(--destructive) / 0.1);
  }
`;

export const RetryButton = styled(Button)`
  display: flex;
  align-items: center;
  gap: 8px;
`;

// Input components
export const SearchInput = styled.input`
  padding-left: 48px;
  height: 48px;
  width: 100%;
  background-color: hsl(var(--background));
  border: 1px solid hsl(var(--border));
  border-radius: 16px;
  color: hsl(var(--foreground));
  font-size: 18px;

  &:focus {
    box-shadow: 0 0 0 2px hsl(var(--primary));
    border-color: hsl(var(--primary));
    outline: none;
  }

  &::placeholder {
    color: hsl(var(--muted-foreground));
  }

  &:disabled {
    background-color: hsl(var(--muted) / 0.5);
    color: hsl(var(--muted-foreground));
    cursor: not-allowed;
    border-color: hsl(var(--border) / 0.5);

    &::placeholder {
      color: hsl(var(--muted-foreground) / 0.7);
    }
  }
`;

export const SearchButton = styled(Button)`
  height: 48px;
  padding: 0 24px;
  background-color: hsl(var(--background));
  color: hsl(var(--foreground));
  border: 1px solid hsl(var(--border));
  border-radius: 8px;
  font-weight: 500;
  font-size: 14px;
  min-width: 120px;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

  &:hover:not(:disabled) {
    background-color: hsl(var(--accent));
    color: hsl(var(--accent-foreground));
    border-color: hsl(var(--border));
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  &:focus:not(:disabled) {
    outline: none;
    box-shadow: 0 0 0 2px hsl(var(--ring));
    outline-offset: 2px;
  }

  &:active:not(:disabled) {
    background-color: hsl(var(--accent));
    color: hsl(var(--accent-foreground));
  }

  &:disabled {
    background-color: hsl(var(--muted));
    color: hsl(var(--muted-foreground));
    cursor: not-allowed;
    opacity: 0.6;
    border-color: hsl(var(--border));
    box-shadow: none;
  }
`;

// Error and loading states
export const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  gap: 16px;
  background-color: hsl(var(--background));
`;

export const ErrorText = styled.div`
  color: hsl(var(--destructive));
  font-size: 16px;
`;

// Filter Dropdown Components
export const FilterDropdownFilterGroup = styled.div``;

export const FilterDropdownSelectContainer = styled.div`
  position: relative;
  z-index: 15;
  isolation: isolate;
`;

export const FilterDropdownSelectTrigger = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 40px;
  width: 100%;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  background-color: #ffffff;
  padding: 0 12px;
  font-size: 14px;
  color: #374151;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #2563eb;
    outline-offset: 2px;
  }

  &:hover {
    background-color: #f3f4f6;
    color: #1f2937;
    border-color: #d1d5db;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

export const FilterDropdownSelectValue = styled.span`
  color: #374151;
  font-weight: 500;
`;

export const FilterDropdownSelectContent = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: auto;
  z-index: 20;
  max-height: 384px;
  min-width: 320px;
  max-width: calc(100vw - 32px);
  overflow-y: auto;
  border-radius: 8px;
  border: 1px solid hsl(var(--border));
  background-color: white !important;
  color: hsl(var(--foreground));
  opacity: 1 !important;
  padding: 16px;
  box-shadow:
    0 10px 80px rgba(0, 0, 0, 0.12),
    0 4px 16px rgba(0, 0, 0, 0.08);
  margin-top: 4px;
  animation: none;
  pointer-events: auto;

  &.filter-content {
    background-color: white !important;
    opacity: 1 !important;
  }
`;

export const SelectItemsContainer = styled.div`
  padding: 8px 4px;
`;

export const FilterDropdownSelectItem = styled.div<{ selected?: boolean }>`
  position: relative;
  display: flex;
  width: 100%;
  cursor: pointer;
  user-select: none;
  align-items: center;
  border-radius: 6px;
  padding: 8px 12px;
  font-size: 14px;
  outline: none;
  transition: all 0.2s ease;
  color: hsl(var(--foreground));
  font-weight: ${(props) => (props.selected ? "600" : "400")};

  &:hover {
    background-color: hsl(var(--accent));
    color: hsl(var(--accent-foreground));
  }

  &:focus {
    background-color: hsl(var(--accent));
    color: hsl(var(--accent-foreground));
  }

  ${(props) =>
    props.selected &&
    css`
      background-color: hsl(var(--accent));
      color: hsl(var(--accent-foreground));
    `}
`;
