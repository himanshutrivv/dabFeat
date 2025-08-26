import { css } from "@emotion/react";

export const AllFiltersButtonStyle = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  width: "100%",
  justifyContent: "center",
  background: "hsl(215, 25%, 27%)",
  color: "white",
  border: "none",
  borderRadius: "8px",
  padding: "10px 16px",
  fontWeight: "500",
  fontSize: "14px",
  boxShadow: "0 4px 12px rgba(139, 92, 246, 0.25)",
  transition: "all 0.2s ease",
  cursor: "pointer"
};

export const AllFiltersButtonHoverStyle = {
  transform: "translateY(-1px)",
  boxShadow: "0 6px 16px rgba(139, 92, 246, 0.35)"
};

export const AllFiltersButtonLeaveStyle = {
  ...AllFiltersButtonStyle
};

export const ClearAllFilterButtonStyle = {
  display: "flex",
  alignItems: "center",
  gap: "6px",
  padding: "8px 12px",
  backgroundColor: "transparent",
  color: "hsl(var(--destructive))",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "14px",
  fontWeight: "500",
  transition: "all 0.2s"
};

export const ClearAllFilterButtonHoverStyle = {
  backgroundColor: "hsl(var(--destructive) / 0.1)"
};

export const ClearAllFilterButtonLeaveStyle = {
  ...ClearAllFilterButtonStyle
};

export const RetryButtonStyle = css`
  display: flex;
  align-items: center;
  gap: 8px;
`;
