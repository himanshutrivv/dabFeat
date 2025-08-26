import styled from "@emotion/styled";
import { flexBetween } from "../../styles/styled-components";

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

export const SelectItemsContainer = styled.div`
  padding: ${({ theme }) => theme.spacing[1]};
`;

export const SelectItem = styled.div<{ selected?: boolean }>`
  position: relative;
  display: flex;
  width: 100%;
  cursor: pointer;
  user-select: none;
  align-items: center;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  padding: ${({ theme }) => theme.spacing[2]} ${({ theme }) => theme.spacing[3]};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  outline: none;
  transition: ${({ theme }) => theme.transitions.all};
  color: ${({ theme }) => theme.colors.foreground};
  font-weight: ${(props) => props.selected ? props.theme.fontWeights.semibold : props.theme.fontWeights.normal};

  &:hover {
    background-color: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.accentForeground};
  }

  &:focus {
    background-color: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.accentForeground};
  }

  ${(props) =>
    props.selected &&
    `
      background-color: ${props.theme.colors.accent};
      color: ${props.theme.colors.accentForeground};
    `}
`;
