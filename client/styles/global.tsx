import { css } from "@emotion/react";
import { AppTheme } from "./themes/appTheme";

export const globalStyles = (theme: AppTheme) => css`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: ${(theme as any).fonts};
  }

  html {
    font-family: ${(theme as any).fonts};
    line-height: ${(theme as any).lineHeights.normal};
    -webkit-text-size-adjust: 100%;
  }

  body {
    background-color: ${(theme as any).colors.background};
    color: ${(theme as any).colors.foreground};
    font-size: ${(theme as any).fontSizes.base};
    line-height: ${(theme as any).lineHeights.normal};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    transition: ${(theme as any).transitions.colors};
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
      ${(theme as any).colors.ring || (theme as any).colors.primary};
    outline-offset: 2px;
  }

  /* Scrollbar styles */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${(theme as any).colors.muted ||
  (theme as any).colors.secondary ||
  (theme as any).colors.card};
  }

  ::-webkit-scrollbar-thumb {
    background: ${(theme as any).colors.border};
    border-radius: ${(theme as any).borderRadius.md};
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${(theme as any).colors.mutedForeground ||
  (theme as any).colors.foreground};
  }
`;