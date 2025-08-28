import { appTheme as theme, AppTheme as Theme } from "./themes";
import styled from '@emotion/styled'

export const media = {
  sm: `@media (min-width: 640px)`,
  md: `@media (min-width: 768px)`,
  lg: `@media (min-width: 1024px)`,
  xl: `@media (min-width: 1280px)`,
  "2xl": `@media (min-width: 1536px)`,
};

export const flexCenter = `
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const flexBetween = `
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const flexColumn = `
  display: flex;
  flex-direction: column;
`;

export const cardStyles = (theme: Theme) => `
  background-color: ${theme.colors.default.card};
  color: ${theme.colors.default.cardForeground};
  border: 1px solid ${theme.colors.default.border};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.sm};
`;

export const buttonBaseStyles = `
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing[2]};
  padding: ${theme.spacing[2]} ${theme.spacing[4]};
  border-radius: ${theme.borderRadius.lg};
  font-size: ${theme.fontSizes.sm};
  font-weight: ${theme.fontWeights.medium};
  transition: ${theme.transitions.colors};
  cursor: pointer;
  border: none;
  text-decoration: none;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const buttonVariant = (bg: string, fg: string) => (theme: Theme) =>
  `
  ${buttonBaseStyles}
  background-color: ${bg};
  color: ${fg};

  &:hover:not(:disabled) {
    opacity: 0.9;
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px ${theme.colors.default.ring};
  }
`;

export const primaryButtonStyles = buttonVariant(
  theme.colors.default.primary,
  theme.colors.default.primaryForeground
);

export const secondaryButtonStyles = buttonVariant(
  theme.colors.default.secondary,
  theme.colors.default.secondaryForeground
);

export const outlineButtonStyles = (theme: Theme) => `
  ${buttonBaseStyles}
  border: 1px solid ${theme.colors.default.border};
  background-color: ${theme.colors.default.background};
  color: ${theme.colors.default.foreground};

  &:hover:not(:disabled) {
    background-color: ${theme.colors.default.accent};
    color: ${theme.colors.default.accentForeground};
  }
`;

export const ghostButtonStyles = `
  ${buttonBaseStyles}
  background-color: transparent;
  color: ${theme.colors.default.foreground};

  &:hover:not(:disabled) {
    background-color: ${theme.colors.default.accent};
    color: ${theme.colors.default.accentForeground};
  }
`;

export const inputStyles = `
  display: flex;
  width: 100%;
  border-radius: ${theme.borderRadius.md};
  border: 1px solid ${theme.colors.default.border};
  background-color: ${theme.colors.default.background};
  padding: ${theme.spacing[2]} ${theme.spacing[3]};
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.default.foreground};
  transition: ${theme.transitions.colors};

  &::placeholder {
    color: ${theme.colors.default.mutedForeground};
  }

  &:focus {
    outline: none;
    border-color: ${theme.colors.default.ring};
    box-shadow: 0 0 0 2px ${theme.colors.default.ring};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

export const ErrorMessage = styled.p`
  font-size: ${theme.fontSizes?.sm};
  color: ${theme.colors.default.destructive};
  margin: 0;
`;