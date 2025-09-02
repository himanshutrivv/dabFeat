import styled from "@emotion/styled";

export const Container = styled.div`
  max-width: 87.5rem;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing[6]};

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    padding: ${({ theme }) => theme.spacing[8]};
  }
`;

export const Header = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing[12]};
`;

export const MainTitle = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes["4xl"]};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  font-family: ${({ theme }) => theme.fonts};
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.default.primary} 0%,
    #334155 50%,
    #475569 100%
  );
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0 0 ${({ theme }) => theme.spacing[4]} 0;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    font-size: ${({ theme }) => theme.fontSizes["5xl"]};
  }
`;

export const Subtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.default.mutedBackground};
  max-width: 32rem;
  margin: 0 auto;
  line-height: 1.5;
`;

export const MainCard = styled.div`
  border-radius: ${({ theme }) => theme.borderRadius?.["3xl"]};
  box-shadow: ${({ theme }) => theme.shadows.xl};
  border: 1px solid ${({ theme }) => theme.colors.default.mutedBackground};
  overflow: hidden;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    &:not(:last-child) {
      margin-bottom: ${({ theme }) => theme.spacing[8]};
    }
  }
`;

export const Section = styled.section`
  margin: 0;
`;

export const SectionHeaderClickable = styled.div<{ isExpanded: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  min-height: 100px;
  padding: ${({ theme }) => theme.spacing[4]};
  background: ${({ theme }) => theme.colors.default.mutedBackground};

  &:hover {
    color: ${({ theme }) => theme.colors.default.primary};
    background-color: ${({ theme }) => theme.colors.default.mutedBackground};
  }
`;

export const SectionTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[4]};
`;

export const IconWrapper = styled.div`
  width: 3rem;
  height: 3rem;
  border-radius: ${({ theme }) => theme.borderRadius["2xl"]};
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.default.primary} 0%
  );
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const IconSelectedWrapper = styled.div<{
  isSelected: boolean;
  variant: string;
}>`
  width: 1.75rem;
  height: 1.75rem;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${({ theme }) => theme.shadows.sm};
  background: ${({ theme, isSelected, variant }) =>
    isSelected
      ? `linear-gradient(
        135deg,
        ${theme.colors[variant as keyof typeof theme.colors]?.muted} 0%,
        ${theme.colors[variant as keyof typeof theme.colors]?.mutedBackground} 100%
      )`
      : (theme.colors as any)[variant]?.mutedBackground};
  color: ${(props) =>
    props.isSelected
      ? ({ theme, variant }) =>
          (theme.colors as any)[variant]?.primaryBackground
      : ({ theme, variant }) => (theme.colors as any)[variant]?.primary};
`;

export const SectionTitleText = styled.div``;

export const LargePreview = styled.div<{ fontFamily?: string }>`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  font-family: ${({ fontFamily, theme }) =>
    fontFamily ? fontFamily : theme.fonts};
  color: ${({ theme }) => theme.colors.default.primary};
  font-family: ${(props) => props.fontFamily};
`;

export const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes["lg"]};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  font-family: ${({ theme }) => theme.fonts};
  color: ${({ theme }) => theme.colors.default.primary};
  margin: 0;
`;

export const SectionDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.default.muted};
  margin: 0;
`;

export const ChevronWrapper = styled.div<{ isExpanded: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  background-color: transparent;
  border: 1px solid transparent;
  transition: ${({ theme }) => theme.transitions.all};
  flex-shrink: 0;

  svg {
    transition: ${({ theme }) => theme.transitions.transform};
    transform: ${(props) =>
      props.isExpanded ? "rotate(0deg)" : "rotate(180deg)"};
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.default.muted};
    border-color: transparent;
  }
`;

export const CollapsibleContent = styled.div<{ isExpanded: boolean }>`
  display: grid;
  grid-template-rows: ${({ isExpanded }) => (isExpanded ? "1fr" : "0fr")};
  transition:
    grid-template-rows 0.4s ease-in-out,
    opacity 0.3s ease-in-out;
  opacity: ${({ isExpanded }) => (isExpanded ? "1" : "0")};
  overflow: hidden;
  border-radius: 0 0 ${({ theme }) => theme.borderRadius["3xl"]}
    ${({ theme }) => theme.borderRadius["3xl"]};

  > div {
    overflow: hidden;
    padding: ${({ isExpanded, theme }) =>
      isExpanded ? theme.spacing[6] : "0"};
    transition: padding 0.3s ease-in-out;
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing[4]};
  padding-top: ${({ theme }) => theme.spacing[2]};

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.xl}) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (min-width: 1600px) {
    grid-template-columns: repeat(5, 1fr);
  }

  > * {
    height: 100%;
    display: flex;
    align-items: stretch;
  }
`;

export const CardWrapper = styled.div`
  position: relative;
`;

export const CardButton = styled.button<{
  variant: string;
  isSelected: boolean;
  fontFamily?: string;
}>`
  position: relative;
  width: 100%;
  height: 100%;
  padding: ${({ theme }) => theme.spacing[4]};
  border: 2px solid
    ${(props) =>
      props.isSelected
        ? ({ theme }) => (theme.colors as any)[props.variant]?.primary
        : ({ theme }) => (theme.colors as any)[props.variant]?.mutedBackground};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  background-color: ${({ theme, variant }) =>
    (theme.colors as any)[variant]?.primaryBackground};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.all};
  text-align: left;
  min-height: 7rem;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: ${(props) =>
    props.isSelected
      ? ({ theme }) => theme.shadows["2xl"]
      : ({ theme }) => theme.shadows.md};
  font-family: ${({ fontFamily, theme }) =>
    fontFamily ? fontFamily : theme.fonts};

  &:hover {
    border-color: ${({ theme, variant }) =>
      (theme.colors as any)[variant]?.mutedBackground};
    transform: translateY(-0.25rem);
    box-shadow: ${({ theme }) => theme.shadows["2xl"]};
  }

  &:before {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      135deg,
      ${({ theme, variant }) => (theme.colors as any)[variant]?.primary} -50%,
      transparent 50%
    );
    opacity: 0;
    transition: ${({ theme }) => theme.transitions.opacity};
  }

  &:hover:before {
    opacity: 1;
  }

  ${({ isSelected, theme }) =>
    isSelected &&
    `
     box-shadow: ${theme.shadows["2xl"]}, 0 0 0 4px rgba(15, 23, 42, 0.1);
  `}
`;

export const PremiumBadge = styled.div<{ variant: string }>`
  position: absolute;
  top: -0.5rem;
  right: -0.5rem;
  width: 1.8rem;
  height: 1.8rem;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background: linear-gradient(
    135deg,
    ${({ theme, variant }) => (theme.colors as any)[variant]?.primaryBackground}
      0%
  );
  color: ${({ theme, variant }) => (theme.colors as any)[variant]?.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${({ theme }) => theme.shadows.lg};
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`;

export const IconWrapperSmall = styled.div<{ isSelected: boolean }>`
  width: 1.75rem;
  height: 1.75rem;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: ${({ theme }) => theme.transitions.all};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  background: ${({ theme, isSelected }) =>
    isSelected
      ? `linear-gradient(135deg, ${theme.colors.default.primary} 0%, #334155 100%)`
      : `linear-gradient(135deg, ${theme.colors.default.muted} 0%, ${theme.colors.default.secondary} 100%)`};
  color: ${(props) =>
    props.isSelected
      ? ({ theme }) => theme.colors.default.primaryBackground
      : ({ theme }) => theme.colors.default.mutedBackground};
`;

export const CategoryBadge = styled.span<{
  fontFamily?: string;
  variant: string;
}>`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  font-family: ${({ fontFamily, theme }) =>
    fontFamily ? fontFamily : theme.fonts};
  padding: ${({ theme }) => theme.spacing[1]} ${({ theme }) => theme.spacing[2]};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background-color: ${({ theme, variant }) =>
    (theme.colors as any)[variant]?.mutedBackground};
  color: ${({ theme, variant }) => (theme.colors as any)[variant]?.primary};
`;

export const CardContent = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing[3]};
`;

export const CardTitle = styled.h3<{ fontFamily?: string; variant: string }>`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme, variant }) => (theme.colors as any)[variant]?.primary};
  margin: 0 0 ${({ theme }) => theme.spacing[1]} 0;
  font-family: ${({ fontFamily, theme }) =>
    fontFamily ? fontFamily : theme.fonts};
`;

export const CardDescription = styled.p<{
  fontFamily?: string;
  variant: string;
}>`
  font-size: 0.625rem;
  font-family: ${({ fontFamily, theme }) =>
    fontFamily ? fontFamily : theme.fonts};
  color: ${({ theme, variant }) => (theme.colors as any)[variant]?.muted};
  margin: 0;
  line-height: 1.3;
`;

export const GradientOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2rem;
  background: linear-gradient(
    to top,
    ${({ theme }) => theme.colors.default.mutedBackground} 0%,
    transparent 100%
  );
  pointer-events: none;
`;

export const ColorSection = styled.div`
  margin-top: auto;
`;

export const ColorHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[1]};
  margin-bottom: ${({ theme }) => theme.spacing[2]};
`;

export const ColorLabel = styled.span<{ fontFamily?: string; variant: string }>`
  font-size: 0.625rem;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  font-family: ${({ fontFamily, theme }) =>
    fontFamily ? fontFamily : theme.fonts};
  color: ${({ theme, variant }) => (theme.colors as any)[variant]?.muted};
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

export const ColorPalette = styled.div`
  display: flex;
  gap: 0.25rem;
`;

export const ColorSwatchWrapper = styled.div`
  position: relative;
  &:hover {
    .color-swatch {
      transform: scale(1.1);
    }
  }
`;

export const ColorSwatch = styled.div<{ variant: string; color?: string }>`
  width: 0.75rem;
  height: 0.75rem;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  background-color: ${(props) => props.color};
  border: 1px solid
    ${({ theme, variant }) => (theme.colors as any)[variant]?.primaryBackground};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  transition: ${({ theme }) => theme.transitions.transform};
  position: relative;
  &:after {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: ${({ theme }) => theme.borderRadius.sm};
    pointer-events: none;
  }
`;
