import styled from "@emotion/styled";
import {
  flexBetween,
  flexColumn,
  buttonBaseStyles,
  inputStyles,
  primaryButtonStyles,
  outlineButtonStyles
} from "../../styles/styled-components";

export const FilterGroup = styled.div``;

export const SelectContainer = styled.div`
  position: relative;
  z-index: 20;
`;

export const SelectTrigger = styled.button`
  ${flexBetween}
  height: 40px;
  width: 100%;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 1px solid ${({ theme }) => theme.colors.input};
  background-color: ${({ theme }) => theme.colors.background};
  padding: 0 ${({ theme }) => theme.spacing[3]};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.foreground};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.all};

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.ring};
    outline-offset: 2px;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.accentForeground};
  }
`;

export const SelectValue = styled.span`
  color: ${({ theme }) => theme.colors.foreground};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;

export const SelectContent = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 30;
  max-height: 384px;
  min-width: 200px;
  overflow-y: auto;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.card};
  color: ${({ theme }) => theme.colors.cardForeground};
  box-shadow: ${({ theme }) => theme.shadows.xl};
  margin-top: ${({ theme }) => theme.spacing[1]};
  animation: fadeIn 0.2s ease-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
`;

export const TimelineInput = styled.input`
  ${inputStyles()}
  font-family: ${({ theme }) => theme.fonts.mono};
`;

export const Button = styled.button<{
  variant?: "default" | "outline";
  size?: "default" | "sm";
}>`
  ${buttonBaseStyles()}

  ${(props) => {
    switch (props.variant) {
      case "outline":
        return outlineButtonStyles(props.theme);
      default:
        return primaryButtonStyles(props.theme);
    }
  }}

  ${(props) => {
    switch (props.size) {
      case "sm":
        return `
          height: 36px;
          border-radius: ${props.theme.borderRadius.md};
          padding: 0 ${props.theme.spacing[3]};
          font-size: ${props.theme.fontSizes.xs};
        `;
      default:
        return `
          height: 40px;
          padding: 0 ${props.theme.spacing[4]};
        `;
    }
  }}

  flex: 1;
`;

export const TimelineFilterContent = styled(SelectContent)`
  width: 380px;
  padding: ${({ theme }) => theme.spacing[4]};
`;

export const TimelineFilterSection = styled.div`
  ${flexColumn}
  gap: ${({ theme }) => theme.spacing[4]};
`;

export const TimelineFilterLabel = styled.label`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  margin-bottom: ${({ theme }) => theme.spacing[2]};
  display: block;
  color: ${({ theme }) => theme.colors.foreground};
`;

export const TimelineFilterInputGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing[2]};
`;

export const TimelineFilterNote = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.mutedForeground};
  text-align: center;
`;

export const TimelineFilterButtonGrid = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[2]};
`;
