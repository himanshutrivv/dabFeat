/** @jsxImportSource @emotion/react */

import { useState, createContext, useContext, ReactNode } from "react";
import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import { themeVariants, ThemeVariant, AppTheme } from "../styles/themes";

interface ThemeContextType {
  currentTheme: ThemeVariant;
  theme: AppTheme;
  setTheme: (variant: ThemeVariant) => void;
  setBackground: (variant: ThemeVariant) => void;
  setFont: (variant: ThemeVariant) => void;
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
  const [currentTheme, setCurrentTheme] = useState<ThemeVariant>("default");

  const theme = themeVariants[currentTheme] as AppTheme;

  const setTheme = (variant: ThemeVariant) => setCurrentTheme(variant);
  const setBackground = setTheme;
  const setFont = setTheme;

  return (
    <ThemeContext.Provider
      value={{
        currentTheme,
        theme,
        setTheme,
        setBackground,
        setFont,
      }}
    >
      <EmotionThemeProvider theme={theme}>{children}</EmotionThemeProvider>
    </ThemeContext.Provider>
  );
};
