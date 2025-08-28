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

// Timeline Filter Components
export const TimeLineFilterGroup = styled.div``;

export const TimeLineSelectContainer = styled.div`
  position: relative;
  z-index: 10000;
  isolation: isolate;
`;

export const TimeLineSelectTrigger = styled.button<{ theme?: any }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 40px;
  width: 100%;
  border-radius: ${({ theme }) => theme?.borderRadius?.lg || '8px'};
  border: 1px solid ${({ theme }) => theme?.colors?.input || 'hsl(var(--input))'};
  background-color: ${({ theme }) => theme?.colors?.background || 'hsl(var(--background))'};
  padding: 0 ${({ theme }) => theme?.spacing?.[3] || '12px'};
  font-size: ${({ theme }) => theme?.fontSizes?.sm || '14px'};
  color: ${({ theme }) => theme?.colors?.foreground || 'hsl(var(--foreground))'};
  cursor: pointer;
  transition: ${({ theme }) => theme?.transitions?.all || 'all 0.2s ease'};

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${({ theme }) => theme?.colors?.ring || 'hsl(var(--ring))'};
    outline-offset: 2px;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  &:hover {
    background-color: ${({ theme }) => theme?.colors?.accent || 'hsl(var(--accent))'};
    color: ${({ theme }) => theme?.colors?.accentForeground || 'hsl(var(--accent-foreground))'};
  }
`;

export const TimeLineSelectValue = styled.span<{ theme?: any }>`
  color: ${({ theme }) => theme?.colors?.foreground || 'hsl(var(--foreground))'};
  font-weight: ${({ theme }) => theme?.fontWeights?.medium || '500'};
`;

export const TimeLineSelectContent = styled.div<{ theme?: any }>`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 10000;
  max-height: 384px;
  min-width: 200px;
  overflow-y: auto;
  border-radius: ${({ theme }) => theme?.borderRadius?.lg || '8px'};
  border: 1px solid ${({ theme }) => theme?.colors?.border || 'hsl(var(--border))'};
  background-color: ${({ theme }) => theme?.colors?.card || 'hsl(var(--card))'};
  color: ${({ theme }) => theme?.colors?.cardForeground || 'hsl(var(--card-foreground))'};
  box-shadow: ${({ theme }) => theme?.shadows?.xl || '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'};
  margin-top: ${({ theme }) => theme?.spacing?.[1] || '4px'};
  animation: fadeIn 0.2s ease-out;
  isolation: isolate;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
`;

export const TimeLineInput = styled.input<{ theme?: any }>`
  width: 100%;
  padding: 8px 12px;
  background-color: ${({ theme }) => theme?.colors?.background || 'hsl(var(--background))'};
  border: 1px solid ${({ theme }) => theme?.colors?.border || 'hsl(var(--border))'};
  border-radius: 6px;
  color: ${({ theme }) => theme?.colors?.foreground || 'hsl(var(--foreground))'};
  font-size: 14px;
  font-family: ${({ theme }) => theme?.fonts?.mono || 'monospace'};

  &:focus {
    box-shadow: 0 0 0 2px ${({ theme }) => theme?.colors?.primary || 'hsl(var(--primary))'};
    border-color: ${({ theme }) => theme?.colors?.primary || 'hsl(var(--primary))'};
    outline: none;
  }

  &::placeholder {
    color: ${({ theme }) => theme?.colors?.mutedForeground || 'hsl(var(--muted-foreground))'};
  }
`;

export const TimeLineButton = styled.button<{
  variant?: "default" | "outline";
  size?: "default" | "sm";
  theme?: any;
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
    outline: 2px solid ${({ theme }) => theme?.colors?.ring || 'hsl(var(--ring))'};
    outline-offset: 2px;
  }

  &:disabled {
    pointer-events: none;
    opacity: 0.5;
  }

  ${(props) => {
    switch (props.variant) {
      case "outline":
        return css`
          border: 1px solid ${props.theme?.colors?.border || 'hsl(var(--border))'};
          background-color: ${props.theme?.colors?.background || 'hsl(var(--background))'};
          color: ${props.theme?.colors?.foreground || 'hsl(var(--foreground))'};
          &:hover {
            background-color: ${props.theme?.colors?.accent || 'hsl(var(--accent))'};
            color: ${props.theme?.colors?.accentForeground || 'hsl(var(--accent-foreground))'};
          }
        `;
      default:
        return css`
          background-color: ${props.theme?.colors?.primary || 'hsl(var(--primary))'};
          color: ${props.theme?.colors?.primaryForeground || 'hsl(var(--primary-foreground))'};
          &:hover {
            background-color: ${props.theme?.colors?.primary ? `${props.theme.colors.primary} / 0.9` : 'hsl(var(--primary) / 0.9)'};
          }
        `;
    }
  }}

  ${(props) => {
    switch (props.size) {
      case "sm":
        return css`
          height: 36px;
          border-radius: ${props.theme?.borderRadius?.md || '6px'};
          padding: 0 ${props.theme?.spacing?.[3] || '12px'};
          font-size: ${props.theme?.fontSizes?.xs || '12px'};
        `;
      default:
        return css`
          height: 40px;
          padding: 0 ${props.theme?.spacing?.[4] || '16px'};
        `;
    }
  }}

  flex: 1;
`;

export const TimeLineFilterContent = styled(TimeLineSelectContent)`
  width: 380px;
  padding: ${({ theme }) => theme?.spacing?.[4] || '16px'};
  z-index: 20000;
  isolation: isolate;
  position: absolute;

  @media (max-width: 768px) {
    width: 300px;
    min-width: 280px;
  }
`;

export const TimeLineFilterSection = styled.div<{ theme?: any }>`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme?.spacing?.[4] || '16px'};
`;

export const TimeLineFilterLabel = styled.label<{ theme?: any }>`
  font-size: ${({ theme }) => theme?.fontSizes?.sm || '14px'};
  font-weight: ${({ theme }) => theme?.fontWeights?.medium || '500'};
  margin-bottom: ${({ theme }) => theme?.spacing?.[2] || '8px'};
  display: block;
  color: ${({ theme }) => theme?.colors?.foreground || 'hsl(var(--foreground))'};
`;

export const TimeLineFilterInputGrid = styled.div<{ theme?: any }>`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme?.spacing?.[2] || '8px'};
`;

export const TimeLineFilterNote = styled.div<{ theme?: any }>`
  font-size: ${({ theme }) => theme?.fontSizes?.xs || '12px'};
  color: ${({ theme }) => theme?.colors?.mutedForeground || 'hsl(var(--muted-foreground))'};
  text-align: center;
`;

export const TimeLineFilterButtonGrid = styled.div<{ theme?: any }>`
  display: flex;
  gap: ${({ theme }) => theme?.spacing?.[2] || '8px'};
`;

// Filter Modal Components
export const FilterModalBackdrop = styled.div`
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

export const FilterModalContainer = styled.div<{ theme?: any }>`
  position: fixed;
  top: 0;
  right: 0;
  width: 420px;
  height: 100vh;
  background-color: ${({ theme }) => theme?.colors?.card || 'hsl(var(--card))'};
  border-left: 1px solid ${({ theme }) => theme?.colors?.border || 'hsl(var(--border))'};
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

export const FilterModalHeader = styled.div<{ theme?: any }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(135deg, ${({ theme }) =>
    theme?.colors?.primary || 'hsl(var(--primary))'} 0%, hsl(215, 25%, 20%) 100%);
  color: ${({ theme }) => theme?.colors?.primaryForeground || 'hsl(var(--primary-foreground))'};
  border-radius: 24px 0 0 0;
  padding: ${({ theme }) => theme?.spacing?.[6] || '24px'};
  border-bottom: 1px solid ${({ theme }) => theme?.colors?.border || 'hsl(var(--border))'};
  flex-shrink: 0;
`;

export const FilterModalContent = styled.div<{ theme?: any }>`
  flex: 1;
  overflow-y: auto;
  padding: ${({ theme }) => theme?.spacing?.[6] || '24px'};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme?.spacing?.[5] || '20px'};
`;

export const FilterModalSearch = styled.div<{ theme?: any }>`
  position: relative;
  margin-bottom: ${({ theme }) => theme?.spacing?.[4] || '16px'};
`;

export const FilterModalListItem = styled.div<{ theme?: any }>`
  border: 1px solid ${({ theme }) => theme?.colors?.border || 'hsl(var(--border))'};
  border-radius: 12px;
  background: ${({ theme }) => theme?.colors?.card || 'hsl(var(--card))'};
  transition: all 0.2s ease;
  margin-bottom: ${({ theme }) => theme?.spacing?.[3] || '12px'};

  &:hover {
    border-color: hsl(var(--primary) / 0.3);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

export const FilterModalItemHeader = styled.div<{ isActive?: boolean; theme?: any }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 16px 20px;
  cursor: pointer;
  transition: ${({ theme }) => theme?.transitions?.all || 'all 0.2s ease'};
  background: none;
  border: none;
  text-align: left;
  color: ${(props) =>
    props.isActive
      ? props.theme?.colors?.primary || 'hsl(var(--primary))'
      : props.theme?.colors?.foreground || 'hsl(var(--foreground))'};

  &:hover {
    background: hsl(var(--accent) / 0.5);
  }

  &[data-state="open"] {
    background: hsl(var(--accent));
    border-bottom: 1px solid ${({ theme }) => theme?.colors?.border || 'hsl(var(--border))'};
  }
`;

export const FilterModalHeaderContent = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const FilterModalTitle = styled.h3<{ hasActive: boolean }>`
  font-size: 16px;
  font-weight: ${(props) => (props.hasActive ? "600" : "500")};
  color: ${(props) =>
    props.hasActive ? "hsl(var(--primary))" : "hsl(var(--foreground))"};
  margin: 0;
`;

export const FilterModalCount = styled.div<{ theme?: any }>`
  background: ${({ theme }) => theme?.colors?.primary || 'hsl(var(--primary))'};
  color: ${({ theme }) => theme?.colors?.primaryForeground || 'hsl(var(--primary-foreground))'};
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

export const FilterModalExpandIcon = styled.div<{ isOpen: boolean; theme?: any }>`
  transition: transform 0.2s ease;
  transform: ${(props) => (props.isOpen ? "rotate(90deg)" : "rotate(0deg)")};
  color: ${({ theme }) => theme?.colors?.mutedForeground || 'hsl(var(--muted-foreground))'};
`;

export const FilterModalOptionsContainer = styled.div`
  padding: 0 20px 20px 20px;
`;

export const FilterModalOptionsInner = styled.div`
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

export const FilterModalCheckbox = styled.div<{ selected: boolean; theme?: any }>`
  width: 18px;
  height: 18px;
  border: 2px solid
    ${(props) =>
      props.selected ? props.theme?.colors?.primary || 'hsl(var(--primary))' : props.theme?.colors?.border || 'hsl(var(--border))'};
  border-radius: 4px;
  background-color: ${(props) =>
    props.selected ? props.theme?.colors?.primary || 'hsl(var(--primary))' : "transparent"};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: ${({ theme }) => theme?.transitions?.all || 'all 0.2s ease'};

  &:hover {
    border-color: ${({ theme }) => theme?.colors?.primary || 'hsl(var(--primary))'};
  }
`;

export const FilterModalFooter = styled.div<{ theme?: any }>`
  padding: ${({ theme }) => theme?.spacing?.[6] || '24px'};
  border-top: 1px solid ${({ theme }) => theme?.colors?.border || 'hsl(var(--border))'};
  flex-shrink: 0;
  background: ${({ theme }) => theme?.colors?.card || 'hsl(var(--card))'};
`;

export const FilterModalButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
`;

export const FilterModalButton = styled.button<{
  variant?: "default" | "outline";
  theme?: any;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  white-space: nowrap;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;
  cursor: pointer;
  border: none;
  outline: none;
  width: 100%;
  height: 44px;
  margin-bottom: ${({ theme }) => theme?.spacing?.[2] || '8px'};

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  &:last-child {
    margin-bottom: 0;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme?.colors?.ring || 'hsl(var(--ring))'};
    outline-offset: 2px;
  }

  &:disabled {
    pointer-events: none;
    opacity: 0.5;
  }

  ${(props) => {
    switch (props.variant) {
      case "outline":
        return css`
          border: 1px solid ${props.theme?.colors?.border || 'hsl(var(--border))'};
          background-color: ${props.theme?.colors?.background || 'hsl(var(--background))'};
          color: ${props.theme?.colors?.foreground || 'hsl(var(--foreground))'};
          &:hover {
            background-color: ${props.theme?.colors?.accent || 'hsl(var(--accent))'};
            color: ${props.theme?.colors?.accentForeground || 'hsl(var(--accent-foreground))'};
          }
        `;
      default:
        return css`
          background-color: ${props.theme?.colors?.primary || 'hsl(var(--primary))'};
          color: ${props.theme?.colors?.primaryForeground || 'hsl(var(--primary-foreground))'};
          &:hover {
            background-color: ${props.theme?.colors?.primary ? `${props.theme.colors.primary} / 0.9` : 'hsl(var(--primary) / 0.9)'};
          }
        `;
    }
  }}
`;

export const FilterModalHeaderTitle = styled.h2<{ theme?: any }>`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 20px;
  font-weight: 600;
  margin: 0;
  color: ${({ theme }) => theme?.colors?.primaryForeground || 'hsl(var(--primary-foreground))'};
`;

export const FilterModalSearchIcon = styled.div<{ theme?: any }>`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme?.colors?.mutedForeground || 'hsl(var(--muted-foreground))'};
  z-index: 1;
`;

export const FilterModalSearchInput = styled.input<{ theme?: any }>`
  width: 100%;
  padding: 8px 12px;
  padding-left: 40px;
  height: 44px;
  border-radius: 12px;
  border: 2px solid ${({ theme }) => theme?.colors?.border || 'hsl(var(--border))'};
  background: ${({ theme }) => theme?.colors?.background || 'hsl(var(--background))'};
  color: ${({ theme }) => theme?.colors?.foreground || 'hsl(var(--foreground))'};
  font-size: 14px;

  &:focus {
    border-color: ${({ theme }) => theme?.colors?.primary || 'hsl(var(--primary))'};
    box-shadow: 0 0 0 3px hsl(var(--primary) / 0.1);
    outline: none;
  }

  &::placeholder {
    color: ${({ theme }) => theme?.colors?.mutedForeground || 'hsl(var(--muted-foreground))'};
  }
`;

export const FilterModalSectionContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
`;

export const FilterModalSectionSearchContainer = styled.div`
  position: relative;
  margin-bottom: 12px;
`;

export const FilterModalSectionSearchIcon = styled.div<{ theme?: any }>`
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme?.colors?.mutedForeground || 'hsl(var(--muted-foreground))'};
  z-index: 1;
`;

export const FilterModalSectionSearchInput = styled.input<{ disabled?: boolean; theme?: any }>`
  width: 100%;
  padding: 8px 12px;
  padding-left: 36px;
  height: 36px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme?.colors?.border || 'hsl(var(--border))'};
  background: ${(props) =>
    props.disabled ? "hsl(var(--muted) / 0.1)" : "hsl(var(--muted) / 0.3)"};
  font-size: 13px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "text")};
  opacity: ${(props) => (props.disabled ? "0.6" : "1")};
  color: ${({ theme }) => theme?.colors?.foreground || 'hsl(var(--foreground))'};

  &:focus {
    border-color: ${({ theme, disabled }) =>
      disabled ? theme?.colors?.border || 'hsl(var(--border))' : theme?.colors?.primary || 'hsl(var(--primary))'};
    background: ${({ theme, disabled }) =>
      disabled ? "hsl(var(--muted) / 0.1)" : theme?.colors?.background || 'hsl(var(--background))'};
    box-shadow: ${({ disabled }) =>
      disabled ? "none" : "0 0 0 2px hsl(var(--primary) / 0.1)"};
    outline: none;
  }

  &::placeholder {
    color: ${({ theme }) => theme?.colors?.mutedForeground || 'hsl(var(--muted-foreground))'};
    font-size: 12px;
  }
`;

export const FilterModalOptionItem = styled.div<{ isSelected?: boolean; theme?: any }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 12px;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.2s ease;
  background: ${(props) =>
    props.isSelected ? "hsl(var(--primary) / 0.1)" : "transparent"};
  border: 1px solid
    ${(props) =>
      props.isSelected ? "hsl(var(--primary) / 0.3)" : "transparent"};
  margin-bottom: ${({ theme }) => theme?.spacing?.[1] || '4px'};

  &:hover {
    background: hsl(var(--accent));
    transform: translateX(2px);
  }
`;

export const FilterModalOptionText = styled.span<{ theme?: any }>`
  font-size: 14px;
  color: ${({ theme }) => theme?.colors?.foreground || 'hsl(var(--foreground))'};
`;

export const FilterModalCheckIcon = styled.svg<{ theme?: any }>`
  width: 10px;
  height: 10px;
  color: ${({ theme }) => theme?.colors?.primaryForeground || 'hsl(var(--primary-foreground))'};
`;

export const FilterModalCloseButton = styled.button<{ theme?: any }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: none;
  background: hsl(var(--primary-foreground) / 0.1);
  border: 1px solid hsl(var(--primary-foreground) / 0.2);
  cursor: pointer;
  border-radius: 12px;
  color: ${({ theme }) => theme?.colors?.primaryForeground || 'hsl(var(--primary-foreground))'};
  transition: ${({ theme }) => theme?.transitions?.all || 'all 0.2s ease'};

  &:hover {
    background: hsl(var(--primary-foreground) / 0.2);
    transform: scale(1.05);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${({ theme }) => theme?.colors?.ring || 'hsl(var(--ring))'};
  }
`;

export const FilterModalSeparator = styled.div<{ theme?: any }>`
  flex-shrink: 0;
  background: ${({ theme }) => theme?.colors?.border || 'hsl(var(--border))'};
  height: 1px;
  width: 100%;
`;

export const FilterModalEmptyState = styled.div<{ theme?: any }>`
  text-align: center;
  padding: 40px 20px;
  color: ${({ theme }) => theme?.colors?.mutedForeground || 'hsl(var(--muted-foreground))'};
`;

export const FilterModalEmptyIcon = styled.div`
  font-size: 48px;
  margin-bottom: 12px;
  opacity: 0.5;
`;

export const FilterModalManualContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 12px;
`;

export const FilterModalManualLabel = styled.label`
  font-size: 12px;
  font-weight: 500;
  color: hsl(var(--foreground));
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const FilterModalManualInput = styled.input<{ theme?: any }>`
  width: 100%;
  padding: 8px 12px;
  height: 36px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme?.colors?.border || 'hsl(var(--border))'};
  background: ${({ theme }) => theme?.colors?.background || 'hsl(var(--background))'};
  font-size: 13px;
  color: ${({ theme }) => theme?.colors?.foreground || 'hsl(var(--foreground))'};

  &:focus {
    border-color: ${({ theme }) => theme?.colors?.primary || 'hsl(var(--primary))'};
    box-shadow: 0 0 0 2px hsl(var(--primary) / 0.1);
    outline: none;
  }

  &::placeholder {
    color: ${({ theme }) => theme?.colors?.mutedForeground || 'hsl(var(--muted-foreground))'};
    font-size: 12px;
  }
`;

export const FilterModalTypeIcon = styled.div`
  font-size: 12px;
  color: hsl(var(--primary));
`;
