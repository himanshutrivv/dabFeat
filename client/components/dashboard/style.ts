import styled from "@emotion/styled";
import { css } from "@emotion/react";

// Main layout components
export const DashboardContainer = styled.div`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.default?.primaryBackground};
  display: flex;
  font-family: ${({ theme }) => theme.fonts};
`;

export const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
  color: ${({ theme }) => theme.colors.default?.primary};
`;

export const Header = styled.div`
  background-color: ${({ theme }) => theme.colors.default?.primaryBackground};
  border-bottom: 1px solid ${({ theme }) => theme.colors.default?.mutedBackground};
  padding: ${({ theme }) => theme.spacing?.[4]} ${({ theme }) => theme.spacing?.[8]};
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
  font-size: ${({ theme }) => theme.fontSizes?.['2xl']};
  font-weight: ${({ theme }) => theme.fontWeights?.semibold};
  color: ${({ theme }) => theme.colors.default?.primary};
  font-family: ${({ theme }) => theme.fonts};
`;

export const DashboardSubtitle = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.default?.muted};
  font-size: ${({ theme }) => theme.fontSizes?.sm};
  font-family: ${({ theme }) => theme.fonts};
`;

export const MainContentLayout = styled.div`
  padding: ${({ theme }) => theme.spacing?.[8]};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing?.[6]};
  flex: 1;
  overflow: visible;
`;

export const TableSection = styled.div`
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 1;
`;

export const FilterCard = styled.div`
  background: ${({ theme }) => theme.colors.default?.primaryBackground};
  border-radius: ${({ theme }) => theme.borderRadius?.xl};
  border: 1px solid ${({ theme }) => theme.colors.default?.mutedBackground};
  box-shadow: ${({ theme }) => theme.shadows?.md};
  margin-top: ${({ theme }) => theme.spacing?.[6]};
  margin-bottom: ${({ theme }) => theme.spacing?.[6]};
  overflow: visible;
  transition: ${({ theme }) => theme.transitions?.all};
  position: relative;
  z-index: 100;

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows?.lg};
    transform: translateY(-1px);
  }
`;

export const FilterCardHeader = styled.div`
  padding: ${({ theme }) => theme.spacing?.[6]} ${({ theme }) => theme.spacing?.[6]} 0 ${({ theme }) => theme.spacing?.[6]};
  border-bottom: 1px solid ${({ theme }) => theme.colors.default?.mutedBackground};
`;

export const FilterCardTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes?.lg};
  font-weight: ${({ theme }) => theme.fontWeights?.semibold};
  color: ${({ theme }) => theme.colors.default?.primary};
  font-family: ${({ theme }) => theme.fonts};
  margin: 0 0 ${({ theme }) => theme.spacing?.[2]} 0;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing?.[3]};
`;

export const FilterCardSubtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSizes?.sm};
  color: ${({ theme }) => theme.colors.default?.muted};
  font-family: ${({ theme }) => theme.fonts};
  margin: 0 0 ${({ theme }) => theme.spacing?.[4]} 0;
`;

export const FilterContainer = styled.div<{ show: boolean }>`
  padding: ${({ theme }) => theme.spacing?.[6]};
  background: transparent;
  display: ${(props) => (props.show ? "block" : "none")};
  position: relative;
  z-index: 10;
  isolation: isolate;
`;

export const SearchBarContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing?.[6]};
  margin-top: ${({ theme }) => theme.spacing?.[6]};
  position: relative;
  display: flex;
  gap: ${({ theme }) => theme.spacing?.[3]};
  align-items: center;
  z-index: 20;
`;

export const SearchInputWrapper = styled.div`
  position: relative;
  flex: 1;
`;

export const SearchIcon = styled.div`
  position: absolute;
  left: ${({ theme }) => theme.spacing?.[4]};
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.colors.default?.muted};
`;

export const FilterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing?.[4]};
  margin-bottom: ${({ theme }) => theme.spacing?.[6]};
  position: relative;
  z-index: 30;
  isolation: isolate;

  @media (min-width: ${({ theme }) => theme.breakpoints?.md}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: ${({ theme }) => theme.breakpoints?.lg}) {
    grid-template-columns: repeat(5, 1fr);
  }
`;

export const FilterGroup = styled.div``;

export const FilterLabel = styled.label`
  font-size: ${({ theme }) => theme.fontSizes?.sm};
  font-weight: ${({ theme }) => theme.fontWeights?.semibold};
  color: ${({ theme }) => theme.colors.default?.primary};
  font-family: ${({ theme }) => theme.fonts};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing?.[2]};
  margin-bottom: ${({ theme }) => theme.spacing?.[2]};
`;

export const ActiveFiltersSection = styled.div`
  margin-top: ${({ theme }) => theme.spacing?.[4]};
  padding: 0;
  border-top: none;
`;

export const ActiveFiltersLabel = styled.div`
  font-size: ${({ theme }) => theme.fontSizes?.sm};
  font-weight: ${({ theme }) => theme.fontWeights?.semibold};
  color: ${({ theme }) => theme.colors.default?.primary};
  font-family: ${({ theme }) => theme.fonts};
  margin-bottom: ${({ theme }) => theme.spacing?.[3]};
`;

export const ActiveFiltersContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing?.[2]};
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
  border: 1px solid #e2e8f0;
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
  background: linear-gradient(
    135deg,
    hsl(215, 25%, 27%) 0%,
    hsl(215, 25%, 20%) 100%
  );
  color: white;
  border: 1px solid hsl(215, 25%, 35%);
  border-radius: 12px;
  font-weight: 600;
  font-size: 14px;
  min-width: 120px;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow:
    0 4px 12px rgba(71, 85, 105, 0.25),
    0 2px 4px rgba(71, 85, 105, 0.1);
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(255, 255, 255, 0.2) 50%,
      transparent 100%
    );
    transition: left 0.5s ease;
  }

  &:hover::before {
    left: 100%;
  }

  &:hover:not(:disabled) {
    background: linear-gradient(
      135deg,
      hsl(215, 25%, 35%) 0%,
      hsl(215, 25%, 27%) 100%
    );
    transform: translateY(-2px);
    box-shadow:
      0 8px 20px rgba(71, 85, 105, 0.3),
      0 4px 8px rgba(71, 85, 105, 0.15);
    border-color: hsl(215, 25%, 40%);
  }

  &:focus:not(:disabled) {
    outline: none;
    box-shadow:
      0 0 0 3px rgba(71, 85, 105, 0.3),
      0 8px 20px rgba(71, 85, 105, 0.25);
    outline-offset: 2px;
  }

  &:active:not(:disabled) {
    background: linear-gradient(
      135deg,
      hsl(215, 25%, 20%) 0%,
      hsl(215, 25%, 15%) 100%
    );
    transform: translateY(0);
    box-shadow: 0 2px 8px rgba(71, 85, 105, 0.2);
  }

  &:disabled {
    background: linear-gradient(
      135deg,
      hsl(215, 25%, 15%) 0%,
      hsl(215, 25%, 10%) 100%
    );
    color: rgba(255, 255, 255, 0.4);
    cursor: not-allowed;
    opacity: 0.6;
    box-shadow: none;
    transform: none;
    border-color: hsl(215, 25%, 20%);
  }
`;

export const RefreshButton = styled(Button)`
  height: 48px;
  padding: 0 24px;
  background: linear-gradient(
    135deg,
    hsl(215, 25%, 27%) 0%,
    hsl(215, 25%, 20%) 100%
  );
  color: white;
  border: 1px solid hsl(215, 25%, 35%);
  border-radius: 12px;
  font-weight: 600;
  font-size: 14px;
  min-width: 120px;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow:
    0 4px 12px rgba(71, 85, 105, 0.25),
    0 2px 4px rgba(71, 85, 105, 0.1);
  margin-left: 8px;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(255, 255, 255, 0.2) 50%,
      transparent 100%
    );
    transition: left 0.5s ease;
  }

  &:hover::before {
    left: 100%;
  }

  &:hover:not(:disabled) {
    background: linear-gradient(
      135deg,
      hsl(215, 25%, 35%) 0%,
      hsl(215, 25%, 27%) 100%
    );
    transform: translateY(-2px);
    box-shadow:
      0 8px 20px rgba(71, 85, 105, 0.3),
      0 4px 8px rgba(71, 85, 105, 0.15);
    border-color: hsl(215, 25%, 40%);
  }

  &:focus:not(:disabled) {
    outline: none;
    box-shadow:
      0 0 0 3px rgba(71, 85, 105, 0.3),
      0 8px 20px rgba(71, 85, 105, 0.25);
    outline-offset: 2px;
  }

  &:active:not(:disabled) {
    background: linear-gradient(
      135deg,
      hsl(215, 25%, 20%) 0%,
      hsl(215, 25%, 15%) 100%
    );
    transform: translateY(0);
    box-shadow: 0 2px 8px rgba(71, 85, 105, 0.2);
  }

  &:disabled {
    background: linear-gradient(
      135deg,
      hsl(215, 25%, 15%) 0%,
      hsl(215, 25%, 10%) 100%
    );
    color: rgba(255, 255, 255, 0.4);
    cursor: not-allowed;
    opacity: 0.8;
    box-shadow: none;
    transform: none;
    border-color: hsl(215, 25%, 20%);
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
  z-index: 50;
  isolation: isolate;
`;

export const TimeLineSelectTrigger = styled.button<{ theme?: any }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 40px;
  width: 100%;
  border-radius: ${({ theme }) => theme?.borderRadius?.lg || "8px"};
  border: 1px solid
    ${({ theme }) => theme?.colors?.default?.border || "hsl(var(--border))"};
  background-color: ${({ theme }) =>
    theme?.colors?.default?.background || "hsl(var(--background))"};
  padding: 0 ${({ theme }) => theme?.spacing?.[3] || "12px"};
  font-size: ${({ theme }) => theme?.fontSizes?.sm || "14px"};
  color: ${({ theme }) =>
    theme?.colors?.default?.foreground || "hsl(var(--foreground))"};
  cursor: pointer;
  transition: ${({ theme }) => theme?.transitions?.all || "all 0.2s ease"};

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px
      ${({ theme }) => theme?.colors?.default?.ring || "hsl(var(--ring))"};
    outline-offset: 2px;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  &:hover {
    background-color: ${({ theme }) =>
      theme?.colors?.default?.accent || "hsl(var(--accent))"};
    color: ${({ theme }) =>
      theme?.colors?.default?.accentForeground ||
      "hsl(var(--accent-foreground))"};
  }
`;

export const TimeLineSelectValue = styled.span<{ theme?: any }>`
  color: ${({ theme }) =>
    theme?.colors?.default?.foreground || "hsl(var(--foreground))"};
  font-weight: ${({ theme }) => theme?.fontWeights?.medium || "500"};
`;

export const TimeLineSelectContent = styled.div<{ theme?: any }>`
  position: absolute;
  top: 100%;
  left: 0;
  right: auto;
  z-index: 50;
  max-height: 384px;
  min-width: 200px;
  overflow-y: auto;
  border-radius: 8px;
  border: 1px solid hsl(var(--border));
  background-color: white;
  color: hsl(var(--foreground));
  box-shadow:
    0 10px 80px rgba(0, 0, 0, 0.12),
    0 4px 16px rgba(0, 0, 0, 0.08);
  margin-top: 4px;
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
  height: 44px;
  padding: 10px 12px;
  background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
  border: 1px solid hsl(var(--border));
  border-radius: 12px;
  color: hsl(var(--foreground));
  font-size: 14px;
  font-family:
    ui-sans-serif,
    system-ui,
    -apple-system,
    Segoe UI,
    Roboto,
    Noto Sans,
    Ubuntu,
    Cantarell,
    Helvetica Neue,
    Arial,
    "Apple Color Emoji",
    "Segoe UI Emoji";
  transition:
    box-shadow 0.2s ease,
    border-color 0.2s ease;
  box-shadow:
    0 1px 2px rgba(0, 0, 0, 0.04),
    inset 0 1px 0 rgba(255, 255, 255, 0.6);

  &:hover {
    border-color: hsl(var(--accent));
  }

  &:focus {
    border-color: hsl(var(--primary));
    background: #ffffff;
    box-shadow:
      0 0 0 3px rgba(59, 130, 246, 0.15),
      0 1px 2px rgba(0, 0, 0, 0.08);
    outline: none;
  }

  &::placeholder {
    color: hsl(var(--muted-foreground));
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
    outline: 2px solid
      ${({ theme }) => theme?.colors?.default?.ring || "hsl(var(--ring))"};
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
          border: 1px solid
            ${props.theme?.colors?.default?.border || "hsl(var(--border))"};
          background-color: ${props.theme?.colors?.default?.background ||
          "hsl(var(--background))"};
          color: ${props.theme?.colors?.default?.foreground ||
          "hsl(var(--foreground))"};
          &:hover {
            background-color: ${props.theme?.colors?.default?.accent ||
            "hsl(var(--accent))"};
            color: ${props.theme?.colors?.default?.accentForeground ||
            "hsl(var(--accent-foreground))"};
          }
        `;
      default:
        return css`
          background: linear-gradient(
            135deg,
            hsl(215, 25%, 27%) 0%,
            hsl(215, 25%, 20%) 100%
          );
          color: #ffffff;
          border: 1px solid hsl(215, 25%, 35%);
          &:hover {
            background: linear-gradient(
              135deg,
              hsl(215, 25%, 35%) 0%,
              hsl(215, 25%, 27%) 100%
            );
          }
        `;
    }
  }}

  ${(props) => {
    switch (props.size) {
      case "sm":
        return css`
          height: 36px;
          border-radius: ${props.theme?.borderRadius?.md || "6px"};
          padding: 0 ${props.theme?.spacing?.[3] || "12px"};
          font-size: ${props.theme?.fontSizes?.xs || "12px"};
        `;
      default:
        return css`
          height: 40px;
          padding: 0 ${props.theme?.spacing?.[4] || "16px"};
        `;
    }
  }}

  flex: 1;
`;

export const TimeLineFilterContent = styled(TimeLineSelectContent)`
  width: 420px;
  padding: 20px 20px 16px 20px;
  z-index: 100;
  isolation: isolate;
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  right: auto;
  min-width: 320px;
  max-width: calc(100vw - 32px);
  box-shadow:
    0 24px 80px rgba(0, 0, 0, 0.18),
    0 8px 20px rgba(0, 0, 0, 0.08);
  background-color: white;
  border: 1px solid hsl(var(--border));
  border-radius: 16px;
  margin-top: 4px;

  @media (max-width: 768px) {
    width: 320px;
    min-width: 280px;
  }
`;

export const TimeLineFilterSection = styled.div<{ theme?: any }>`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme?.spacing?.[4] || "16px"};
`;

export const TimeLineFilterLabel = styled.label<{ theme?: any }>`
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 8px;
  display: block;
  color: hsl(var(--foreground));
`;

export const TimeLineFilterInlineNote = styled.span<{ theme?: any }>`
  font-size: 12px;
  color: hsl(var(--muted-foreground));
  font-weight: 500;
  margin-left: 6px;
`;

export const TimeLineFilterInputGrid = styled.div<{ theme?: any }>`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  margin-bottom: 16px;
`;

export const TimeLineTimeWithToggle = styled.div<{ theme?: any }>`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const TimeLineAmPmToggle = styled.div<{ theme?: any }>`
  display: inline-flex;
  align-items: center;
  gap: 2px;
  background: ${({ theme }) =>
    theme?.colors?.default?.muted || "hsl(var(--muted))"};
  border: 1px solid
    ${({ theme }) => theme?.colors?.default?.border || "hsl(var(--border))"};
  border-radius: 9999px;
  padding: 2px;
`;

export const TimeLineAmPmOption = styled.button<{
  active?: boolean;
  theme?: any;
}>`
  min-width: 36px;
  height: 28px;
  padding: 0 10px;
  border-radius: 9999px;
  border: none;
  cursor: pointer;
  font-size: 12px;
  font-weight: 600;
  color: ${({ active, theme }) =>
    active
      ? theme?.colors?.default?.primaryForeground || "#fff"
      : theme?.colors?.default?.foreground || "hsl(var(--foreground))"};
  background: ${({ active, theme }) =>
    active
      ? theme?.colors?.default?.primary || "hsl(var(--primary))"
      : "transparent"};
  transition: ${({ theme }) => theme?.transitions?.all || "all 0.2s ease"};

  &:hover {
    background: ${({ active, theme }) =>
      active
        ? theme?.colors?.default?.primary || "hsl(var(--primary))"
        : theme?.colors?.default?.accent || "hsl(var(--accent))"};
  }
`;

export const TimeLineFilterNote = styled.div<{ theme?: any }>`
  font-size: 12px;
  color: hsl(var(--muted-foreground));
  text-align: center;
  margin: 8px 0 4px 0;
  padding: 8px;
  background: hsl(var(--muted) / 0.4);
  border-radius: 10px;
`;

export const TimeLineFilterButtonGrid = styled.div<{ theme?: any }>`
  display: flex;
  gap: 8px;
  margin-top: 16px;
  justify-content: flex-end;
`;

export const TimeLineQuickRanges = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 8px 0 4px 0;
`;

export const TimeLineQuickChip = styled.button`
  height: 28px;
  padding: 0 10px;
  border-radius: 9999px;
  border: 1px solid hsl(var(--border));
  background: hsl(var(--muted));
  color: hsl(var(--foreground));
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: hsl(var(--accent));
    color: hsl(var(--accent-foreground));
    transform: translateY(-1px);
  }
`;

// Filter Modal Components
export const FilterModalBackdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(2px);
  z-index: 1000;
  animation: fadeIn 0.4s cubic-bezier(0.4, 0, 0.2, 1);

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
  width: 440px;
  height: 100vh;
  background: white;
  border-left: 1px solid #e5e7eb;
  border-radius: 0;
  z-index: 1001;
  display: flex;
  flex-direction: column;
  animation: slideInFromRight 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  box-shadow: -4px 0 12px rgba(0, 0, 0, 0.15);

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
    border-radius: 0;
  }

  .dark & {
    background: #1f2937;
    border-left: 1px solid #374151;
  }
`;

export const FilterModalHeader = styled.div<{ theme?: any }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #f8fafc;
  color: #1f2937;
  border-radius: 0;
  padding: 24px 32px;
  border-bottom: 1px solid #e5e7eb;
  flex-shrink: 0;
  position: relative;

  .dark & {
    background: #111827;
    color: #f9fafb;
    border-bottom: 1px solid #374151;
  }
`;

export const FilterModalContent = styled.div<{ theme?: any }>`
  flex: 1;
  overflow-y: auto;
  padding: 24px 32px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  background: white;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(156, 163, 175, 0.3);
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(107, 114, 128, 0.3);
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: rgba(107, 114, 128, 0.5);
  }

  .dark & {
    background: #1f2937;
  }
`;

export const FilterModalSearch = styled.div<{ theme?: any }>`
  position: relative;
  margin-bottom: ${({ theme }) => theme?.spacing?.[4] || "16px"};
`;

export const FilterModalListItem = styled.div<{ theme?: any }>`
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: #f9fafb;
  transition: all 0.2s ease;
  margin-bottom: 12px;
  overflow: hidden;

  &:hover {
    border-color: rgba(59, 130, 246, 0.3);
  }

  &:last-child {
    margin-bottom: 0;
  }

  /* Active/clicked state - greyish border */
  &.expanded {
    border-color: #9ca3af;
    border-width: 2px;
    box-shadow: 0 0 0 1px rgba(156, 163, 175, 0.2);
  }

  /* Fallback for browsers that support :has() */
  &:has([data-state="open"]) {
    border-color: #9ca3af;
    border-width: 2px;
    box-shadow: 0 0 0 1px rgba(156, 163, 175, 0.2);
  }

  .dark & {
    background: #374151;
    border: 1px solid #4b5563;

    &:hover {
      border-color: rgba(96, 165, 250, 0.3);
    }

    &.expanded {
      border-color: #6b7280;
      border-width: 2px;
      box-shadow: 0 0 0 1px rgba(107, 114, 128, 0.2);
    }

    &:has([data-state="open"]) {
      border-color: #6b7280;
      border-width: 2px;
      box-shadow: 0 0 0 1px rgba(107, 114, 128, 0.2);
    }
  }
`;

export const FilterModalItemHeader = styled.div<{
  isActive?: boolean;
  theme?: any;
}>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 16px 20px;
  cursor: pointer;
  transition: all 0.2s ease;
  background: none;
  border: none;
  text-align: left;
  color: ${(props) => (props.isActive ? "#3b82f6" : "#1f2937")};

  &:hover {
    background: rgba(243, 244, 246, 0.5);
  }

  &[data-state="open"] {
    background: #f3f4f6;
    border-bottom: 1px solid #e5e7eb;
  }

  /* Parent styling for clicked/expanded state */
  &[data-state="open"] {
    & + * {
      border-top: 1px solid #9ca3af;
    }
  }

  .dark & {
    color: ${(props) => (props.isActive ? "#60a5fa" : "#f9fafb")};

    &:hover {
      background: rgba(75, 85, 99, 0.5);
    }

    &[data-state="open"] {
      background: #4b5563;
      border-bottom: 1px solid #6b7280;
    }

    &[data-state="open"] {
      & + * {
        border-top: 1px solid #6b7280;
      }
    }
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
  color: ${(props) => (props.hasActive ? "#3b82f6" : "#1f2937")};
  margin: 0;

  .dark & {
    color: ${(props) => (props.hasActive ? "#60a5fa" : "#f9fafb")};
  }
`;

export const FilterModalCount = styled.div<{ theme?: any }>`
  background: ${({ theme }) =>
    theme?.colors?.default?.primary || "hsl(var(--primary))"};
  color: ${({ theme }) =>
    theme?.colors?.default?.primaryForeground ||
    "hsl(var(--primary-foreground))"};
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

export const FilterModalExpandIcon = styled.div<{
  isOpen: boolean;
  theme?: any;
}>`
  transition: transform 0.2s ease;
  transform: ${(props) => (props.isOpen ? "rotate(90deg)" : "rotate(0deg)")};
  color: ${({ theme }) =>
    theme?.colors?.default?.mutedForeground || "hsl(var(--muted-foreground))"};
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

export const FilterModalCheckbox = styled.div<{
  selected: boolean;
  theme?: any;
}>`
  width: 18px;
  height: 18px;
  border: 2px solid
    ${(props) =>
      props.selected
        ? props.theme?.colors?.default?.primary || "hsl(var(--primary))"
        : props.theme?.colors?.default?.border || "hsl(var(--border))"};
  border-radius: 4px;
  background-color: ${(props) =>
    props.selected
      ? props.theme?.colors?.default?.primary || "hsl(var(--primary))"
      : "transparent"};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: ${({ theme }) => theme?.transitions?.all || "all 0.2s ease"};

  &:hover {
    border-color: ${({ theme }) =>
      theme?.colors?.default?.primary || "hsl(var(--primary))"};
  }
`;

export const FilterModalFooter = styled.div<{ theme?: any }>`
  padding: 20px 32px;
  border-top: 1px solid #e5e7eb;
  flex-shrink: 0;
  background: white;

  .dark & {
    background: #1f2937;
    border-top: 1px solid #374151;
  }
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
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;
  cursor: pointer;
  border: none;
  outline: none;
  width: 100%;
  height: 40px;
  margin-bottom: 8px;

  &:hover {
    opacity: 0.9;
  }

  &:last-child {
    margin-bottom: 0;
  }

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
      default:
        return css`
          background: linear-gradient(
            135deg,
            hsl(215, 25%, 27%) 0%,
            hsl(215, 25%, 20%) 100%
          );
          color: #ffffff;
          border: 1px solid hsl(215, 25%, 35%);

          &:hover {
            opacity: 1;
            background: linear-gradient(
              135deg,
              hsl(215, 25%, 35%) 0%,
              hsl(215, 25%, 27%) 100%
            );
            transform: translateY(-1px);
            box-shadow:
              0 8px 20px rgba(71, 85, 105, 0.3),
              0 4px 8px rgba(71, 85, 105, 0.15);
            border-color: hsl(215, 25%, 40%);
          }

          &:focus-visible {
            outline: none;
            box-shadow:
              0 0 0 3px rgba(71, 85, 105, 0.3),
              0 8px 20px rgba(71, 85, 105, 0.25);
            outline-offset: 2px;
          }

          &:active {
            background: linear-gradient(
              135deg,
              hsl(215, 25%, 20%) 0%,
              hsl(215, 25%, 15%) 100%
            );
            transform: translateY(0);
            box-shadow: 0 2px 8px rgba(71, 85, 105, 0.2);
          }

          &:disabled {
            background: linear-gradient(
              135deg,
              hsl(215, 25%, 15%) 0%,
              hsl(215, 25%, 10%) 100%
            );
            color: rgba(255, 255, 255, 0.4);
            cursor: not-allowed;
            opacity: 0.8;
            box-shadow: none;
            transform: none;
            border-color: hsl(215, 25%, 20%);
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
  color: #1f2937;

  .dark & {
    color: #f9fafb;
  }
`;

export const FilterModalSearchIcon = styled.div<{ theme?: any }>`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) =>
    theme?.colors?.default?.mutedForeground || "hsl(var(--muted-foreground))"};
  z-index: 1;
`;

export const FilterModalSearchInput = styled.input<{ theme?: any }>`
  width: 100%;
  padding: 8px 12px;
  padding-left: 40px;
  height: 44px;
  border-radius: 12px;
  border: 2px solid #e5e7eb;
  background: #ffffff;
  color: #1f2937;
  font-size: 14px;

  &:focus {
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    outline: none;
  }

  &::placeholder {
    color: #9ca3af;
  }

  .dark & {
    background: #374151;
    border: 2px solid #4b5563;
    color: #f9fafb;

    &:focus {
      border-color: #60a5fa;
      box-shadow: 0 0 0 3px rgba(96, 165, 250, 0.1);
    }

    &::placeholder {
      color: #6b7280;
    }
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
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
  width: 28px;
  height: 28px;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: hsl(var(--muted) / 0.6);
  color: ${({ theme }) =>
    theme?.colors?.default?.mutedForeground || "hsl(var(--muted-foreground))"};
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
`;

export const FilterModalSectionSearchInput = styled.input<{
  disabled?: boolean;
  theme?: any;
}>`
  width: 100%;
  height: 44px;
  padding: 10px 14px;
  padding-left: 52px;
  border-radius: 12px;
  border: 1px solid
    ${({ theme }) => theme?.colors?.default?.border || "hsl(var(--border))"};
  background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
  font-size: 14px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "text")};
  opacity: ${(props) => (props.disabled ? "0.6" : "1")};
  color: ${({ theme }) =>
    theme?.colors?.default?.foreground || "hsl(var(--foreground))"};
  transition:
    box-shadow 0.2s ease,
    border-color 0.2s ease,
    transform 0.06s ease;
  box-shadow:
    0 1px 2px rgba(0, 0, 0, 0.04),
    inset 0 1px 0 rgba(255, 255, 255, 0.6);

  &:hover {
    border-color: hsl(var(--accent));
  }

  &:focus {
    border-color: ${({ theme, disabled }) =>
      disabled
        ? theme?.colors?.default?.border || "hsl(var(--border))"
        : theme?.colors?.default?.primary || "hsl(var(--primary))"};
    background: #ffffff;
    box-shadow:
      0 0 0 3px rgba(59, 130, 246, 0.15),
      0 1px 2px rgba(0, 0, 0, 0.08);
    outline: none;
  }

  &::placeholder {
    color: ${({ theme }) =>
      theme?.colors?.default?.mutedForeground ||
      "hsl(var(--muted-foreground))"};
    font-size: 13px;
  }
`;

export const FilterModalOptionItem = styled.div<{
  isSelected?: boolean;
  theme?: any;
}>`
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
  margin-bottom: ${({ theme }) => theme?.spacing?.[1] || "4px"};

  &:hover {
    background: hsl(var(--accent));
    transform: translateX(2px);
  }
`;

export const FilterModalOptionText = styled.span<{ theme?: any }>`
  font-size: 14px;
  color: ${({ theme }) =>
    theme?.colors?.default?.foreground || "hsl(var(--foreground))"};
`;

export const FilterModalCheckIcon = styled.svg<{ theme?: any }>`
  width: 10px;
  height: 10px;
  color: ${({ theme }) =>
    theme?.colors?.default?.primaryForeground ||
    "hsl(var(--primary-foreground))"};
`;

export const FilterModalCloseButton = styled.button<{ theme?: any }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: 1px solid #e5e7eb;
  background: #f9fafb;
  cursor: pointer;
  border-radius: 12px;
  color: #6b7280;
  transition: all 0.2s ease;

  &:hover {
    background: #f3f4f6;
    color: #374151;
    transform: scale(1.05);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #3b82f6;
  }

  .dark & {
    background: #374151;
    border: 1px solid #4b5563;
    color: #d1d5db;

    &:hover {
      background: #4b5563;
      color: #f9fafb;
    }
  }
`;

export const FilterModalSeparator = styled.div<{ theme?: any }>`
  flex-shrink: 0;
  background: ${({ theme }) =>
    theme?.colors?.default?.border || "hsl(var(--border))"};
  height: 1px;
  width: 100%;
`;

export const FilterModalEmptyState = styled.div<{ theme?: any }>`
  text-align: center;
  padding: 40px 20px;
  color: ${({ theme }) =>
    theme?.colors?.default?.mutedForeground || "hsl(var(--muted-foreground))"};
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
  height: 44px;
  padding: 10px 14px;
  border-radius: 12px;
  border: 1px solid
    ${({ theme }) => theme?.colors?.default?.border || "hsl(var(--border))"};
  background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
  font-size: 14px;
  color: ${({ theme }) =>
    theme?.colors?.default?.foreground || "hsl(var(--foreground))"};
  transition:
    box-shadow 0.2s ease,
    border-color 0.2s ease;
  box-shadow:
    0 1px 2px rgba(0, 0, 0, 0.04),
    inset 0 1px 0 rgba(255, 255, 255, 0.6);

  &:hover {
    border-color: hsl(var(--accent));
  }

  &:focus {
    border-color: ${({ theme }) =>
      theme?.colors?.default?.primary || "hsl(var(--primary))"};
    background: #ffffff;
    box-shadow:
      0 0 0 3px rgba(59, 130, 246, 0.15),
      0 1px 2px rgba(0, 0, 0, 0.08);
    outline: none;
  }

  &::placeholder {
    color: ${({ theme }) =>
      theme?.colors?.default?.mutedForeground ||
      "hsl(var(--muted-foreground))"};
    font-size: 13px;
  }
`;

export const FilterModalTypeIcon = styled.div`
  font-size: 12px;
  color: hsl(var(--primary));
`;
