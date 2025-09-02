import React from "react";
import { Check, Sparkles } from "lucide-react";
import {
  CardButton,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardWrapper,
  CategoryBadge,
  ColorHeader,
  ColorLabel,
  ColorPalette,
  ColorSection,
  ColorSwatch,
  ColorSwatchWrapper,
  GradientOverlay,
  IconSelectedWrapper,
  PremiumBadge,
} from "./style";

interface ThemeCardProps {
  name: string;
  description?: string;
  icon: React.ReactNode;
  colors: string[];
  isSelected: boolean;
  onClick: () => void;
  variant: string;
  category?: string;
}

export const ThemeCard: React.FC<ThemeCardProps> = ({
  name,
  description,
  icon,
  colors,
  isSelected,
  onClick,
  variant,
  category,
}) => {
  return (
    <CardWrapper>
      <CardButton variant={variant} isSelected={isSelected} onClick={onClick}>
        {isSelected && (
          <PremiumBadge variant={variant}>
            <Check size={12} />
          </PremiumBadge>
        )}

        <CardHeader>
          <IconSelectedWrapper isSelected={isSelected} variant={variant}>
            {icon}
          </IconSelectedWrapper>
          {category && <CategoryBadge variant={variant}>{category}</CategoryBadge>}
        </CardHeader>

        <CardContent>
          <CardTitle variant={variant}>{name}</CardTitle>
          {description && <CardDescription variant={variant}>{description}</CardDescription>}
        </CardContent>

        <ColorSection>
          <ColorHeader>
            <Sparkles size={10} />
            <ColorLabel variant={variant}>Color Palette</ColorLabel>
          </ColorHeader>
          <ColorPalette>
            {colors.map((color, idx) => (
              <ColorSwatchWrapper key={idx}>
                <ColorSwatch variant={variant} color={color} />
              </ColorSwatchWrapper>
            ))}
          </ColorPalette>
        </ColorSection>

        <GradientOverlay />
      </CardButton>
    </CardWrapper>
  );
};
