import { AppTheme, appTheme } from "./appTheme";

export type ThemeVariantKey =
  | "default"
  | "dark"
  | "ocean"
  | "forest"
  | "sunset"
  | "purple"
  | "minimal"
  | "slate";

export interface ThemeVariant {
  name: string;
  description: string;
  theme: AppTheme;
}

const variantMeta: Record<
  ThemeVariantKey,
  { name: string; description: string }
> = {
  default: {
    name: "Light & Clean",
    description: "Professional light theme for productivity",
  },
  dark: {
    name: "Dark Pro",
    description: "Modern dark theme with blue accents",
  },
  ocean: { name: "Ocean Blue", description: "Calming blue theme for focus" },
  forest: {
    name: "Forest Green",
    description: "Earthy theme with natural greens",
  },
  sunset: {
    name: "Sunset Glow",
    description: "Warm and vibrant sunset palette",
  },
  purple: {
    name: "Royal Purple",
    description: "Elegant purple theme with luxury feel",
  },
  minimal: {
    name: "Minimalist",
    description: "Clean black & white minimal theme",
  },
  slate: { name: "Slate Gray", description: "Neutral modern slate theme" },
};

export const themeVariants: Record<ThemeVariantKey, ThemeVariant> = Object.keys(
  variantMeta,
).reduce(
  (acc, key) => {
    const typedKey = key as ThemeVariantKey;

    acc[typedKey] = {
      theme: {
        ...appTheme,
        colors: {
          ...appTheme.colors,
          default: { ...appTheme.colors[typedKey] },
        },
      },
      ...variantMeta[typedKey],
    };

    return acc;
  },
  {} as Record<ThemeVariantKey, ThemeVariant>,
);
