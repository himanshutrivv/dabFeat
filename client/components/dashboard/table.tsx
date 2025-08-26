"use client";
import React from "react";
import {
  TableContainer,
  TableWrapper,
  TableScrollContainer,
  Table,
  TableHead,
  TableHeaderRow,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableCellClickableStyled,
  TableEmptyStateContainer,
  TableEmptyStateIcon,
  TableEmptyStateTitle,
  TableEmptyStateDescription,
} from "./style";
import { Database } from "lucide-react";

export interface TableDataRow {
  [key: string]: string | null;
}

export interface ColumnMetadata {
  label: string;
  filterable: boolean;
  searchable: boolean;
  hidden: boolean;
  filerValues?: string;
}

interface DashboardTableProps {
  data: TableDataRow[];
  columnData: { [key: string]: ColumnMetadata };
  onCellClick: (text: string) => void;
}

const DashboardTable: React.FC<DashboardTableProps> = ({
  data,
  columnData,
  onCellClick,
}) => {
  const getVisibleColumns = () => {
    return Object.entries(columnData)
      .filter(([, columnInfo]) => columnInfo && !columnInfo.hidden)
      .map(([key, columnInfo]) => ({ key, ...columnInfo }));
  };

  const visibleColumns = getVisibleColumns();

  return (
    <TableContainer>
      <TableWrapper>
        <TableScrollContainer>
          <Table>
            <TableHead>
              <TableHeaderRow>
                {visibleColumns.map((column) => (
                  <TableHeader key={column.key}>{column.label}</TableHeader>
                ))}
              </TableHeaderRow>
            </TableHead>
            <TableBody>
              {data.map((row, index) => (
                <TableRow key={index}>
                  {visibleColumns.map((column) => {
                    const cellValue = row[column.key] || "-";
                    return (
                      <TableCellClickableStyled
                        key={column.key}
                        onClick={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          onCellClick(row[column.key] || "");
                        }}
                        title={`Click to copy: ${cellValue}`}
                      >
                        {cellValue}
                      </TableCellClickableStyled>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableScrollContainer>

        {data.length === 0 && (
          <TableEmptyStateContainer>
            <TableEmptyStateIcon>
              <Database size={48} />
            </TableEmptyStateIcon>
            <TableEmptyStateTitle>No transactions found</TableEmptyStateTitle>
            <TableEmptyStateDescription>
              Try adjusting your search criteria or filters
            </TableEmptyStateDescription>
          </TableEmptyStateContainer>
        )}
      </TableWrapper>
    </TableContainer>
  );
};

export default DashboardTable;
