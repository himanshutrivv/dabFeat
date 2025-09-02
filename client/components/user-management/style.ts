import {
  cardStyles,
  flexBetween,
  flexCenter,
  inputStyles,
  media,
} from "@/styles/styled";
import styled from "@emotion/styled";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing?.[4]};
`;

export const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing?.[4]};
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing?.[1]};
`;

export const Label = styled.label`
  font-family: ${({ theme }) => theme.fonts};
  font-size: ${({ theme }) => theme.fontSizes?.sm};
  font-weight: ${({ theme }) => theme.fontWeights?.medium};
  color: ${({ theme }) => theme.colors.default?.primary};
`;

export const Input = styled.input<{ hasError?: boolean }>`
  ${({ theme }) => inputStyles(theme)}

  ${({ theme, hasError }) =>
    hasError &&
    `
      border-color: ${theme.colors.default?.destructive};
      &:focus {
        border-color: ${theme.colors.default?.destructive};
        box-shadow: 0 0 0 2px ${theme.colors.default?.destructive};
      }
    `}
`;

export const Container = styled.div``;

export const Main = styled.main`
  max-width: 1280px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing?.[8]}
    ${({ theme }) => theme.spacing?.[4]};

  ${media.sm} {
    padding: ${({ theme }) => theme.spacing?.[8]}
      ${({ theme }) => theme.spacing?.[6]};
  }

  ${media.lg} {
    padding: ${({ theme }) => theme.spacing?.[8]}
      ${({ theme }) => theme.spacing?.[8]};
  }
`;

export const Card = styled.div`
  ${({ theme }) => cardStyles(theme)}
  margin-bottom: ${({ theme }) => theme.spacing?.[6]};
`;

export const CardHeader = styled.div`
  padding: ${({ theme }) => theme.spacing?.[6]};
  border-bottom: 1px solid
    ${({ theme }) => theme.colors.default?.mutedBackground};
`;

export const CardHeaderTop = styled.div`
  ${flexBetween}
  gap: ${({ theme }) => theme.spacing?.[4]};
  flex-direction: column;
  align-items: flex-start;

  ${media.sm} {
    flex-direction: row;
    align-items: center;
  }
`;

export const CardTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes?.lg};
  font-weight: ${({ theme }) => theme.fontWeights?.semibold};
  font-family: ${({ theme }) => theme.fonts};
  color: ${({ theme }) => theme.colors.default?.primary};
  margin: 0 0 ${({ theme }) => theme.spacing?.[1]} 0;
`;

export const CardDescription = styled.p`
  color: ${({ theme }) => theme.colors.default?.muted};
  font-family: ${({ theme }) => theme.fonts};
  font-size: ${({ theme }) => theme.fontSizes?.sm};
  margin: 0;
`;

export const CardContent = styled.div`
  padding: ${({ theme }) => theme.spacing?.[6]};
`;

export const FiltersContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing?.[4]};

  ${media.sm} {
    flex-direction: row;
  }
`;

export const SearchContainer = styled.div`
  position: relative;
  flex: 1;
`;

export const SearchIcon = styled.div`
  position: absolute;
  left: ${({ theme }) => theme.spacing?.[3]};
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.colors.default?.mutedBackground};
  pointer-events: none;
`;

export const SearchInput = styled.input`
  ${({ theme }) => inputStyles(theme)}
  padding-left: ${({ theme }) => theme.spacing?.[10]};
`;

export const Badge = styled.span<{
  variant?: "default" | "secondary" | "outline";
}>`
  display: inline-flex;
  align-items: center;
  padding: ${({ theme }) => theme.spacing?.[1]}
    ${({ theme }) => theme.spacing?.[2]};
  font-size: ${({ theme }) => theme.fontSizes?.xs};
  font-weight: ${({ theme }) => theme.fontWeights?.medium};
  font-family: ${({ theme }) => theme.fonts};
  border-radius: ${({ theme }) => theme.borderRadius?.sm};

  ${({ variant, theme }) =>
    variant === "default" &&
    `
    background-color: ${theme.colors.default?.primary};
    color: ${theme.colors.default?.primary};
  `}

  ${({ variant, theme }) =>
    variant === "secondary" &&
    `
    background-color: ${theme.colors.default?.secondary};
    color: ${theme.colors.default?.secondaryBackground};
  `}
  
  ${({ variant, theme }) =>
    variant === "outline" &&
    `
    border: 1px solid ${theme.colors.default?.primary};
    background-color: ${theme.colors.default?.primary};
    color: ${theme.colors.default?.primary};
  `}
`;

export const StatusBadge = styled(Badge)<{ status: string }>`
  ${({ status, theme }) =>
    status === "active" &&
    `
    background-color: ${theme.colors.default?.primary};
    color: ${theme.colors.default?.primaryBackground};
  `}

  ${({ status, theme }) =>
    status === "inactive" &&
    `
    background-color: ${theme.colors.default.destructive};
    color: ${theme.colors.default?.destructiveBackground};
  `}
`;

export const DeleteModalContent = styled.div`
  text-align: center;
`;

export const DeleteModalDescription = styled.p`
  color: ${({ theme }) => theme.colors.default?.primary};
  margin: 0 0 ${({ theme }) => theme.spacing?.[6]} 0;
  line-height: 1.5;
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing?.[12]} 0;
`;

export const EmptyIcon = styled.div`
  ${flexCenter}
  margin: 0 auto ${({ theme }) => theme.spacing?.[4]} auto;
  width: 3rem;
  height: 3rem;
  color: ${({ theme }) => theme.colors?.default?.mutedBackground};
`;

export const EmptyTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes?.lg};
  font-weight: ${({ theme }) => theme.fontWeights?.medium};
  font-family: ${({ theme }) => theme.fonts};
  color: ${({ theme }) => theme.colors?.default?.primary};
  margin: 0 0 ${({ theme }) => theme.spacing?.[2]} 0;
`;

export const EmptyDescription = styled.p`
  color: ${({ theme }) => theme.colors?.default?.mutedBackground};
  margin: 0 0 ${({ theme }) => theme.spacing?.[4]} 0;
`;
