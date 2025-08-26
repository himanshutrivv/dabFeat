import styled from "@emotion/styled";
import {
  flexBetween,
  flexCenter,
  flexColumn,
  buttonBaseStyles,
  inputStyles,
  primaryButtonStyles,
  outlineButtonStyles
} from "../../styles/styled-components";

export const MainFilterBackdrop = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 9998;
  animation: fadeIn 0.3s ease-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export const MainFilterModal = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 33.333333%;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
  border-left: 1px solid ${({ theme }) => theme.colors.border};
  border-top-left-radius: ${({ theme }) => theme.borderRadius["3xl"]};
  border-bottom-left-radius: ${({ theme }) => theme.borderRadius["3xl"]};
  box-shadow: ${({ theme }) => theme.shadows.xl};
  z-index: 9999;
  display: flex;
  flex-direction: column;
  animation: slideInFromRight 0.3s ease-out;

  @keyframes slideInFromRight {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0);
    }
  }
`;

export const MainFilterHeader = styled.div`
  ${flexBetween}
  padding: ${({ theme }) => theme.spacing[6]};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  flex-shrink: 0;
`;

export const MainFilterContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: ${({ theme }) => theme.spacing[6]};
`;

export const MainFilterSearch = styled.div`
  position: relative;
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`;

export const MainFilterListItem = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  &:last-child {
    border-bottom: none;
  }
`;

export const MainFilterItemHeader = styled.div<{ isActive?: boolean }>`
  ${flexBetween}
  padding: ${({ theme }) => theme.spacing[4]} 0;
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.all};
  color: ${(props) =>
    props.isActive ? props.theme.colors.primary : props.theme.colors.foreground};

  &:hover {
    background-color: ${({ theme }) => theme.colors.muted};
    margin: 0 -${({ theme }) => theme.spacing[6]};
    padding-left: ${({ theme }) => theme.spacing[6]};
    padding-right: ${({ theme }) => theme.spacing[6]};
  }
`;

export const MainFilterExpandIcon = styled.div<{ isExpanded: boolean }>`
  ${flexCenter}
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: ${(props) =>
    props.isExpanded ? props.theme.colors.primary : props.theme.colors.muted};
  color: ${(props) =>
    props.isExpanded ? "white" : props.theme.colors.mutedForeground};
  transition: ${({ theme }) => theme.transitions.all};
`;

export const MainFilterOptionsContainer = styled.div`
  padding: 0 0 ${({ theme }) => theme.spacing[4]} 0;
  margin-top: -${({ theme }) => theme.spacing[2]};
`;

export const MainFilterOptions = styled.div`
  max-height: 256px;
  overflow-y: auto;
`;

export const MainFilterCheckbox = styled.div<{ selected: boolean }>`
  width: 20px;
  height: 20px;
  border: 2px solid
    ${(props) =>
    props.selected ? props.theme.colors.primary : props.theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  background-color: ${(props) =>
    props.selected ? props.theme.colors.primary : "transparent"};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: ${({ theme }) => theme.transitions.all};
`;

export const MainFilterFooter = styled.div`
  padding: ${({ theme }) => theme.spacing[6]};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  flex-shrink: 0;
`;

export const Button = styled.button<{
  variant?: "default" | "outline";
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

  width: 100%;
  margin-bottom: ${({ theme }) => theme.spacing[2]};

  &:last-child {
    margin-bottom: 0;
  }
`;

export const FilterModalHeaderTitle = styled.h2`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.foreground};
`;

export const FilterModalSearchIcon = styled.div`
  position: absolute;
  left: ${({ theme }) => theme.spacing[3]};
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.colors.mutedForeground};
`;

export const FilterModalSearchInput = styled.input`
  ${inputStyles()}
  padding-left: ${({ theme }) => theme.spacing[10]};
`;

export const FilterModalSectionContent = styled.div`
  ${flexColumn}
  gap: 0;
`;

export const FilterModalItemTitle = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: ${({ theme }) => theme.fontWeights.normal};
`;

export const FilterModalItemTitleActive = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
`;

export const FilterModalItemCount = styled.span`
  margin-left: ${({ theme }) => theme.spacing[2]};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: ${({ theme }) => theme.spacing[1]} ${({ theme }) => theme.spacing[2]};
  border-radius: ${({ theme }) => theme.borderRadius.full};
`;

export const FilterModalSectionSearchIcon = styled.div`
  position: absolute;
  left: ${({ theme }) => theme.spacing[3]};
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.colors.mutedForeground};
`;

export const FilterModalSectionSearchInput = styled.input`
  ${inputStyles()}
  padding-left: ${({ theme }) => theme.spacing[10]};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  background-color: ${({ theme }) => theme.colors.muted};
`;

export const FilterModalOptionItem = styled.div<{ isSelected?: boolean }>`
  ${flexBetween}
  padding: ${({ theme }) => theme.spacing[2]} ${({ theme }) => theme.spacing[3]};
  cursor: pointer;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  background-color: ${(props) =>
    props.isSelected ? props.theme.colors.accent : "transparent"};
  margin-bottom: ${({ theme }) => theme.spacing[1]};
  transition: ${({ theme }) => theme.transitions.all};

  &:hover {
    background-color: ${({ theme }) => theme.colors.accent};
  }
`;

export const FilterModalOptionText = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.foreground};
`;

export const FilterModalCheckIcon = styled.svg`
  color: white;
`;

export const FilterModalSearchContainer = styled(MainFilterSearch)`
  margin-bottom: ${({ theme }) => theme.spacing[6]};
`;

export const FilterModalSearchContainerSmall = styled(MainFilterSearch)`
  margin-bottom: ${({ theme }) => theme.spacing[3]};
`;
