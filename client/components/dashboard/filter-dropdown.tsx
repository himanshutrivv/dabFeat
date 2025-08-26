"use client";
/** @jsxImportSource @emotion/react */
import React from "react";
import { Filter, ChevronDown } from "lucide-react";
import {
  FilterGroup,
  SelectContainer,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItemsContainer,
  SelectItem,
  FilterDropdownSelectItemStyle,
} from "./styles";

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
                css={selectedValues.length === 0 ? FilterDropdownSelectItemStyle : undefined}
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
