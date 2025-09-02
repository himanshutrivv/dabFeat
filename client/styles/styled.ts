import styled from "@emotion/styled";
import {
  appTheme as theme,
  AppTheme as Theme,
} from "../styles/themes/appTheme";
import { css } from "@emotion/react";

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

export const cardStyles = (theme: Theme) => css`
  background-color: ${theme.colors.default.primaryBackground};
  color: ${theme.colors.default.primary};
  border: 1px solid ${theme.colors.default.mutedBackground};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.sm};
`;

export const inputStyles = (theme: Theme) => css`
  display: flex;
  width: 100%;
  border-radius: ${theme.borderRadius.md};
  border: 1px solid ${theme.colors.default.muted};
  background-color: ${theme.colors.default.primaryBackground};
  padding: ${theme.spacing[2]} ${theme.spacing[3]};
  font-size: ${theme.fontSizes.sm};
  font-family: ${theme.fonts};
  color: ${theme.colors.default.primary};
  transition: ${theme.transitions.colors};

  &::placeholder {
    color: ${theme.colors.default.muted};
  }

  &:focus {
    outline: none;
    border-color: ${theme.colors.default.primary};
    box-shadow: 0 0 0 2px ${theme.colors.default.primary};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";

interface ButtonProps {
  $loading?: boolean;
  fullWidth?: boolean;
  variant?: ButtonVariant;
}

const baseButtonStyles = (theme: Theme) => css`
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
  position: relative;

  &:hover {
    background-color: ${theme.colors.default.muted};
    color: ${theme.colors.default.primaryBackground};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const variantStyles = (variant: ButtonVariant = "primary", theme: Theme) => {
  switch (variant) {
    case "primary":
      return css`
        background-color: ${theme.colors.default.primary};
        color: ${theme.colors.default.primaryBackground};

        &:hover:not(:disabled) {
          opacity: 0.9;
        }

        &:focus-visible {
          outline: none;
          box-shadow: 0 0 0 2px ${theme.colors.default.primary};
        }
      `;

    case "secondary":
      return css`
        border: 1px solid ${theme.colors.default.muted};
        background-color: ${theme.colors.default.primaryBackground};
        color: ${theme.colors.default.primary};

        &:hover:not(:disabled) {
          background-color: ${theme.colors.default.primary};
          color: ${theme.colors.default.primaryBackground};
        }

        &:focus-visible {
          outline: none;
          box-shadow: 0 0 0 2px ${theme.colors.default.primary};
        }
      `;

    case "outline":
      return css`
        border: 1px solid ${theme.colors.default.muted};
        background-color: ${theme.colors.default.primaryBackground};
        color: ${theme.colors.default.primary};

        &:hover:not(:disabled) {
          background-color: ${theme.colors.default.mutedBackground};
          color: ${theme.colors.default.muted};
        }
      `;

    case "ghost":
      return css`
        border-radius: 50%;
        padding: ${theme.spacing[2]};
        background-color: transparent;
        color: ${theme.colors.default.primary};

        &:hover:not(:disabled) {
          background-color: ${theme.colors.default.mutedBackground};
          color: ${theme.colors.default.primary};
        }
      `;

    default:
      return css``;
  }
};

export const Button = styled.button<ButtonProps>`
  ${({ theme }) => baseButtonStyles(theme)};
  ${({ theme, variant }) => variantStyles(variant, theme)};

  ${({ fullWidth }) =>
    fullWidth &&
    css`
      width: 100%;
    `};

  ${({ $loading }) =>
    $loading &&
    css`
      color: transparent;
    `};
`;

export const ErrorMessage = styled.p`
  font-size: ${theme.fontSizes?.sm};
  color: ${theme.colors.default.destructive};
  margin: 0;
`;
