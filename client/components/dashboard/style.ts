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

// Loading states
export const LoadingContainer = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  gap: 16px;
  background-color: hsl(var(--background));
`;

export const LoadingSpinner = css`
  color: hsl(var(--primary));
  animation: spin 1s linear infinite;

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

export const LoadingText = css`
  color: hsl(var(--muted-foreground));
  font-size: 14px;
`;

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

export const EmptyState = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 24px;
  text-align: center;
`;

export const EmptyIcon = css`
  color: hsl(var(--muted-foreground));
  margin-bottom: 16px;
`;

export const EmptyTitle = css`
  font-size: 18px;
  font-weight: 600;
  color: hsl(var(--foreground));
  margin-bottom: 8px;
`;

export const EmptyDescription = css`
  font-size: 14px;
  color: hsl(var(--muted-foreground));
`;

export const CellContent = css`
  color: hsl(var(--foreground));
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
  overflow: hidden;
`;

export const Header = styled.div`
  background-color: hsl(var(--card));
  border-bottom: 1px solid hsl(var(--border));
  padding: 0 32px;
  position: sticky;
  top: 0;
  z-index: 10;
  flex-shrink: 0;
`;

export const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const HeaderText = styled.div``;

export const HeaderTitle = styled.h1`
  font-size: 30px;
  font-weight: bold;
  color: hsl(var(--foreground));
  margin-bottom: 8px;
  margin: 0 0 8px 0;
`;

export const HeaderSubtitle = styled.p`
  color: hsl(var(--muted-foreground));
  font-size: 18px;
  margin: 0;
`;

export const FilterContainer = styled.div<{ show: boolean }>`
  margin-top: 24px;
  padding: 0;
  background: transparent;
  display: ${(props) => (props.show ? "block" : "none")};
  position: relative;
  z-index: 10;
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

export const FilterActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ActiveFilters = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

export const FilterActions2 = styled.div`
  display: flex;
  gap: 12px;
`;

export const TableContainer = styled.div`
  flex: 1;
  padding: 32px;
  overflow: hidden;
  min-height: 0;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 1;
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

export const StatusBadge = styled.div<{
  status: "Active" | "Down" | "Trouble";
}>`
  display: inline-flex;
  align-items: center;
  padding: 8px 16px;
  border-radius: 12px;
  color: white;
  font-weight: 600;
  font-size: 14px;

  ${(props) => {
    switch (props.status) {
      case "Active":
        return css`
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
        `;
      case "Down":
        return css`
          background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
          box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
        `;
      case "Trouble":
        return css`
          background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
          box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3);
        `;
      default:
        return css`
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
        `;
    }
  }}
`;

export const StatusDot = styled.div`
  width: 8px;
  height: 8px;
  background-color: white;
  border-radius: 50%;
  margin-right: 8px;
`;

export const DocumentCell = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const DocumentIcon = styled.div`
  width: 24px;
  height: 24px;
  background: linear-gradient(135deg, #3b82f6 0%, #6366f1 100%);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const DocumentIconInner = styled.div`
  width: 12px;
  height: 12px;
  background-color: white;
  border-radius: 2px;
`;

export const DocumentLink = styled.span`
  color: hsl(var(--primary));
  font-weight: 500;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: hsl(var(--accent));
  }
`;

// Main Filter Modal Styles
export const MainFilterBackdrop = styled.div`
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

export const MainFilterModal = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 33.333333%;
  height: 100vh;
  background-color: hsl(var(--background));
  border-left: 1px solid hsl(var(--border));
  border-top-left-radius: 24px;
  border-bottom-left-radius: 24px;
  box-shadow: -8px 0 32px rgba(0, 0, 0, 0.15);
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

export const MainFilterHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px;
  border-bottom: 1px solid hsl(var(--border));
  flex-shrink: 0;
`;

export const MainFilterContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 24px;
`;

export const MainFilterSection = styled.div`
  margin-bottom: 32px;
`;

export const MainFilterSearch = styled.div`
  position: relative;
  margin-bottom: 16px;
`;

export const MainFilterOptions = styled.div`
  max-height: 256px;
  overflow-y: auto;
`;

export const MainFilterOption = styled.div`
  &:last-child {
    border-bottom: none !important;
  }
`;

export const MainFilterCheckbox = styled.div<{ selected: boolean }>`
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

export const MainFilterFooter = styled.div`
  padding: 24px;
  border-top: 1px solid hsl(var(--border));
  flex-shrink: 0;
`;

export const MainFilterListItem = styled.div`
  border-bottom: 1px solid hsl(var(--border));

  &:last-child {
    border-bottom: none;
  }
`;

export const MainFilterItemHeader = styled.div<{ isActive?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 0;
  cursor: pointer;
  transition: all 0.2s ease;
  color: ${(props) =>
    props.isActive ? "hsl(var(--primary))" : "hsl(var(--foreground))"};

  &:hover {
    background-color: hsl(var(--muted) / 0.5);
    margin: 0 -24px;
    padding-left: 24px;
    padding-right: 24px;
  }
`;

export const MainFilterExpandIcon = styled.div<{ isExpanded: boolean }>`
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

export const MainFilterOptionsContainer = styled.div`
  padding: 0 0 16px 0;
  margin-top: -8px;
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

// Dashboard specific button components
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

export const SearchButton = styled(Button)`
  background: linear-gradient(135deg, #8b5cf6 0%, #d946ef 100%);
  color: white;
  padding: 12px 24px;
  border-radius: 16px;
  box-shadow:
    0 0 20px rgba(139, 92, 246, 0.4),
    0 0 40px rgba(139, 92, 246, 0.2);

  &:hover {
    opacity: 0.9;
  }
`;

export const LogoImage = css`
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 8px;
`;

export const FilterCount = css`
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
  font-size: 12px;
  font-weight: 600;
  padding: 2px 6px;
  border-radius: 10px;
  margin-left: 4px;
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

// Badge component
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

  &:hover {
    background-color: hsl(var(--primary) / 0.3);
  }
`;

// Select components
export const SelectContainer = styled.div`
  position: relative;
  z-index: 20;
`;

export const SelectTrigger = styled.button`
  display: flex;
  height: 40px;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  border-radius: 8px;
  border: 1px solid hsl(var(--input));
  background-color: hsl(var(--background));
  padding: 0 12px;
  font-size: 14px;
  color: hsl(var(--foreground));
  cursor: pointer;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px hsl(var(--ring));
    outline-offset: 2px;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

export const SelectValue = styled.span`
  color: hsl(var(--foreground));
`;

export const SelectContent = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 30;
  max-height: 384px;
  min-width: 200px;
  overflow-y: auto;
  border-radius: 8px;
  border: 1px solid hsl(var(--border));
  background-color: hsl(var(--card));
  color: hsl(var(--card-foreground));
  box-shadow:
    0 16px 64px rgba(0, 0, 0, 0.3),
    0 8px 32px rgba(0, 0, 0, 0.2);
  margin-top: 4px;
  animation: fadeIn 0.2s ease-out;

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
  border-radius: 4px;
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
  padding: 4px;
`;

// Extracted inline styles from components
export const FilterDropdownSelectItemStyle = css`
  background-color: hsl(var(--accent));
  font-weight: 500;
  margin-bottom: 8px;
`;

export const FilterModalOptionItemSelected = css`
  background-color: hsl(var(--accent));
`;

export const DashboardMainFilterButton = css`
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
`;

export const DashboardMainFilterButtonHover = css`
  transform: translateY(-1px);
  box-shadow: 0 6px 16px rgba(139, 92, 246, 0.35);
`;

export const DashboardClearAllFilterButton = css`
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
`;

export const DashboardClearAllFilterButtonHover = css`
  background-color: hsl(var(--destructive) / 0.1);
`;

export const TableCellClickable = css`
  cursor: pointer;
`;

export const TimelineFilterContent = css`
  width: 380px;
  padding: 16px;
`;

export const TimelineFilterSection = css`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const TimelineFilterLabel = css`
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 8px;
  display: block;
`;

export const TimelineFilterInputGrid = css`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
`;

export const TimelineFilterNote = css`
  font-size: 12px;
  color: hsl(var(--muted-foreground));
  text-align: center;
`;

// Additional styled components for inline styles
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
  border: 1px solid hsl(var(--border));
  border-radius: 8px;
  font-size: 14px;
  background-color: hsl(var(--background));
  color: hsl(var(--foreground));
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
  border: 1px solid hsl(var(--border));
  border-radius: 6px;
  font-size: 13px;
  background-color: hsl(var(--muted));
  color: hsl(var(--foreground));
`;

export const FilterModalOptionItemStyled = styled.div<{ isSelected?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 4px;
  background-color: ${(props) =>
    props.isSelected ? "hsl(var(--accent))" : "transparent"};
  margin-bottom: 2px;
`;

export const FilterModalOptionTextStyled = styled.span`
  font-size: 14px;
`;

export const FilterModalCheckIconStyled = styled.svg`
  color: white;
`;

export const FilterModalFooterClearButtonStyled = styled(Button)`
  margin-bottom: 8px;
  width: 100%;
`;

export const FilterModalFooterApplyButtonStyled = styled(Button)`
  width: 100%;
`;

export const TableCellClickableStyled = styled(TableCell)`
  cursor: pointer;
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

export const TimelineFilterContentStyled = styled(SelectContent)`
  width: 380px;
  padding: 16px;
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

export const TimelineFilterButtonStyled = styled(Button)`
  flex: 1;
`;

export const FilterModalSearchContainerWithMargin = styled(MainFilterSearch)`
  margin-bottom: 24px;
`;

export const FilterModalSearchContainerSmallMargin = styled(MainFilterSearch)`
  margin-bottom: 12px;
`;

// Filter Dropdown Components
export const FilterDropdownFilterGroup = styled.div``;

export const FilterDropdownSelectContainer = styled.div`
  position: relative;
  z-index: 20;
`;

export const FilterDropdownSelectTrigger = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 40px;
  width: 100%;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 1px solid ${({ theme }) => theme.colors.input};
  background-color: ${({ theme }) => theme.colors.background};
  padding: 0 ${({ theme }) => theme.spacing[3]};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.foreground};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.all};

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.ring};
    outline-offset: 2px;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.accentForeground};
  }
`;

export const FilterDropdownSelectValue = styled.span`
  color: ${({ theme }) => theme.colors.foreground};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;

export const FilterDropdownSelectContent = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 30;
  max-height: 384px;
  min-width: 200px;
  overflow-y: auto;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.card};
  color: ${({ theme }) => theme.colors.cardForeground};
  box-shadow: ${({ theme }) => theme.shadows.xl};
  margin-top: ${({ theme }) => theme.spacing[1]};
  animation: fadeIn 0.2s ease-out;

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
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  padding: ${({ theme }) => theme.spacing[2]} ${({ theme }) => theme.spacing[3]};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  outline: none;
  transition: ${({ theme }) => theme.transitions.all};
  color: ${({ theme }) => theme.colors.foreground};
  font-weight: ${(props) =>
    props.selected
      ? props.theme.fontWeights.semibold
      : props.theme.fontWeights.normal};

  &:hover {
    background-color: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.accentForeground};
  }

  &:focus {
    background-color: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.accentForeground};
  }

  ${(props) =>
    props.selected &&
    `
      background-color: ${props.theme.colors.accent};
      color: ${props.theme.colors.accentForeground};
    `}
`;

// Timeline Filter Components
export const TimelineFilterGroup = styled.div``;

export const TimelineFilterSelectContainer = styled.div`
  position: relative;
  z-index: 20;
`;

export const TimelineFilterSelectTrigger = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 40px;
  width: 100%;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 1px solid ${({ theme }) => theme.colors.input};
  background-color: ${({ theme }) => theme.colors.background};
  padding: 0 ${({ theme }) => theme.spacing[3]};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.foreground};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.all};

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.ring};
    outline-offset: 2px;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.accentForeground};
  }
`;

export const TimelineFilterSelectValue = styled.span`
  color: ${({ theme }) => theme.colors.foreground};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;

export const TimelineFilterInput = styled.input`
  display: flex;
  width: 100%;
  border-radius: calc(0.75rem - 2px);
  border: 1px solid hsl(var(--border));
  background-color: hsl(var(--background));
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  color: hsl(var(--foreground));
  transition:
    color 0.15s cubic-bezier(0.4, 0, 0.2, 1),
    background-color 0.15s cubic-bezier(0.4, 0, 0.2, 1),
    border-color 0.15s cubic-bezier(0.4, 0, 0.2, 1);
  font-family:
    ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo,
    monospace;

  &::placeholder {
    color: hsl(var(--muted-foreground));
  }

  &:focus {
    outline: none;
    border-color: hsl(215, 25%, 27%);
    box-shadow: 0 0 0 2px hsl(215, 25%, 27%);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

export const TimelineFilterButton = styled.button<{
  variant?: "default" | "outline";
  size?: "default" | "sm";
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 0.75rem;
  font-size: 0.875rem;
  font-weight: 500;
  transition:
    color 0.15s cubic-bezier(0.4, 0, 0.2, 1),
    background-color 0.15s cubic-bezier(0.4, 0, 0.2, 1),
    border-color 0.15s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  border: none;
  text-decoration: none;
  flex: 1;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  ${(props) => {
    switch (props.variant) {
      case "outline":
        return `
          border: 1px solid ${props.theme.colors?.border};
          background-color: ${props.theme.colors?.background};
          color: ${props.theme.colors?.foreground};

          &:hover:not(:disabled) {
            background-color: ${props.theme.colors?.accent};
            color: ${props.theme.colors?.accentForeground};
          }
        `;
      default:
        return `
          background-color: hsl(215, 25%, 27%);
          color: hsl(0, 0%, 98%);

          &:hover:not(:disabled) {
            opacity: 0.9;
          }

          &:focus-visible {
            outline: none;
            box-shadow: 0 0 0 2px hsl(215, 25%, 27%);
          }
        `;
    }
  }}

  ${(props) => {
    switch (props.size) {
      case "sm":
        return `
          height: 36px;
          border-radius: calc(0.75rem - 2px);
          padding: 0 ${props.theme.spacing[3]};
          font-size: ${props.theme.fontSizes.xs};
        `;
      default:
        return `
          height: 40px;
          padding: 0 ${props.theme.spacing[4]};
        `;
    }
  }}
`;

// Filter Modal Components
export const FilterModalBackdrop = styled.div`
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

export const FilterModalContainer = styled.div`
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

export const FilterModalHeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing[6]};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  flex-shrink: 0;
`;

export const FilterModalContentContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: ${({ theme }) => theme.spacing[6]};
`;

export const FilterModalListItem = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

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
  padding: ${({ theme }) => theme.spacing[4]} 0;
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.all};
  color: ${(props) =>
    props.isActive
      ? props.theme.colors.primary
      : props.theme.colors.foreground};

  &:hover {
    background-color: ${({ theme }) => theme.colors.muted};
    margin: 0 -${({ theme }) => theme.spacing[6]};
    padding-left: ${({ theme }) => theme.spacing[6]};
    padding-right: ${({ theme }) => theme.spacing[6]};
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
    props.isExpanded ? props.theme.colors.primary : props.theme.colors.muted};
  color: ${(props) =>
    props.isExpanded ? "white" : props.theme.colors.mutedForeground};
  transition: ${({ theme }) => theme.transitions.all};
`;

export const FilterModalOptionsContainer = styled.div`
  padding: 0 0 ${({ theme }) => theme.spacing[4]} 0;
  margin-top: -${({ theme }) => theme.spacing[2]};
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
      props.selected ? props.theme.colors.primary : props.theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  background-color: ${(props) =>
    props.selected ? props.theme.colors.primary : "transparent"};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: ${({ theme }) => theme.transitions.all};
`;

export const FilterModalFooterContainer = styled.div`
  padding: ${({ theme }) => theme.spacing[6]};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  flex-shrink: 0;
`;

export const FilterModalButton = styled.button<{
  variant?: "default" | "outline";
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 0.75rem;
  font-size: 0.875rem;
  font-weight: 500;
  transition:
    color 0.15s cubic-bezier(0.4, 0, 0.2, 1),
    background-color 0.15s cubic-bezier(0.4, 0, 0.2, 1),
    border-color 0.15s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  border: none;
  text-decoration: none;
  width: 100%;
  margin-bottom: ${({ theme }) => theme.spacing[2]};

  &:last-child {
    margin-bottom: 0;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  ${(props) => {
    switch (props.variant) {
      case "outline":
        return `
          border: 1px solid ${props.theme.colors?.border};
          background-color: ${props.theme.colors?.background};
          color: ${props.theme.colors?.foreground};

          &:hover:not(:disabled) {
            background-color: ${props.theme.colors?.accent};
            color: ${props.theme.colors?.accentForeground};
          }
        `;
      default:
        return `
          background-color: hsl(215, 25%, 27%);
          color: hsl(0, 0%, 98%);

          &:hover:not(:disabled) {
            opacity: 0.9;
          }

          &:focus-visible {
            outline: none;
            box-shadow: 0 0 0 2px hsl(215, 25%, 27%);
          }
        `;
    }
  }}
`;
