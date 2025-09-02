/** @jsxImportSource @emotion/react */

import { useState, createContext, useContext, ReactNode } from "react";
import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import { AppTheme } from "../styles/themes/appTheme";
import { ThemeVariantKey, themeVariants } from "./themes/themeVariants";
import { FontVariant, fontVariants } from "./themes/fontVariants";

interface ThemeContextType {
  currentTheme: ThemeVariantKey;
  currentFont: FontVariant;
  theme: AppTheme;
  setTheme: (variant: ThemeVariantKey) => void;
  setFont: (variant: FontVariant) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useThemeController = (): ThemeContextType => {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useThemeController must be used within a ThemeProvider");
  }
  return ctx;
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [currentTheme, setCurrentTheme] = useState<ThemeVariantKey>("default");
  const [currentFont, setCurrentFont] = useState<FontVariant>("arial");

  const baseTheme = themeVariants[currentTheme].theme;
  const fontStack = fontVariants[currentFont].stack;

  const extendedDefault = {
    ...baseTheme.colors.default,
    background: baseTheme.colors.default.primaryBackground,
    foreground: baseTheme.colors.default.primary,
    border: baseTheme.colors.default.muted,
    accent: baseTheme.colors.default.mutedBackground,
    accentForeground: baseTheme.colors.default.primary,
    ring: baseTheme.colors.default.primary,
    card: baseTheme.colors.default.primaryBackground,
    cardForeground: baseTheme.colors.default.primary,
    mutedForeground: baseTheme.colors.default.muted,
  } as any;

  const theme: AppTheme = {
    ...baseTheme,
    colors: {
      ...baseTheme.colors,
      default: extendedDefault as any,
    },
    fonts: fontStack,
  };

  const setTheme = (variant: ThemeVariantKey) => setCurrentTheme(variant);
  const setFont = (variant: FontVariant) => setCurrentFont(variant);

  return (
    <ThemeContext.Provider
      value={{
        currentTheme,
        currentFont,
        theme,
        setTheme,
        setFont,
      }}
    >
      <EmotionThemeProvider theme={theme}>{children}</EmotionThemeProvider>
    </ThemeContext.Provider>
  );
};
