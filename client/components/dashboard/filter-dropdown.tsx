"use client";
import React from "react";
import { ChevronDown } from "lucide-react";
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
  return (
    <FilterDropdownFilterGroup>
      <FilterDropdownSelectContainer data-dropdown-container>
        <FilterDropdownSelectTrigger
          onClick={(e) => {
            e.stopPropagation();
            onToggle(columnKey);
          }}
        >
          <FilterDropdownSelectValue>
            {selectedValues.length === 0
              ? `All ${label}`
              : `${selectedValues.length} selected`}
          </FilterDropdownSelectValue>
          <ChevronDown size={16} />
        </FilterDropdownSelectTrigger>

        {isOpen && (
          <FilterDropdownSelectContent className="filter-content">
            <SelectItemsContainer>
              <FilterDropdownSelectItem
                onClick={(e) => {
                  e.stopPropagation();
                  onFilterChange(columnKey, "all");
                }}
                selected={selectedValues.length === 0}
              >
                All {label}
              </FilterDropdownSelectItem>

              {options.map((option) => {
                const isSelected = selectedValues.includes(option);
                return (
                  <FilterDropdownSelectItem
                    key={option}
                    onClick={(e) => {
                      e.stopPropagation();
                      onFilterChange(columnKey, option);
                    }}
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
  );
};

export default FilterDropdown;
