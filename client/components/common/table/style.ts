import { appTheme as theme } from "../../../styles/themes";
import styled from "@emotion/styled";

// Styled Components
export const TableContainer = styled.div`
  background: ${theme.colors.card};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.md};
  overflow: hidden;
  border: 1px solid ${theme.colors.border};
`;

export const ScrollableContainer = styled.div<{ minHeight: string }>`
  overflow-x: auto;
  overflow-y: auto;
  max-height: ${(props) => props.minHeight};

  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  &::-webkit-scrollbar-track {
    background: ${theme.colors.muted};
  }

  &::-webkit-scrollbar-thumb {
    background: ${theme.colors.mutedForeground};
    border-radius: ${theme.borderRadius.full};
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${theme.colors.foreground};
  }

  &::-webkit-scrollbar-corner {
    background: ${theme.colors.muted};
  }
`;

export const StyledTable = styled.table`
  width: 100%;
  min-width: max-content;
  border-collapse: collapse;
  font-family: ${theme.fonts.sans};
`;

export const TableHeader = styled.thead`
  position: sticky;
  top: 0;
  z-index: 10;
  background: ${theme.colors.primary};
  color: ${theme.colors.primaryForeground};
  font-weight: ${theme.fontWeights.semibold};
  font-size: ${theme.fontSizes.sm};
  border-bottom: 1px solid ${theme.colors.border};
`;

export const TableBody = styled.tbody`
  font-size: ${theme.fontSizes.sm};
`;

export const TableHeaderCell = styled.th<{ width?: string; minWidth?: string }>`
  padding: ${theme.spacing[4]} ${theme.spacing[6]};
  font-weight: ${theme.fontWeights.semibold};
  font-size: ${theme.fontSizes.sm};
  text-align: left;
  color: ${theme.colors.primaryForeground};
  white-space: nowrap;
  ${(props) => props.width && `width: ${props.width};`}
  ${(props) => props.minWidth && `min-width: ${props.minWidth};`}
`;

export const TableRow = styled.tr<{ isEven: boolean }>`
  background-color: ${(props) =>
    props.isEven ? theme.colors.card : theme.colors.secondary};
  color: ${(props) =>
    props.isEven
      ? theme.colors.cardForeground
      : theme.colors.secondaryForeground};
  transition: ${theme.transitions.all};
  transform: translateY(0px);

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.md};
    z-index: 1;
    position: relative;
  }
`;

export const TableCell = styled.td<{ isClickable?: boolean }>`
  padding: ${theme.spacing[4]} ${theme.spacing[5]};
  border-bottom: 1px solid ${theme.colors.border};
  font-size: ${theme.fontSizes.sm};
  line-height: ${theme.lineHeights.normal};
  white-space: nowrap;
  cursor: ${(props) => (props.isClickable ? "pointer" : "default")};
  user-select: ${(props) => (props.isClickable ? "none" : "text")};
`;

export const CopyToast = styled.div<{ show: boolean }>`
  position: fixed;
  top: 20px;
  right: 20px;
  background: ${theme.colors.primary};
  color: ${theme.colors.primaryForeground};
  padding: ${theme.spacing[2]} ${theme.spacing[4]};
  border-radius: ${theme.borderRadius.md};
  box-shadow: ${theme.shadows.lg};
  font-size: ${theme.fontSizes.sm};
  font-weight: ${theme.fontWeights.medium};
  z-index: 1000;
  transform: translateY(${(props) => (props.show ? "0" : "-100px")});
  opacity: ${(props) => (props.show ? "1" : "0")};
  transition: all 0.3s ease;
`;

export const PaginationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing[2]};
  padding: ${theme.spacing[4]};
  background: ${theme.colors.background};
  border-top: 1px solid ${theme.colors.border};
`;

export const PaginationButton = styled.button<{ isActive?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 40px;
  height: 40px;
  padding: ${theme.spacing[2]} ${theme.spacing[3]};
  background: ${(props) =>
    props.isActive ? theme.colors.primary : theme.colors.background};
  color: ${(props) =>
    props.isActive ? theme.colors.primaryForeground : theme.colors.foreground};
  border: 1px solid
    ${(props) => (props.isActive ? theme.colors.primary : theme.colors.border)};
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.fontSizes.sm};
  font-weight: ${theme.fontWeights.medium};
  cursor: pointer;
  transition: ${theme.transitions.colors};

  &:hover:not(:disabled) {
    background: ${theme.colors.primary};
    color: ${theme.colors.primaryForeground};
    border-color: ${theme.colors.primary};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const PageInfo = styled.span`
  padding: 0 ${theme.spacing[4]};
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.mutedForeground};
  font-weight: ${theme.fontWeights.medium};
`;

export const EllipsisSpan = styled.span`
  padding: 0 ${theme.spacing[2]};
  color: ${theme.colors.mutedForeground};
`;
