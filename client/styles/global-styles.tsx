import { css } from "@emotion/react";
import { AppTheme } from "./themes";

export const globalStyles = (theme: AppTheme) => css`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: ${theme.fonts.sans};
  }

  html {
    font-family: ${theme.fonts.sans};
    line-height: ${theme.lineHeights.normal};
    -webkit-text-size-adjust: 100%;
  }

  body {
    overflow: hidden !important;
    background-color: ${theme.colors.background};
    color: ${theme.colors.foreground};
    font-size: ${theme.fontSizes.base};
    line-height: ${theme.lineHeights.normal};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  input, textarea, select, div, span {
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
    outline: 2px solid ${theme.colors.ring};
    outline-offset: 2px;
  }

  /* Scrollbar styles */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${theme.colors.muted};
  }

  ::-webkit-scrollbar-thumb {
    background: ${theme.colors.border};
    border-radius: ${theme.borderRadius.md};
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${theme.colors.mutedForeground};
  }
`;
