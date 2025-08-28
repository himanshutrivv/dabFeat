"use client";

import React, { createContext, useContext, useState, useMemo } from "react";
import { ThemeProvider } from "@emotion/react";
import { appTheme, AppTheme } from "./themes";

type ThemeControllerContextType = {
  setBackground: (bg: string) => void;
  setFont: (font: string) => void;
  theme: AppTheme;
};

const ThemeControllerContext = createContext<ThemeControllerContextType | null>(
  null,
);

export const useThemeController = () => {
  const ctx = useContext(ThemeControllerContext);
  if (!ctx)
    throw new Error(
      "useThemeController must be inside ThemeControllerProvider",
    );
  return ctx;
};

export const ThemeControllerProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [background, setBackground] = useState(appTheme.colors.background);
  const [fontFamily, setFontFamily] = useState(appTheme.fonts.sans);

  const theme: AppTheme = useMemo(() => {
    return {
      ...appTheme,
      colors: {
        ...appTheme.colors,
        background,
      },
      fonts: {
        ...appTheme.fonts,
        sans: fontFamily,
      },
    };
  }, [background, fontFamily]);

  return (
    <ThemeControllerContext.Provider
      value={{ setBackground, setFont: setFontFamily, theme }}
    >
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeControllerContext.Provider>
  );
};
