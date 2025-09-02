import React, { useState } from "react";
import {
  Palette,
  Sun,
  Moon,
  Waves,
  TreePine,
  Sunset,
  Crown,
  Square,
  Building2,
  Type,
  ChevronDown,
} from "lucide-react";
import {
  ChevronWrapper,
  CollapsibleContent,
  Container,
  Grid,
  IconWrapper,
  MainCard,
  Section,
  SectionDescription,
  SectionHeaderClickable,
  SectionTitle,
  SectionTitleText,
  SectionTitleWrapper,
} from "./style";
import { useThemeController } from "@/styles/ThemeControllerProvider";
import { ThemeVariantKey, themeVariants } from "@/styles/themes/themeVariants";
import { FontVariant, fontVariants } from "@/styles/themes/fontVariants";
import { ThemeCard } from "./theme-card";
import { FontCard } from "./font-card";

const Personalize: React.FC = () => {
  const { currentTheme, currentFont, setTheme, setFont } = useThemeController();

  const [selectedTheme, setSelectedTheme] =
    useState<ThemeVariantKey>(currentTheme);
  const [selectedFont, setSelectedFont] = useState<FontVariant>(currentFont);
  const [isThemeSectionExpanded, setIsThemeSectionExpanded] = useState(false);
  const [isFontSectionExpanded, setIsFontSectionExpanded] = useState(false);

  const getThemeIcon = (variant: ThemeVariantKey) => {
    const icons = {
      default: <Sun size={16} />,
      dark: <Moon size={16} />,
      ocean: <Waves size={16} />,
      forest: <TreePine size={16} />,
      sunset: <Sunset size={16} />,
      purple: <Crown size={16} />,
      minimal: <Square size={16} />,
      slate: <Building2 size={16} />,
    } as const;
    return icons[variant];
  };

  const getThemeColors = (variant: ThemeVariantKey) => {
    const themeData = themeVariants[variant].theme;
    const colors =
      (themeData.colors as any)[variant] || themeData.colors.default;
    return [
      colors.primary,
      colors.secondary,
      colors.primary,
      colors.primaryBackground,
    ];
  };

  const getFontCategory = (variant: FontVariant) => {
    const categoryMap: Record<FontVariant, string> = {
      arial: "Sans-serif",
      segoe: "Modern",
      trebuchet: "Friendly",
      gillSans: "Humanist",
      georgia: "Serif",
      palatino: "Classic",
      courier: "Monospace",
      lucida: "Neutral",
    };
    return categoryMap[variant];
  };

  return (
    <Container>
      <MainCard>
        <Section>
          <SectionHeaderClickable
            isExpanded={isThemeSectionExpanded}
            onClick={() => setIsThemeSectionExpanded(!isThemeSectionExpanded)}
          >
            <SectionTitleWrapper>
              <IconWrapper>
                <Palette size={24} color="white" />
              </IconWrapper>
              <SectionTitleText>
                <SectionTitle>Theme Collection</SectionTitle>
                <SectionDescription>
                  Choose from our professionally crafted color schemes
                </SectionDescription>
              </SectionTitleText>
            </SectionTitleWrapper>

            <ChevronWrapper isExpanded={isThemeSectionExpanded}>
              <ChevronDown size={18} />
            </ChevronWrapper>
          </SectionHeaderClickable>

          <CollapsibleContent isExpanded={isThemeSectionExpanded}>
            <Grid>
              {(Object.keys(themeVariants) as ThemeVariantKey[]).map(
                (variant) => {
                  const themeData = themeVariants[variant];
                  const isSelected = selectedTheme === variant;
                  const icon = getThemeIcon(variant);
                  const colors = getThemeColors(variant);
                  const category =
                    variant.charAt(0).toUpperCase() + variant.slice(1);

                  return (
                    <ThemeCard
                      key={variant}
                      name={themeData.name}
                      description={themeData.description}
                      icon={icon}
                      colors={colors}
                      category={category}
                      isSelected={isSelected}
                      onClick={() => {
                        setSelectedTheme(variant);
                        setTheme(variant);
                      }}
                      variant={variant}
                    />
                  );
                },
              )}
            </Grid>
          </CollapsibleContent>
        </Section>
      </MainCard>

      <MainCard>
        <Section>
          <SectionHeaderClickable
            isExpanded={isFontSectionExpanded}
            onClick={() => setIsFontSectionExpanded(!isFontSectionExpanded)}
          >
            <SectionTitleWrapper>
              <IconWrapper>
                <Type size={24} color="white" />
              </IconWrapper>
              <SectionTitleText>
                <SectionTitle>Typography Collection</SectionTitle>
                <SectionDescription>
                  Select the perfect typeface for your brand identity
                </SectionDescription>
              </SectionTitleText>
            </SectionTitleWrapper>

            <ChevronWrapper isExpanded={isFontSectionExpanded}>
              <ChevronDown size={18} />
            </ChevronWrapper>
          </SectionHeaderClickable>

          <CollapsibleContent isExpanded={isFontSectionExpanded}>
            <Grid>
              {(Object.keys(fontVariants) as FontVariant[]).map((variant) => {
                const fontData = fontVariants[variant];
                const isSelected = selectedFont === variant;
                const category = getFontCategory(variant);

                return (
                  <FontCard
                    key={variant}
                    name={fontData.name}
                    fontFamily={fontData.stack}
                    category={category}
                    description={fontData.description}
                    isSelected={isSelected}
                    onClick={() => {
                      setSelectedFont(variant);
                      setFont(variant);
                    }}
                  />
                );
              })}
            </Grid>
          </CollapsibleContent>
        </Section>
      </MainCard>
    </Container>
  );
};

export default Personalize;
