"use client";
import React, { useCallback } from "react";
import { ChevronDown } from "lucide-react";
import {
  TimeLineFilterGroup,
  TimeLineSelectContainer,
  TimeLineSelectTrigger,
  TimeLineSelectValue,
  TimeLineFilterContent,
  TimeLineInput,
  TimeLineButton,
  TimeLineFilterSection,
  TimeLineFilterLabel,
  TimeLineFilterInputGrid,
  TimeLineFilterNote,
  TimeLineFilterButtonGrid,
  TimeLineQuickRanges,
  TimeLineQuickChip,
} from "./style";

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

  const formatDateTimeForInput = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  };

  const handleQuickRange = useCallback(
    (minutes: number) => {
      const now = new Date();
      const start = new Date(now.getTime() - minutes * 60 * 1000);
      onStartDateTimeChange(formatDateTimeForInput(start));
      onEndDateTimeChange(formatDateTimeForInput(now));
    },
    [onStartDateTimeChange, onEndDateTimeChange],
  );

  return (
    <TimeLineFilterGroup>
      <TimeLineSelectContainer data-dropdown-container>
        <TimeLineSelectTrigger onClick={onToggle}>
          <TimeLineSelectValue>
            {startDateTime && endDateTime
              ? "Custom Range"
              : "Select Time Range"}
          </TimeLineSelectValue>
          <ChevronDown size={16} />
        </TimeLineSelectTrigger>
        {isOpen && (
          <TimeLineFilterContent>
            <TimeLineFilterSection>
              <TimeLineQuickRanges>
                <TimeLineQuickChip onClick={() => handleQuickRange(1)}>Last 1 min</TimeLineQuickChip>
                <TimeLineQuickChip onClick={() => handleQuickRange(3)}>Last 3 min</TimeLineQuickChip>
                <TimeLineQuickChip onClick={() => handleQuickRange(5)}>Last 5 min</TimeLineQuickChip>
              </TimeLineQuickRanges>
              <div>
                <TimeLineFilterLabel>Start Date & Time</TimeLineFilterLabel>
                <TimeLineFilterInputGrid>
                  <TimeLineInput
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
                  <TimeLineInput
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
                </TimeLineFilterInputGrid>
              </div>
              <div>
                <TimeLineFilterLabel>End Date & Time</TimeLineFilterLabel>
                <TimeLineFilterInputGrid>
                  <TimeLineInput
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
                  <TimeLineInput
                    type="time"
                    step="1"
                    value={
                      endDateTime ? endDateTime.split(" ")[1] || "00:00:00" : ""
                    }
                    onClick={handleInputInteraction}
                    onChange={(e) => handleTimeChange(e, false)}
                  />
                </TimeLineFilterInputGrid>
              </div>
              <TimeLineFilterNote>
                Maximum time range: 5 minutes
              </TimeLineFilterNote>
              <TimeLineFilterButtonGrid>
                <TimeLineButton
                  size="sm"
                  variant="outline"
                  onClick={(e) => handleButtonClick(e, "reset")}
                >
                  Reset
                </TimeLineButton>
                <TimeLineButton
                  size="sm"
                  onClick={(e) => handleButtonClick(e, "apply")}
                >
                  Apply
                </TimeLineButton>
              </TimeLineFilterButtonGrid>
            </TimeLineFilterSection>
          </TimeLineFilterContent>
        )}
      </TimeLineSelectContainer>
    </TimeLineFilterGroup>
  );
};

export default TimelineFilter;
