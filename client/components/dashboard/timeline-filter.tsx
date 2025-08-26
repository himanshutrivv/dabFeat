"use client";
import React, { useCallback } from "react";
import { ChevronDown } from "lucide-react";
import {
  TimelineFilterGroup,
  TimelineFilterSelectContainer,
  TimelineFilterSelectTrigger,
  TimelineFilterSelectValue,
  TimelineFilterInput,
  TimelineFilterButton,
  TimelineFilterContentStyled,
  TimelineFilterSectionStyled,
  TimelineFilterLabelStyled,
  TimelineFilterInputGridStyled,
  TimelineFilterNoteStyled,
  TimelineFilterButtonGridStyled,
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

  return (
    <TimelineFilterGroup>
      <TimelineFilterSelectContainer data-dropdown-container>
        <TimelineFilterSelectTrigger onClick={onToggle}>
          <TimelineFilterSelectValue>
            {startDateTime && endDateTime
              ? "Custom Range"
              : "Select Time Range"}
          </TimelineFilterSelectValue>
          <ChevronDown size={16} />
        </TimelineFilterSelectTrigger>
        {isOpen && (
          <TimelineFilterContentStyled className="filter-content">
            <TimelineFilterSectionStyled>
              <div>
                <TimelineFilterLabelStyled>Start Date & Time</TimelineFilterLabelStyled>
                <TimelineFilterInputGridStyled>
                  <TimelineFilterInput
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
                  <TimelineFilterInput
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
                </TimelineFilterInputGridStyled>
              </div>
              <div>
                <TimelineFilterLabelStyled>End Date & Time</TimelineFilterLabelStyled>
                <TimelineFilterInputGridStyled>
                  <TimelineFilterInput
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
                  <TimelineFilterInput
                    type="time"
                    step="1"
                    value={
                      endDateTime ? endDateTime.split(" ")[1] || "00:00:00" : ""
                    }
                    onClick={handleInputInteraction}
                    onChange={(e) => handleTimeChange(e, false)}
                  />
                </TimelineFilterInputGridStyled>
              </div>
              <TimelineFilterNoteStyled>
                Maximum time range: 5 minutes
              </TimelineFilterNoteStyled>
              <TimelineFilterButtonGridStyled>
                <TimelineFilterButton
                  size="sm"
                  variant="outline"
                  onClick={(e) => handleButtonClick(e, "reset")}
                >
                  Reset
                </TimelineFilterButton>
                <TimelineFilterButton
                  size="sm"
                  onClick={(e) => handleButtonClick(e, "apply")}
                >
                  Apply
                </TimelineFilterButton>
              </TimelineFilterButtonGridStyled>
            </TimelineFilterSectionStyled>
          </TimelineFilterContentStyled>
        )}
      </TimelineFilterSelectContainer>
    </TimelineFilterGroup>
  );
};

export default TimelineFilter;
