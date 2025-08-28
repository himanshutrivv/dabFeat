import styled from "@emotion/styled";
import { css } from "@emotion/react";

// Loader components
export const LoaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: hsl(var(--background));
`;

export const LoaderSpinner = styled.div<{ size?: "sm" | "md" | "lg" }>`
  border-radius: 50%;
  border: 2px solid hsl(var(--border));
  border-top-color: hsl(var(--primary));
  animation: spin 1s linear infinite;

  ${(props) => {
    switch (props.size) {
      case "sm":
        return "width: 1rem; height: 1rem;";
      case "lg":
        return "width: 2rem; height: 2rem;";
      default:
        return "width: 1.5rem; height: 1.5rem;";
    }
  }}

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

export const globalTheme = css`
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --primary: 262 83% 58%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 262 83% 58%;
    --radius: 1rem;
    --sidebar-background: 0 0% 98%;
    --sidebar-foreground: 240 5.3% 26.1%;
    --sidebar-primary: 262 83% 58%;
    --sidebar-primary-foreground: 210 40% 98%;
    --sidebar-accent: 240 4.8% 95.9%;
    --sidebar-accent-foreground: 240 5.9% 10%;
    --sidebar-border: 220 13% 91%;
    --sidebar-ring: 262 83% 58%;
  }

  .dark {
    --background: 229 23% 11%;
    --foreground: 210 40% 98%;
    --card: 228 25% 13%;
    --card-foreground: 210 40% 98%;
    --popover: 228 25% 13%;
    --popover-foreground: 210 40% 98%;
    --primary: 262 83% 58%;
    --primary-foreground: 210 40% 98%;
    --secondary: 227 25% 15%;
    --secondary-foreground: 210 40% 98%;
    --muted: 227 25% 15%;
    --muted-foreground: 215 20.2% 65.1%;
    --accent: 262 83% 58%;
    --accent-foreground: 210 40% 98%;
    --destructive: 0 62.8% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 228 25% 18%;
    --input: 228 25% 18%;
    --ring: 262 83% 58%;
    --sidebar-background: 227 25% 10%;
    --sidebar-foreground: 210 40% 98%;
    --sidebar-primary: 262 83% 58%;
    --sidebar-primary-foreground: 210 40% 98%;
    --sidebar-accent: 227 25% 15%;
    --sidebar-accent-foreground: 210 40% 98%;
    --sidebar-border: 228 25% 18%;
    --sidebar-ring: 262 83% 58%;
  }

  * {
    border-color: hsl(var(--border));
  }

  body {
    background-color: hsl(var(--background));
    color: hsl(var(--foreground));
    font-feature-settings:
      "rlig" 1,
      "calt" 1;
    margin: 0;
    font-family:
      -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
      "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
      sans-serif;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: 600;
  }

  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background-color: hsl(var(--muted));
  }

  ::-webkit-scrollbar-thumb {
    background-color: hsl(var(--muted-foreground) / 0.3);
    border-radius: 9999px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: hsl(var(--muted-foreground) / 0.5);
  }

  input[type="time"]:focus {
    outline: none;
    box-shadow:
      0 0 0 2px rgb(59 130 246 / 0.1),
      0 0 0 4px rgb(59 130 246 / 0.2);
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

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
  overflow: visible;
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
  overflow: auto;
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
  position: relative;
  z-index: 1;

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
  z-index: 1;
  overflow: visible;
`;

export const SearchBarContainer = styled.div`
  margin-bottom: 24px;
  margin-top: 24px;
  position: relative;
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
  z-index: 1;

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
`;

export const TimelineInput = styled.input`
  width: 100%;
  padding: 8px 12px;
  background-color: hsl(var(--background));
  border: 1px solid hsl(var(--border));
  border-radius: 6px;
  color: hsl(var(--foreground));
  font-size: 14px;
  font-family: monospace;

  &:focus {
    box-shadow: 0 0 0 2px hsl(var(--primary));
    border-color: hsl(var(--primary));
    outline: none;
  }

  &::placeholder {
    color: hsl(var(--muted-foreground));
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

// Select components with fixed hover effects
export const SelectContainer = styled.div`
  position: relative;
  z-index: 600;
`;

export const SelectTrigger = styled.button`
  display: flex;
  height: 40px;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  border-radius: 25px;
  border: 2px solid #e5e7eb;
  background-color: #ffffff;
  padding: 0 16px;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  cursor: pointer;
  transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

  &:focus {
    outline: none;
    border-color: #d1d5db;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  &:hover {
    border-color: #d1d5db;
    background-color: #f9fafb;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

export const SelectValue = styled.span`
  color: #374151;
  font-weight: 500;
`;

export const SelectContent = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 1000;
  max-height: 384px;
  min-width: 200px;
  overflow-y: auto;
  border-radius: 8px;
  border: 1px solid hsl(var(--border));
  background-color: hsl(var(--card));
  color: hsl(var(--card-foreground));
  opacity: 1;
  box-shadow: 0 10px 80px rgba(0, 0, 0, 0.12), 0 4px 16px rgba(0, 0, 0, 0.08);
  margin-top: 4px;
  animation: fadeIn 0.2s ease-out;
  isolation: isolate;

  &.filter-content {
    background-color: hsl(var(--card)) !important;
    opacity: 1 !important;
  }

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

export const SelectItem = styled.div<{ selected?: boolean }>`
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

export const SelectItemsContainer = styled.div`
  padding: 8px 4px;
`;

// Table components
export const TableContainer = styled.div`
  flex: 1;
  padding: 32px;
  overflow: hidden;
  min-height: 0;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 1;
  background-color: hsl(var(--background));
`;

export const TableWrapper = styled.div`
  background-color: white;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  overflow: auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  flex: 1;
  min-height: 0;
  width: 100%;
  position: relative;
  z-index: 1;
`;

export const TableScrollContainer = styled.div`
  overflow: auto;
  flex: 1;
  min-height: 0;
  position: relative;
  z-index: 1;
`;

export const Table = styled.table`
  width: 100%;
  min-width: max-content;
  border-collapse: collapse;
`;

export const TableHead = styled.thead`
  position: sticky;
  top: 0;
  z-index: 10;
`;

export const TableHeaderRow = styled.tr`
  background: hsl(215, 25%, 27%);
  border: none;
  position: sticky;
  top: 0;
  z-index: 5;
`;

export const TableHeader = styled.th`
  text-align: left;
  padding: 16px 24px;
  font-weight: 600;
  color: white;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  white-space: nowrap;
  min-width: 150px;
  position: sticky;
  top: 0;
  backdrop-filter: blur(12px);
  z-index: 5;
  border: 1px solid #1d4ed8;
  border-bottom: 2px solid #1e40af;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
`;

export const TableBody = styled.tbody``;

export const TableRow = styled.tr`
  border-bottom: 1px solid #e5e7eb;
  transition: all 0.2s ease;

  &:nth-of-type(even) {
    background-color: #f8fafc;
  }

  &:nth-of-type(odd) {
    background-color: white;
  }

  &:hover {
    background-color: hsl(var(--muted) / 0.5);
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(59, 130, 246, 0.15);
  }
`;

export const TableCell = styled.td`
  padding: 16px 24px;
  white-space: nowrap;
  min-width: 150px;
  color: #374151;
  font-size: 14px;
  border-right: 1px solid #f3f4f6;

  &:last-child {
    border-right: none;
  }
`;

export const TableCellClickableStyled = styled(TableCell)`
  cursor: pointer;

  &:hover {
    background-color: hsl(var(--accent) / 0.5);
  }
`;

export const TableEmptyStateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 24px;
  text-align: center;
`;

export const TableEmptyStateIcon = styled.div`
  color: hsl(var(--muted-foreground));
  margin-bottom: 16px;
`;

export const TableEmptyStateTitle = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: hsl(var(--foreground));
  margin-bottom: 8px;
`;

export const TableEmptyStateDescription = styled.div`
  font-size: 14px;
  color: hsl(var(--muted-foreground));
`;

// Filter Modal components with fixed hover effects
export const FilterModalBackdrop = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  z-index: 9998;
  animation: fadeIn 0.3s ease-out;
  opacity: 1;

  @keyframes fadeIn {
    from {
      opacity: 0;
      backdrop-filter: blur(0px);
    }
    to {
      opacity: 1;
      backdrop-filter: blur(12px);
    }
  }
`;

export const FilterModalContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 33.333333%;
  height: 100vh;
  background-color: hsl(var(--card));
  border-left: 1px solid hsl(var(--border));
  border-top-left-radius: 16px;
  border-bottom-left-radius: 16px;
  box-shadow:
    0 25px 50px -12px rgba(0, 0, 0, 0.25),
    0 10px 25px -6px rgba(0, 0, 0, 0.1);
  z-index: 9999;
  display: flex;
  flex-direction: column;
  animation: slideInFromRight 0.3s ease-out;
  opacity: 1;
  isolation: isolate;
  transform: translateZ(0);
  will-change: transform;
  filter: none !important;
  -webkit-filter: none !important;
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;

  @keyframes slideInFromRight {
    from {
      transform: translateX(100%) translateZ(0);
    }
    to {
      transform: translateX(0) translateZ(0);
    }
  }

  @media (max-width: 768px) {
    width: 90%;
    right: 5%;
  }

  * {
    filter: none !important;
    -webkit-filter: none !important;
    backdrop-filter: none !important;
    -webkit-backdrop-filter: none !important;
  }
`;

export const FilterModalHeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px;
  border-bottom: 1px solid hsl(var(--border));
  flex-shrink: 0;
`;

export const FilterModalContentContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 24px;
`;

export const FilterModalListItem = styled.div`
  margin-bottom: 32px;
  border-bottom: 1px solid hsl(var(--border));

  &:last-child {
    border-bottom: none;
  }
`;

export const FilterModalItemHeaderContainer = styled.div<{
  isActive?: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 0;
  cursor: pointer;
  transition: all 0.2s ease;
  color: ${(props) =>
    props.isActive ? "hsl(var(--primary))" : "hsl(var(--foreground))"};

  &:hover {
    background-color: hsl(var(--muted) / 0.3);
    margin: 0 -24px;
    padding-left: 24px;
    padding-right: 24px;
  }
`;

export const FilterModalExpandIcon = styled.div<{ isExpanded: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: ${(props) =>
    props.isExpanded ? "hsl(var(--primary))" : "hsl(var(--muted))"};
  color: ${(props) =>
    props.isExpanded ? "white" : "hsl(var(--muted-foreground))"};
  transition: all 0.2s ease;
`;

export const FilterModalOptionsContainer = styled.div`
  padding: 0 0 16px 0;
  margin-top: -8px;
`;

export const FilterModalOptions = styled.div`
  max-height: 256px;
  overflow-y: auto;
`;

export const FilterModalCheckboxContainer = styled.div<{ selected: boolean }>`
  width: 20px;
  height: 20px;
  border: 2px solid
    ${(props) =>
    props.selected ? "hsl(var(--primary))" : "hsl(var(--border))"};
  border-radius: 4px;
  background-color: ${(props) =>
    props.selected ? "hsl(var(--primary))" : "transparent"};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
`;

export const FilterModalFooterContainer = styled.div`
  padding: 24px;
  border-top: 1px solid hsl(var(--border));
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const FilterModalButton = styled(Button)``;

export const FilterModalHeaderTitle = styled.h2`
  margin: 0;
  font-size: 20px;
  font-weight: 600;
`;

export const FilterModalSearchIconStyled = styled.div`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: hsl(var(--muted-foreground));
`;

export const FilterModalSearchInputStyled = styled.input`
  width: 100%;
  padding-left: 40px;
  padding-right: 12px;
  padding-top: 12px;
  padding-bottom: 12px;
  border: 1px solid hsl(var(--input));
  border-radius: 8px;
  font-size: 14px;
  background-color: hsl(var(--background));
  color: hsl(var(--foreground));

  &:focus {
    box-shadow: 0 0 0 2px hsl(var(--ring));
    border-color: hsl(var(--ring));
    outline: none;
  }

  &::placeholder {
    color: hsl(var(--muted-foreground));
  }
`;

export const FilterModalSectionContentStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
`;

export const FilterModalItemTitleStyled = styled.span`
  font-size: 16px;
  font-weight: 400;
`;

export const FilterModalItemTitleActiveStyled = styled.span`
  font-size: 16px;
  font-weight: 600;
`;

export const FilterModalItemCountStyled = styled.span`
  margin-left: 8px;
  font-size: 12px;
  background-color: hsl(var(--primary));
  color: white;
  padding: 2px 6px;
  border-radius: 10px;
`;

export const FilterModalSectionSearchIconStyled = styled.div`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: hsl(var(--muted-foreground));
`;

export const FilterModalSectionSearchInputStyled = styled.input`
  width: 100%;
  padding-left: 36px;
  padding-right: 12px;
  padding-top: 8px;
  padding-bottom: 8px;
  border: 1px solid hsl(var(--input));
  border-radius: 6px;
  font-size: 13px;
  background-color: hsl(var(--background));
  color: hsl(var(--foreground));

  &:focus {
    box-shadow: 0 0 0 2px hsl(var(--ring));
    border-color: hsl(var(--ring));
    outline: none;
  }

  &::placeholder {
    color: hsl(var(--muted-foreground));
  }
`;

export const FilterModalOptionItemStyled = styled.div<{ isSelected?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 6px;
  background-color: ${(props) =>
    props.isSelected ? "hsl(var(--accent))" : "transparent"};
  margin-bottom: 2px;
  transition: all 0.2s ease;

  &:hover {
    background-color: hsl(var(--accent));
    color: hsl(var(--accent-foreground));
  }

  &:focus {
    background-color: hsl(var(--accent));
    color: hsl(var(--accent-foreground));
  }
`;

export const FilterModalOptionTextStyled = styled.span`
  font-size: 14px;
`;

export const FilterModalCheckIconStyled = styled.svg`
  color: white;
`;

export const FilterModalSearchContainerWithMargin = styled.div`
  position: relative;
  margin-bottom: 24px;
`;

export const FilterModalSearchContainerSmallMargin = styled.div`
  position: relative;
  margin-bottom: 12px;
`;

// Filter Dropdown Components with fixed hover effects
export const FilterDropdownFilterGroup = styled.div``;

export const FilterDropdownSelectContainer = styled.div`
  position: relative;
  z-index: 500;
`;

export const FilterDropdownSelectTrigger = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 40px;
  width: 100%;
  border-radius: 25px;
  border: 2px solid #e5e7eb;
  background-color: #ffffff;
  padding: 0 16px;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  cursor: pointer;
  transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

  &:focus {
    outline: none;
    border-color: #d1d5db;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  &:hover {
    border-color: #d1d5db;
    background-color: #f9fafb;
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
  z-index: 1001;
  max-height: 384px;
  min-width: 320px;
  max-width: calc(100vw - 32px);
  overflow-y: auto;
  border-radius: 8px;
  border: 1px solid hsl(var(--border));
  background-color: hsl(var(--card));
  color: hsl(var(--card-foreground));
  opacity: 1;
  padding: 16px;
  box-shadow: 0 10px 80px rgba(0, 0, 0, 0.12), 0 4px 16px rgba(0, 0, 0, 0.08);
  margin-top: 4px;
  animation: fadeIn 0.2s ease-out;
  isolation: isolate;

  &.filter-content {
    background-color: hsl(var(--card)) !important;
    opacity: 1 !important;
  }

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

// Timeline Filter Components with fixed hover effects
export const TimelineFilterGroup = styled.div``;

export const TimelineFilterSelectContainer = styled.div`
  position: relative;
  z-index: 200;
`;

export const TimelineFilterSelectTrigger = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 40px;
  width: 100%;
  border-radius: 25px;
  border: 2px solid #e5e7eb;
  background-color: #ffffff;
  padding: 0 16px;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  cursor: pointer;
  transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

  &:focus {
    outline: none;
    border-color: #d1d5db;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  &:hover {
    border-color: #d1d5db;
    background-color: #f9fafb;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

export const TimelineFilterSelectValue = styled.span`
  color: #374151;
  font-weight: 500;
`;

export const TimelineFilterInput = styled.input`
  width: 100%;
  padding: 8px 12px;
  background-color: hsl(var(--background));
  border: 1px solid hsl(var(--border));
  border-radius: 6px;
  color: hsl(var(--foreground));
  font-size: 14px;
  font-family: monospace;

  &:focus {
    box-shadow: 0 0 0 2px hsl(var(--primary));
    border-color: hsl(var(--primary));
    outline: none;
  }

  &::placeholder {
    color: hsl(var(--muted-foreground));
  }
`;

export const TimelineFilterButton = styled(Button)``;

export const TimelineFilterContentStyled = styled(SelectContent)`
  width: 380px;
  padding: 16px;
  max-width: calc(100vw - 32px);
  right: auto;
  min-width: 320px;
  background-color: white !important;
  opacity: 1 !important;

  &.filter-content {
    background-color: white !important;
    opacity: 1 !important;
  }

  @media (max-width: 768px) {
    width: 300px;
    min-width: 280px;
  }
`;

export const TimelineFilterSectionStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const TimelineFilterLabelStyled = styled.label`
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 8px;
  display: block;
`;

export const TimelineFilterInputGridStyled = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
`;

export const TimelineFilterNoteStyled = styled.div`
  font-size: 12px;
  color: hsl(var(--muted-foreground));
  text-align: center;
`;

export const TimelineFilterButtonGridStyled = styled.div`
  display: flex;
  gap: 8px;
`;
