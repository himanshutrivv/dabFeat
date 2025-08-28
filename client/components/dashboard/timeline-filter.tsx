"use client";
import React, { useCallback } from "react";
import styled from "@emotion/styled";
import { ChevronDown } from "lucide-react";
import {
  flexBetween,
  flexColumn,
  buttonBaseStyles,
  inputStyles,
  primaryButtonStyles,
  outlineButtonStyles,
} from "../../styles/styled-components";

interface TimelineFilterProps {
  startDateTime: string;
  endDateTime: string;
  isOpen: boolean;
  onToggle: () => void;
  onStartDateTimeChange: (value: string) => void;
  onEndDateTimeChange: (value: string) => void;
  onReset: () => void;
  onApply: () => void;
}

const FilterGroup = styled.div``;

const SelectContainer = styled.div`
  position: relative;
  z-index: 10000;
  isolation: isolate;
`;

const SelectTrigger = styled.button`
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

const SelectValue = styled.span`
  color: ${({ theme }) => theme.colors.foreground};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;

const SelectContent = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 10000;
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
  isolation: isolate;

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

const TimelineInput = styled.input`
  ${inputStyles()}
  font-family: ${({ theme }) => theme.fonts.mono};
`;

const Button = styled.button<{
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

const TimelineFilterContent = styled(SelectContent)`
  width: 380px;
  padding: ${({ theme }) => theme.spacing[4]};
  z-index: 20000;
  isolation: isolate;
  position: absolute;

  @media (max-width: 768px) {
    width: 300px;
    min-width: 280px;
  }
`;

const TimelineFilterSection = styled.div`
  ${flexColumn}
  gap: ${({ theme }) => theme.spacing[4]};
`;

const TimelineFilterLabel = styled.label`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  margin-bottom: ${({ theme }) => theme.spacing[2]};
  display: block;
  color: ${({ theme }) => theme.colors.foreground};
`;

const TimelineFilterInputGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing[2]};
`;

const TimelineFilterNote = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.mutedForeground};
  text-align: center;
`;

const TimelineFilterButtonGrid = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[2]};
`;

const TimelineFilter: React.FC<TimelineFilterProps> = ({
  startDateTime,
  endDateTime,
  isOpen,
  onToggle,
  onStartDateTimeChange,
  onEndDateTimeChange,
  onReset,
  onApply,
}) => {
  const handleInputInteraction = useCallback(
    (e: React.MouseEvent | React.FocusEvent) => {
      e.stopPropagation();
    },
    [],
  );

  const handleDateChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, isStart: boolean) => {
      e.stopPropagation();
      if (e.target.value) {
        const currentDateTime = isStart ? startDateTime : endDateTime;
        const timePart = currentDateTime
          ? currentDateTime.split(" ")[1] || "00:00:00"
          : "00:00:00";
        const [year, month, day] = e.target.value.split("-");
        const newDateTime = `${day}/${month}/${year} ${timePart}`;

        if (isStart) {
          onStartDateTimeChange(newDateTime);
        } else {
          onEndDateTimeChange(newDateTime);
        }
      }
    },
    [startDateTime, endDateTime, onStartDateTimeChange, onEndDateTimeChange],
  );

  const handleTimeChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, isStart: boolean) => {
      e.stopPropagation();
      if (e.target.value) {
        const currentDateTime = isStart ? startDateTime : endDateTime;
        const datePart = currentDateTime
          ? currentDateTime.split(" ")[0]
          : new Date().toLocaleDateString("en-GB");
        const newDateTime = `${datePart} ${e.target.value}`;

        if (isStart) {
          onStartDateTimeChange(newDateTime);
        } else {
          onEndDateTimeChange(newDateTime);
        }
      }
    },
    [startDateTime, endDateTime, onStartDateTimeChange, onEndDateTimeChange],
  );

  const handleButtonClick = useCallback(
    (e: React.MouseEvent, action: "reset" | "apply") => {
      e.stopPropagation();
      if (action === "reset") {
        onReset();
      } else {
        onApply();
      }
    },
    [onReset, onApply],
  );

  return (
    <FilterGroup>
      <SelectContainer data-dropdown-container>
        <SelectTrigger onClick={onToggle}>
          <SelectValue>
            {startDateTime && endDateTime
              ? "Custom Range"
              : "Select Time Range"}
          </SelectValue>
          <ChevronDown size={16} />
        </SelectTrigger>
        {isOpen && (
          <TimelineFilterContent>
            <TimelineFilterSection>
              <div>
                <TimelineFilterLabel>Start Date & Time</TimelineFilterLabel>
                <TimelineFilterInputGrid>
                  <TimelineInput
                    type="date"
                    value={
                      startDateTime
                        ? startDateTime
                            .split(" ")[0]
                            .split("/")
                            .reverse()
                            .join("-")
                        : ""
                    }
                    onClick={handleInputInteraction}
                    onChange={(e) => handleDateChange(e, true)}
                  />
                  <TimelineInput
                    type="time"
                    step="1"
                    value={
                      startDateTime
                        ? startDateTime.split(" ")[1] || "00:00:00"
                        : ""
                    }
                    onClick={handleInputInteraction}
                    onChange={(e) => handleTimeChange(e, true)}
                  />
                </TimelineFilterInputGrid>
              </div>
              <div>
                <TimelineFilterLabel>End Date & Time</TimelineFilterLabel>
                <TimelineFilterInputGrid>
                  <TimelineInput
                    type="date"
                    value={
                      endDateTime
                        ? endDateTime
                            .split(" ")[0]
                            .split("/")
                            .reverse()
                            .join("-")
                        : ""
                    }
                    onClick={handleInputInteraction}
                    onChange={(e) => handleDateChange(e, false)}
                  />
                  <TimelineInput
                    type="time"
                    step="1"
                    value={
                      endDateTime ? endDateTime.split(" ")[1] || "00:00:00" : ""
                    }
                    onClick={handleInputInteraction}
                    onChange={(e) => handleTimeChange(e, false)}
                  />
                </TimelineFilterInputGrid>
              </div>
              <TimelineFilterNote>
                Maximum time range: 5 minutes
              </TimelineFilterNote>
              <TimelineFilterButtonGrid>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={(e) => handleButtonClick(e, "reset")}
                >
                  Reset
                </Button>
                <Button
                  size="sm"
                  onClick={(e) => handleButtonClick(e, "apply")}
                >
                  Apply
                </Button>
              </TimelineFilterButtonGrid>
            </TimelineFilterSection>
          </TimelineFilterContent>
        )}
      </SelectContainer>
    </FilterGroup>
  );
};

export default TimelineFilter;
