import { css } from "@emotion/react";
import { appTheme, AppTheme } from "./themes";

export const globalStyles = (theme: AppTheme) => css`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: ${theme.fonts.default};
  }

  html {
    font-family: ${theme.fonts.default};
    line-height: ${theme.lineHeights.normal};
    -webkit-text-size-adjust: 100%;
  }

  body {
    background-color: ${theme.colors.default.background};
    color: ${theme.colors.default.foreground};
    font-size: ${theme.fontSizes.base};
    line-height: ${theme.lineHeights.normal};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    transition: ${theme.transitions.colors};
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
    outline: 2px solid
      ${(theme.colors.default as any).ring || theme.colors.default.primary};
    outline-offset: 2px;
  }

  /* Scrollbar styles */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${(theme.colors.default as any).muted ||
  (theme.colors.default as any).secondary ||
  theme.colors.default.card};
  }

  ::-webkit-scrollbar-thumb {
    background: ${theme.colors.default.border};
    border-radius: ${theme.borderRadius.md};
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${(theme.colors.default as any).mutedForeground ||
  theme.colors.default.foreground};
  }
`;