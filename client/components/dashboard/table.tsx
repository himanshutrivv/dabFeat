"use client";
import React, { useCallback } from "react";
import { Table } from "../common/table";
import { toast } from "sonner";

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
}

const DashboardTable: React.FC<DashboardTableProps> = ({
  data,
  columnData,
}) => {
  const copyToClipboard = useCallback((text: string) => {
    // Use setTimeout to ensure toast is called outside of render cycle
    setTimeout(() => {
      try {
        const textToCopy = text || "";
        // Create a temporary textarea element
        const textarea = document.createElement("textarea");
        textarea.value = textToCopy;
        textarea.style.position = "fixed";
        textarea.style.left = "-9999px";
        textarea.style.top = "-9999px";
        document.body.appendChild(textarea);
        textarea.select();
        const success = document.execCommand("copy");
        document.body.removeChild(textarea);

        // Show success message
        if (success) {
          toast.success("Text copied!");
        } else {
          toast.error("Failed to copy text");
        }
      } catch (error) {
        console.error("Copy failed:", error);
        toast.error("Failed to copy text");
      }
    }, 0);
  }, []);

  return (
    <Table
      columns={Object.entries(columnData || {})
        .filter(([, columnInfo]) => columnInfo && !columnInfo.hidden)
        .map(([key, columnInfo]) => ({
          key,
          label: columnInfo.label,
          minWidth: "150px",
        }))}
      data={data}
      showPagination={true}
      pageSize={7}
      onCellClick={(value, rowData, columnKey) => {
        const textValue =
          typeof value === "string" ? value : String(value || "");
        copyToClipboard(textValue);
      }}
      minHeight="450px"
    />
  );
};

export default DashboardTable;
