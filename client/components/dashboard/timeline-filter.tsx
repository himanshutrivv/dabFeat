"use client";
import React, { useCallback } from "react";
import { ChevronDown } from "lucide-react";
import {
  FilterGroup,
  SelectContainer,
  SelectTrigger,
  SelectValue,
  SelectContent,
  TimelineInput,
  Button,
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
  const handleInputInteraction = useCallback((e: React.MouseEvent | React.FocusEvent) => {
    e.stopPropagation();
  }, []);

  const handleDateChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, isStart: boolean) => {
      e.stopPropagation();
      if (e.target.value) {
        const currentDateTime = isStart ? startDateTime : endDateTime;
        const timePart = currentDateTime ? currentDateTime.split(" ")[1] || "00:00:00" : "00:00:00";
        const [year, month, day] = e.target.value.split("-");
        const newDateTime = `${day}/${month}/${year} ${timePart}`;

        if (isStart) {
          onStartDateTimeChange(newDateTime);
        } else {
          onEndDateTimeChange(newDateTime);
        }
      }
    },
    [startDateTime, endDateTime, onStartDateTimeChange, onEndDateTimeChange]
  );

  const handleTimeChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, isStart: boolean) => {
      e.stopPropagation();
      if (e.target.value) {
        const currentDateTime = isStart ? startDateTime : endDateTime;
        const datePart = currentDateTime ? currentDateTime.split(" ")[0] : new Date().toLocaleDateString("en-GB");
        const newDateTime = `${datePart} ${e.target.value}`;

        if (isStart) {
          onStartDateTimeChange(newDateTime);
        } else {
          onEndDateTimeChange(newDateTime);
        }
      }
    },
    [startDateTime, endDateTime, onStartDateTimeChange, onEndDateTimeChange]
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
    [onReset, onApply]
  );

  return (
    <FilterGroup>
      <SelectContainer data-dropdown-container>
        <SelectTrigger onClick={onToggle}>
          <SelectValue>
            {startDateTime && endDateTime ? "Custom Range" : "Select Time Range"}
          </SelectValue>
          <ChevronDown size={16} />
        </SelectTrigger>
        {isOpen && (
          <SelectContent style={{ width: "380px", padding: "16px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label style={{ fontSize: "14px", fontWeight: 500, marginBottom: "8px", display: "block" }}>
                  Start Date & Time
                </label>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                  <TimelineInput
                    type="date"
                    value={startDateTime ? startDateTime.split(" ")[0].split("/").reverse().join("-") : ""}
                    onClick={handleInputInteraction}
                    onChange={(e) => handleDateChange(e, true)}
                  />
                  <TimelineInput
                    type="time"
                    step="1"
                    value={startDateTime ? startDateTime.split(" ")[1] || "00:00:00" : ""}
                    onClick={handleInputInteraction}
                    onChange={(e) => handleTimeChange(e, true)}
                  />
                </div>
              </div>
              <div>
                <label style={{ fontSize: "14px", fontWeight: 500, marginBottom: "8px", display: "block" }}>
                  End Date & Time
                </label>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                  <TimelineInput
                    type="date"
                    value={endDateTime ? endDateTime.split(" ")[0].split("/").reverse().join("-") : ""}
                    onClick={handleInputInteraction}
                    onChange={(e) => handleDateChange(e, false)}
                  />
                  <TimelineInput
                    type="time"
                    step="1"
                    value={endDateTime ? endDateTime.split(" ")[1] || "00:00:00" : ""}
                    onClick={handleInputInteraction}
                    onChange={(e) => handleTimeChange(e, false)}
                  />
                </div>
              </div>
              <div style={{ fontSize: "12px", color: "hsl(var(--muted-foreground))", textAlign: "center" }}>
                Maximum time range: 5 minutes
              </div>
              <div style={{ display: "flex", gap: "8px" }}>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={(e) => handleButtonClick(e, "reset")}
                  style={{ flex: 1 }}
                >
                  Reset
                </Button>
                <Button
                  size="sm"
                  onClick={(e) => handleButtonClick(e, "apply")}
                  style={{ flex: 1 }}
                >
                  Apply
                </Button>
              </div>
            </div>
          </SelectContent>
        )}
      </SelectContainer>
    </FilterGroup>
  );
};

export default TimelineFilter;
