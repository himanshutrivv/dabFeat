import { css } from "@emotion/react";
import { appTheme as theme, AppTheme as Theme } from "./themes";

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

export const cardStyles = css`
  background-color: ${theme.colors?.card};
  color: ${theme.colors?.cardForeground};
  border: 1px solid ${theme.colors?.border};
  border-radius: ${theme.borderRadius?.lg};
  box-shadow: ${theme.shadows?.sm};
`;

export const buttonBaseStyles = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing?.[2]};
  padding: ${theme.spacing?.[2]} ${theme.spacing?.[4]};
  border-radius: ${theme.borderRadius?.lg};
  font-size: ${theme.fontSizes?.sm};
  font-weight: ${theme.fontWeights?.medium};
  transition: ${theme.transitions?.colors};
  cursor: pointer;
  border: none;
  text-decoration: none;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const buttonVariant = (bg: string, fg: string) => css`
  ${buttonBaseStyles}
  background-color: ${bg};
  color: ${fg};

  &:hover:not(:disabled) {
    opacity: 0.9;
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px ${theme.colors?.ring};
  }
`;

export const primaryButtonStyles = () => buttonVariant(
  theme.colors?.primary!,
  theme.colors?.primaryForeground!
);

export const secondaryButtonStyles = () => buttonVariant(
  theme.colors?.secondary!,
  theme.colors?.secondaryForeground!
);

export const outlineButtonStyles = (themeParam?: Theme) => css`
  ${buttonBaseStyles}
  border: 1px solid ${(themeParam || theme).colors?.border};
  background-color: ${(themeParam || theme).colors?.background};
  color: ${(themeParam || theme).colors?.foreground};

  &:hover:not(:disabled) {
    background-color: ${(themeParam || theme).colors?.accent};
    color: ${(themeParam || theme).colors?.accentForeground};
  }
`;

export const ghostButtonStyles = () => css`
  ${buttonBaseStyles}
  background-color: transparent;
  color: ${theme.colors?.foreground};

  &:hover:not(:disabled) {
    background-color: ${theme.colors?.accent};
    color: ${theme.colors?.accentForeground};
  }
`;

export const destructiveButtonStyles = () => buttonVariant(
  theme.colors?.destructive!,
  theme.colors?.destructiveForeground!
);

export const inputStyles = css`
  display: flex;
  width: 100%;
  border-radius: ${theme.borderRadius?.md};
  border: 1px solid ${theme.colors?.border};
  background-color: ${theme.colors?.background};
  padding: ${theme.spacing?.[2]} ${theme.spacing?.[3]};
  font-size: ${theme.fontSizes?.sm};
  color: ${theme.colors?.foreground};
  transition: ${theme.transitions?.colors};

  &::placeholder {
    color: ${theme.colors?.mutedForeground};
  }

  &:focus {
    outline: none;
    border-color: ${theme.colors?.ring};
    box-shadow: 0 0 0 2px ${theme.colors?.ring};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;
