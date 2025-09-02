export type ColorPalette = {
  primary: string;
  primaryBackground: string;

  secondary: string;
  secondaryBackground: string;

  muted: string;
  mutedBackground: string;

  destructive?: string;
  destructiveBackground: string;
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
    xs: string;
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
      primary: "hsl(215, 25%, 27%)",
      primaryBackground: "hsl(0, 0%, 100%)",

      secondary: "hsl(210, 17%, 40%)",
      secondaryBackground: "hsl(210, 17%, 95%)",

      muted: "hsl(210, 10%, 55%)",
      mutedBackground: "hsl(210, 17%, 95%)",

      destructive: "hsl(0, 72%, 50%)",
      destructiveBackground: "hsl(0, 100%, 98%)",
    },
    dark: {
      primary: "hsl(217, 91%, 62%)",
      primaryBackground: "hsl(222, 27%, 12%)",

      secondary: "hsl(218, 15%, 65%)",
      secondaryBackground: "hsl(220, 20%, 18%)",

      muted: "hsl(220, 10%, 55%)",
      mutedBackground: "hsl(220, 15%, 15%)",

      destructive: "hsl(0, 72%, 55%)",
      destructiveBackground: "hsl(0, 62%, 20%)",
    },
    ocean: {
      primary: "hsl(200, 75%, 50%)",
      primaryBackground: "hsl(200, 100%, 97%)",

      secondary: "hsl(200, 55%, 40%)",
      secondaryBackground: "hsl(200, 55%, 90%)",

      muted: "hsl(200, 20%, 45%)",
      mutedBackground: "hsl(200, 40%, 95%)",

      destructive: "hsl(0, 72%, 52%)",
      destructiveBackground: "hsl(0, 100%, 95%)",
    },
    forest: {
      primary: "hsl(125, 40%, 35%)",
      primaryBackground: "hsl(125, 35%, 97%)",

      secondary: "hsl(125, 30%, 30%)",
      secondaryBackground: "hsl(125, 35%, 88%)",

      muted: "hsl(125, 15%, 35%)",
      mutedBackground: "hsl(125, 20%, 82%)",

      destructive: "hsl(0, 70%, 52%)",
      destructiveBackground: "hsl(0, 85%, 92%)",
    },
    sunset: {
      primary: "hsl(20, 90%, 55%)",
      primaryBackground: "hsl(20, 95%, 98%)",

      secondary: "hsl(20, 65%, 40%)",
      secondaryBackground: "hsl(20, 75%, 90%)",

      muted: "hsl(20, 25%, 45%)",
      mutedBackground: "hsla(20, 34.40%, 88.00%, 0.88)",

      destructive: "hsl(0, 75%, 55%)",
      destructiveBackground: "hsl(0, 95%, 95%)",
    },
    purple: {
      primary: "hsl(270, 75%, 55%)",
      primaryBackground: "hsl(270, 90%, 99%)",

      secondary: "hsl(270, 50%, 40%)",
      secondaryBackground: "hsl(270, 60%, 92%)",

      muted: "hsl(270, 25%, 50%)",
      mutedBackground: "hsl(270, 30%, 90%)",

      destructive: "hsl(0, 70%, 52%)",
      destructiveBackground: "hsl(0, 85%, 95%)",
    },
    minimal: {
      primary: "hsl(0, 0%, 0%)",
      primaryBackground: "hsl(0, 0%, 100%)",

      secondary: "hsl(0, 0%, 25%)",
      secondaryBackground: "hsl(0, 0%, 95%)",

      muted: "hsl(0, 0%, 40%)",
      mutedBackground: "hsl(0, 0%, 92%)",

      destructive: "hsl(0, 75%, 55%)",
      destructiveBackground: "hsl(0, 0%, 98%)",
    },
    slate: {
      primary: "hsl(210, 35%, 32%)",
      primaryBackground: "hsl(210, 25%, 98%)",

      secondary: "hsl(210, 25%, 28%)",
      secondaryBackground: "hsl(210, 25%, 88%)",

      muted: "hsl(210, 15%, 45%)",
      mutedBackground: "hsl(210, 20%, 85%)",

      destructive: "hsl(0, 72%, 55%)",
      destructiveBackground: "hsl(0, 90%, 96%)",
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
  export interface Theme extends AppTheme { }
}
