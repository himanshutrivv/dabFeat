"use client";
import React, { useCallback } from "react";
import { ThemeProvider } from "@emotion/react";
import { ChevronDown } from "lucide-react";
import { appTheme } from "@/styles/themes/appTheme";
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
  TimeLineFilterInlineNote,
  TimeLineFilterInputGrid,
  TimeLineTimeWithToggle,
  TimeLineAmPmToggle,
  TimeLineAmPmOption,
  TimeLineFilterButtonGrid,
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

  const getTimePart = useCallback((dt: string) => (dt ? (dt.split(" ")[1] || "00:00:00") : "00:00:00"), []);
  const getMeridiem = useCallback((timePart: string) => {
    const h = parseInt(timePart.split(":")[0] || "0", 10);
    return h < 12 ? "AM" : "PM";
  }, []);

  const setMeridiem = useCallback(
    (isStart: boolean, meridiem: "AM" | "PM") => {
      const currentDateTime = isStart ? startDateTime : endDateTime;
      const datePart = currentDateTime
        ? currentDateTime.split(" ")[0]
        : new Date().toLocaleDateString("en-GB");
      const timePart = getTimePart(currentDateTime);
      const [hStr, m = "00", s = "00"] = timePart.split(":");
      let h = Math.min(23, Math.max(0, parseInt(hStr || "0", 10)));

      if (meridiem === "AM") {
        if (h === 12) h = 0; // 12 AM -> 00
        else if (h > 12) h -= 12;
      } else {
        if (h < 12) h += 12; // PM
      }

      const hh = String(h).padStart(2, "0");
      const newDateTime = `${datePart} ${hh}:${m}:${s}`;
      if (isStart) onStartDateTimeChange(newDateTime);
      else onEndDateTimeChange(newDateTime);
    },
    [startDateTime, endDateTime, onStartDateTimeChange, onEndDateTimeChange, getTimePart],
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
    <ThemeProvider theme={appTheme}>
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
              <div>
                <TimeLineFilterLabel>
  Start Date & Time
  <TimeLineFilterInlineNote>(Maximum time range: 5 minutes)</TimeLineFilterInlineNote>
</TimeLineFilterLabel>
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
                  <TimeLineTimeWithToggle>
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
                    <TimeLineAmPmToggle onClick={handleInputInteraction as any}>
                      {(() => {
                        const mer = getMeridiem(getTimePart(startDateTime));
                        return (
                          <>
                            <TimeLineAmPmOption
                              active={mer === "AM"}
                              onClick={(e) => {
                                e.stopPropagation();
                                setMeridiem(true, "AM");
                              }}
                            >
                              AM
                            </TimeLineAmPmOption>
                            <TimeLineAmPmOption
                              active={mer === "PM"}
                              onClick={(e) => {
                                e.stopPropagation();
                                setMeridiem(true, "PM");
                              }}
                            >
                              PM
                            </TimeLineAmPmOption>
                          </>
                        );
                      })()}
                    </TimeLineAmPmToggle>
                  </TimeLineTimeWithToggle>
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
                  <TimeLineTimeWithToggle>
                    <TimeLineInput
                      type="time"
                      step="1"
                      value={
                        endDateTime ? endDateTime.split(" ")[1] || "00:00:00" : ""
                      }
                      onClick={handleInputInteraction}
                      onChange={(e) => handleTimeChange(e, false)}
                    />
                    <TimeLineAmPmToggle onClick={handleInputInteraction as any}>
                      {(() => {
                        const mer = getMeridiem(getTimePart(endDateTime));
                        return (
                          <>
                            <TimeLineAmPmOption
                              active={mer === "AM"}
                              onClick={(e) => {
                                e.stopPropagation();
                                setMeridiem(false, "AM");
                              }}
                            >
                              AM
                            </TimeLineAmPmOption>
                            <TimeLineAmPmOption
                              active={mer === "PM"}
                              onClick={(e) => {
                                e.stopPropagation();
                                setMeridiem(false, "PM");
                              }}
                            >
                              PM
                            </TimeLineAmPmOption>
                          </>
                        );
                      })()}
                    </TimeLineAmPmToggle>
                  </TimeLineTimeWithToggle>
                </TimeLineFilterInputGrid>
              </div>
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
    </ThemeProvider>
  );
};

export default TimelineFilter;
