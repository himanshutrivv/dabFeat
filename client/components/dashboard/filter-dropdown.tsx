"use client";
import React from "react";
import { ThemeProvider } from "@emotion/react";
import { ChevronDown } from "lucide-react";
import { appTheme } from "@/styles/themes/appTheme";
import {
  FilterDropdownFilterGroup,
  FilterDropdownSelectContainer,
  FilterDropdownSelectTrigger,
  FilterDropdownSelectValue,
  FilterDropdownSelectContent,
  SelectItemsContainer,
  FilterDropdownSelectItem,
} from "./style";

interface FilterDropdownProps {
  label: string;
  columnKey: string;
  options: string[];
  selectedValues: string[];
  isOpen: boolean;
  onToggle: (columnKey: string) => void;
  onFilterChange: (columnKey: string, value: string) => void;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({
  label,
  columnKey,
  options,
  selectedValues,
  isOpen,
  onToggle,
  onFilterChange,
}) => {
  const handleContainerClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleTriggerClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggle(columnKey);
  };

  const handleItemClick = (e: React.MouseEvent, value: string) => {
    e.stopPropagation();
    onFilterChange(columnKey, value);
  };

  const handleContentMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <ThemeProvider theme={appTheme}>
      <FilterDropdownFilterGroup>
        <FilterDropdownSelectContainer
          data-dropdown-container="true"
          onClick={handleContainerClick}
        >
          <FilterDropdownSelectTrigger onClick={handleTriggerClick}>
            <FilterDropdownSelectValue>
              {selectedValues.length === 0
                ? `All ${label}`
                : `${selectedValues.length} selected`}
            </FilterDropdownSelectValue>
            <ChevronDown size={16} />
          </FilterDropdownSelectTrigger>

          {isOpen && (
            <FilterDropdownSelectContent
              className="filter-content"
              onMouseDown={handleContentMouseDown}
              onClick={handleContainerClick}
            >
              <SelectItemsContainer>
                <FilterDropdownSelectItem
                  onClick={(e) => handleItemClick(e, "all")}
                  selected={selectedValues.length === 0}
                >
                  All {label}
                </FilterDropdownSelectItem>

                {options.map((option) => {
                  const isSelected = selectedValues.includes(option);
                  return (
                    <FilterDropdownSelectItem
                      key={option}
                      onClick={(e) => handleItemClick(e, option)}
                      selected={isSelected}
                    >
                      {option}
                    </FilterDropdownSelectItem>
                  );
                })}
              </SelectItemsContainer>
            </FilterDropdownSelectContent>
          )}
        </FilterDropdownSelectContainer>
      </FilterDropdownFilterGroup>
    </ThemeProvider>
  );
};

export default FilterDropdown;
