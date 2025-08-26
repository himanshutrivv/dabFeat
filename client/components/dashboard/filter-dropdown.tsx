"use client";
import React from "react";
import { ChevronDown } from "lucide-react";
import {
  FilterDropdownFilterGroup as FilterGroup,
  FilterDropdownSelectContainer as SelectContainer,
  FilterDropdownSelectTrigger as SelectTrigger,
  FilterDropdownSelectValue as SelectValue,
  FilterDropdownSelectContent as SelectContent,
  SelectItemsContainer,
  FilterDropdownSelectItem as SelectItem
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
  return (
    <FilterGroup>
      <SelectContainer data-dropdown-container>
        <SelectTrigger
          onClick={(e) => {
            e.stopPropagation();
            onToggle(columnKey);
          }}
        >
          <SelectValue>
            {selectedValues.length === 0
              ? `All ${label}`
              : `${selectedValues.length} selected`}
          </SelectValue>
          <ChevronDown size={16} />
        </SelectTrigger>

        {isOpen && (
          <SelectContent>
            <SelectItemsContainer>
              <SelectItem
                onClick={(e) => {
                  e.stopPropagation();
                  onFilterChange(columnKey, "all");
                }}
                selected={selectedValues.length === 0}
              >
                All {label}
              </SelectItem>

              {options.map((option) => {
                const isSelected = selectedValues.includes(option);
                return (
                  <SelectItem
                    key={option}
                    onClick={(e) => {
                      e.stopPropagation();
                      onFilterChange(columnKey, option);
                    }}
                    selected={isSelected}
                  >
                    {option}
                  </SelectItem>
                );
              })}
            </SelectItemsContainer>
          </SelectContent>
        )}
      </SelectContainer>
    </FilterGroup>
  );
};

export default FilterDropdown;
