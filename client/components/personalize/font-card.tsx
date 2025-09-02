import React from "react";
import { Check } from "lucide-react";
import {
  CardButton,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardWrapper,
  CategoryBadge,
  GradientOverlay,
  IconSelectedWrapper,
  LargePreview,
  PremiumBadge,
} from "./style";

interface FontCardProps {
  name: string;
  fontFamily: string;
  category: string;
  description?: string;
  isSelected: boolean;
  onClick: () => void;
}

export const FontCard: React.FC<FontCardProps> = ({
  name,
  fontFamily,
  category,
  description,
  isSelected,
  onClick,
}) => {
  return (
    <CardWrapper>
      <CardButton isSelected={isSelected} onClick={onClick} fontFamily={fontFamily} variant="default">
        {isSelected && (
          <PremiumBadge variant="default">
            <Check size={12} />
          </PremiumBadge>
        )}

        <CardHeader>
          <IconSelectedWrapper variant="default" isSelected={isSelected}>
            <LargePreview fontFamily={fontFamily}>Aa</LargePreview>
          </IconSelectedWrapper>
          <CategoryBadge variant="default" fontFamily={fontFamily}>
            {category}
          </CategoryBadge>
        </CardHeader>

        <CardContent>
          <CardTitle variant="default" fontFamily={fontFamily}>
            {name}
          </CardTitle>
          {description && (
            <CardDescription variant="default" fontFamily={fontFamily}>
              {description}
            </CardDescription>
          )}
        </CardContent>

        <GradientOverlay />
      </CardButton>
    </CardWrapper>
  );
};
