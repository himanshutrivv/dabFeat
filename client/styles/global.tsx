import { css } from "@emotion/react";
import { appTheme as theme } from "@/styles/themes/appTheme";

export const globalStyles = () => css`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: ${theme.fonts};
  }

  html {
    font-family: ${theme.fonts};
    line-height: ${theme.lineHeights.normal};
    -webkit-text-size-adjust: 100%;
  }

  body {
    background-color: ${theme.colors.default.primaryBackground};
    color: ${theme.colors.primaryBackground};
    font-family: ${theme.fonts};
    font-size: ${theme.fontSizes.base};
    line-height: ${theme.lineHeights.normal};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    transition: ${theme.transitions.colors};
    overflow: hidden !important;
  }

  input,
  textarea,
  select,
  div,
  span,
  button,
  option,
  text {
    font: inherit;
  }

  #root {
    min-height: 100vh;
  }

  button {
    font-family: inherit;
    font-size: inherit;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  ul,
  ol {
    list-style: none;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  /* Focus styles */
  :focus-visible {
    outline: 2px solid ${theme.colors.primary || theme.colors.primary};
    outline-offset: 2px;
  }

  /* Scrollbar styles */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${theme.colors.muted ||
  theme.colors.secondary ||
  theme.colors.card};
  }

  ::-webkit-scrollbar-thumb {
    background: ${theme.colors.primary};
    border-radius: ${theme.borderRadius.md};
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${theme.colors.mutedBackground ||
  theme.colors.primaryBackground};
  }
`;
