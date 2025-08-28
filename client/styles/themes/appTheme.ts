export type ColorPalette = {
  background: string;
  foreground: string;
  card: string;
  cardForeground: string;
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  accent: string;
  accentForeground: string;
  border: string;
  popover?: string;
  popoverForeground?: string;
  muted?: string;
  mutedForeground?: string;
  destructive?: string;
  destructiveForeground?: string;
  input?: string;
  ring?: string;
};

export type AppTheme = {
  colors: Record<string, ColorPalette>;
  spacing: Record<number | string, string>;
  shadows: Record<string, string>;
  fontWeights: Record<string, string>;
  breakpoints: Record<string, string>;
  fonts: string;
  transitions: {
    colors: string;
    [key: string]: string;
  };
  fontSizes: {
    base: string;
    sm: string;
    lg: string;
    xl: string;
    [key: string]: string;
  };
  lineHeights: {
    normal: string;
    short?: string;
    tall?: string;
    [key: string]: string | undefined;
  };
  borderRadius: {
    sm: string;
    md: string;
    lg: string;
    xl?: string;
    [key: string]: string | undefined;
  };
};

export const appTheme: AppTheme = {
  colors: {
    default: {
      background: "hsl(0, 0%, 98%)",
      foreground: "hsl(215, 25%, 27%)",
      card: "hsl(0, 0%, 100%)",
      cardForeground: "hsl(215, 25%, 27%)",
      popover: "hsl(0, 0%, 100%)",
      popoverForeground: "hsl(215, 25%, 27%)",
      primary: "hsl(215, 25%, 27%)",
      primaryForeground: "hsl(0, 0%, 98%)",
      secondary: "hsl(210, 17%, 95%)",
      secondaryForeground: "hsl(215, 25%, 27%)",
      muted: "hsl(210, 17%, 95%)",
      mutedForeground: "hsl(215, 13%, 55%)",
      accent: "hsl(210, 17%, 95%)",
      accentForeground: "hsl(215, 25%, 27%)",
      destructive: "hsl(0, 84%, 60%)",
      destructiveForeground: "hsl(0, 0%, 98%)",
      border: "hsl(214, 20%, 88%)",
      input: "hsl(214, 20%, 88%)",
      ring: "hsl(215, 25%, 27%)",
    },
    dark: {
      background: "hsl(222, 47%, 11%)",
      foreground: "hsl(213, 31%, 91%)",
      card: "hsl(222, 84%, 5%)",
      cardForeground: "hsl(213, 31%, 91%)",
      primary: "hsl(217, 91%, 60%)",
      primaryForeground: "hsl(222, 47%, 11%)",
      secondary: "hsl(217, 32%, 17%)",
      secondaryForeground: "hsl(213, 31%, 91%)",
      muted: "hsl(217, 32%, 17%)",
      mutedForeground: "hsl(215, 20%, 65%)",
      accent: "hsl(217, 32%, 17%)",
      accentForeground: "hsl(213, 31%, 91%)",
      border: "hsl(217, 32%, 17%)",
    },
    ocean: {
      background: "hsl(200, 100%, 95%)",
      foreground: "hsl(210, 40%, 20%)",
      card: "hsl(200, 100%, 98%)",
      cardForeground: "hsl(210, 40%, 20%)",
      primary: "hsl(200, 80%, 50%)",
      primaryForeground: "hsl(0, 0%, 100%)",
      secondary: "hsl(200, 60%, 90%)",
      secondaryForeground: "hsl(210, 40%, 20%)",
      accent: "hsl(200, 80%, 60%)",
      accentForeground: "hsl(0, 0%, 100%)",
      border: "hsl(200, 60%, 85%)",
    },
    forest: {
      background: "hsl(120, 30%, 95%)",
      foreground: "hsl(120, 30%, 20%)",
      card: "hsl(120, 30%, 98%)",
      cardForeground: "hsl(120, 30%, 20%)",
      primary: "hsl(120, 40%, 35%)",
      primaryForeground: "hsl(0, 0%, 100%)",
      secondary: "hsl(120, 30%, 85%)",
      secondaryForeground: "hsl(120, 30%, 20%)",
      accent: "hsl(120, 50%, 45%)",
      accentForeground: "hsl(0, 0%, 100%)",
      border: "hsl(120, 20%, 80%)",
      muted: "hsl(120, 20%, 80%)",
    },
    sunset: {
      background: "hsl(20, 80%, 95%)",
      foreground: "hsl(20, 60%, 20%)",
      card: "hsl(20, 80%, 98%)",
      cardForeground: "hsl(20, 60%, 20%)",
      primary: "hsl(20, 90%, 50%)",
      primaryForeground: "hsl(0, 0%, 100%)",
      secondary: "hsl(20, 80%, 85%)",
      secondaryForeground: "hsl(20, 60%, 20%)",
      accent: "hsl(25, 80%, 55%)",
      accentForeground: "hsl(0, 0%, 100%)",
      border: "hsl(20, 70%, 80%)",
    },
    purple: {
      background: "hsl(270, 50%, 98%)",
      foreground: "hsl(270, 50%, 20%)",
      card: "hsl(270, 50%, 100%)",
      cardForeground: "hsl(270, 50%, 20%)",
      primary: "hsl(270, 70%, 50%)",
      primaryForeground: "hsl(0, 0%, 100%)",
      secondary: "hsl(270, 40%, 90%)",
      secondaryForeground: "hsl(270, 50%, 20%)",
      accent: "hsl(270, 60%, 60%)",
      accentForeground: "hsl(0, 0%, 100%)",
      border: "hsl(270, 30%, 85%)",
    },
    minimal: {
      background: "hsl(0, 0%, 100%)",
      foreground: "hsl(0, 0%, 10%)",
      card: "hsl(0, 0%, 100%)",
      cardForeground: "hsl(0, 0%, 10%)",
      primary: "hsl(0, 0%, 0%)",
      primaryForeground: "hsl(0, 0%, 100%)",
      secondary: "hsl(0, 0%, 96%)",
      secondaryForeground: "hsl(0, 0%, 10%)",
      accent: "hsl(0, 0%, 80%)",
      accentForeground: "hsl(0, 0%, 0%)",
      border: "hsl(0, 0%, 90%)",
    },
    slate: {
      background: "hsl(210, 20%, 95%)",
      foreground: "hsl(210, 20%, 20%)",
      card: "hsl(210, 20%, 98%)",
      cardForeground: "hsl(210, 20%, 20%)",
      primary: "hsl(210, 40%, 30%)",
      primaryForeground: "hsl(0, 0%, 100%)",
      secondary: "hsl(210, 20%, 85%)",
      secondaryForeground: "hsl(210, 20%, 20%)",
      accent: "hsl(210, 30%, 40%)",
      accentForeground: "hsl(0, 0%, 100%)",
      border: "hsl(210, 20%, 80%)",
    },
  },
  fonts: "Arial, Helvetica, sans-serif",
  spacing: {
    0: "0px",
    1: "0.25rem",
    2: "0.5rem",
    3: "0.75rem",
    4: "1rem",
    5: "1.25rem",
    6: "1.5rem",
    8: "2rem",
    10: "2.5rem",
    12: "3rem",
    16: "4rem",
    20: "5rem",
    24: "6rem",
    32: "8rem",
    40: "10rem",
    48: "12rem",
    56: "14rem",
    64: "16rem",
    72: "18rem",
    80: "20rem",
    96: "24rem",
  },
  borderRadius: {
    none: "0",
    sm: "calc(0.75rem - 4px)",
    md: "calc(0.75rem - 2px)",
    lg: "0.75rem",
    xl: "0.75rem",
    "2xl": "1rem",
    "3xl": "1.5rem",
    full: "9999px",
  },
  shadows: {
    sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
    xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
  },
  fontSizes: {
    xs: "0.75rem",
    sm: "0.875rem",
    base: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.875rem",
    "4xl": "2.25rem",
    "5xl": "3rem",
    "6xl": "3.75rem",
  },
  fontWeights: {
    normal: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
  },
  lineHeights: {
    none: "1",
    tight: "1.25",
    snug: "1.375",
    normal: "1.5",
    relaxed: "1.625",
    loose: "2",
  },
  breakpoints: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px",
  },
  transitions: {
    all: "all 0.15s cubic-bezier(0.4, 0, 0.2, 1)",
    colors:
      "color 0.15s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.15s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.15s cubic-bezier(0.4, 0, 0.2, 1)",
    transform: "transform 0.15s cubic-bezier(0.4, 0, 0.2, 1)",
  },
};

declare module "@emotion/react" {
  export interface Theme extends AppTheme {}
}
