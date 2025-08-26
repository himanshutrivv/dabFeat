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
  EmptyState,
  EmptyIcon,
  EmptyTitle,
  EmptyDescription,
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
                      <TableCell
                        key={column.key}
                        onClick={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          onCellClick(row[column.key] || "");
                        }}
                        style={{ cursor: "pointer" }}
                        title={`Click to copy: ${cellValue}`}
                      >
                        {cellValue}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableScrollContainer>

        {data.length === 0 && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "60px 24px",
              textAlign: "center",
            }}
          >
            <div style={{ color: "hsl(var(--muted-foreground))", marginBottom: 16 }}>
              <Database size={48} />
            </div>
            <div style={{ fontSize: 18, fontWeight: 600, color: "hsl(var(--foreground))", marginBottom: 8 }}>
              No transactions found
            </div>
            <div style={{ fontSize: 14, color: "hsl(var(--muted-foreground))" }}>
              Try adjusting your search criteria or filters
            </div>
          </div>
        )}
      </TableWrapper>
    </TableContainer>
  );
};

export default DashboardTable;
