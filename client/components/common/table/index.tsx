import React, { useState, useMemo, ReactNode, useCallback } from "react";
import { ThemeProvider } from "@emotion/react";
import { appTheme as theme } from "@/styles/themes";

import {
  CopyToast,
  EllipsisSpan,
  PageInfo,
  PaginationButton,
  PaginationContainer,
  ScrollableContainer,
  StyledTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from "./style";

// Types
export interface TableColumn {
  key: string;
  label: ReactNode;
  width?: string;
  minWidth?: string;
}

export interface TableProps {
  columns: TableColumn[];
  data: Record<string, any>[];
  pageSize?: number;
  onPageChange?: (page: number) => void;
  showPagination?: boolean;
  onCellClick?: (
    value: any,
    rowData: Record<string, any>,
    columnKey: string
  ) => void;
  minHeight?: string;
}

const extractTextContent = (content: ReactNode): string => {
  if (typeof content === "string" || typeof content === "number") {
    return String(content);
  }
  if (React.isValidElement(content)) {
    return extractTextContent(content.props.children);
  }
  if (Array.isArray(content)) {
    return content.map(extractTextContent).join(" ");
  }
  return "";
};

// Table Component
export const Table: React.FC<TableProps> = ({
  columns,
  data,
  pageSize = 10,
  onPageChange,
  showPagination = true,
  onCellClick,
  minHeight = "450px",
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showCopyToast, setShowCopyToast] = useState(false);
  const [copySuccess, setCopySuccess] = useState(true);

  // Calculate pagination only if showPagination is true
  const shouldPaginate = showPagination && pageSize > 0;
  const totalPages = shouldPaginate ? Math.ceil(data.length / pageSize) : 1;
  const startIndex = shouldPaginate ? (currentPage - 1) * pageSize : 0;
  const endIndex = shouldPaginate ? startIndex + pageSize : data.length;
  const currentData = data.slice(startIndex, endIndex);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    onPageChange?.(page);
  };

  // Handle cell click and copy to clipboard
  const handleCellClick = useCallback(
    async (
      value: any,
      rowData: Record<string, any>,
      columnKey: string,
      event: React.MouseEvent
    ) => {
      // Call custom onCellClick handler if provided
      onCellClick?.(value, rowData, columnKey);

      // Extract text content and copy to clipboard
      const textContent = extractTextContent(value);
      if (textContent.trim()) {
        // Enhanced fallback function that works in all environments
        const fallbackCopyTextToClipboard = (text: string): boolean => {
          const textArea = document.createElement("textarea");
          textArea.value = text;

          // Avoid scrolling to bottom
          textArea.style.top = "0";
          textArea.style.left = "0";
          textArea.style.position = "fixed";
          textArea.style.opacity = "0";
          textArea.style.pointerEvents = "none";
          textArea.style.zIndex = "-1";

          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select();

          let successful = false;
          try {
            successful = document.execCommand("copy");
          } catch (err) {
            console.error("Fallback copy command failed:", err);
          }

          document.body.removeChild(textArea);
          return successful;
        };

        // Check if modern clipboard API is available and permitted
        const canUseClipboardAPI = () => {
          return (
            navigator.clipboard &&
            window.isSecureContext &&
            typeof navigator.clipboard.writeText === "function"
          );
        };

        let copySuccessful = false;

        // Try modern clipboard API first
        if (canUseClipboardAPI()) {
          try {
            await navigator.clipboard.writeText(textContent);
            copySuccessful = true;
          } catch (err) {
            console.warn("Modern clipboard API failed, using fallback:", err);
            copySuccessful = fallbackCopyTextToClipboard(textContent);
          }
        } else {
          // Use fallback immediately if modern API is not available
          copySuccessful = fallbackCopyTextToClipboard(textContent);
        }

        // Show appropriate toast message
        setCopySuccess(copySuccessful);
        setShowCopyToast(true);
        setTimeout(() => setShowCopyToast(false), 2000);

        if (!copySuccessful) {
          console.error("All clipboard copy methods failed");
        }
      }
    },
    [onCellClick]
  );

  // Generate page numbers to display
  const getPageNumbers = useMemo(() => {
    if (!shouldPaginate || totalPages <= 1) return [];

    const pageNumbers: number[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push(-1); // Ellipsis
        pageNumbers.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pageNumbers.push(1);
        pageNumbers.push(-1); // Ellipsis
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        pageNumbers.push(1);
        pageNumbers.push(-1); // Ellipsis
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push(-2); // Ellipsis
        pageNumbers.push(totalPages);
      }
    }

    return pageNumbers;
  }, [currentPage, totalPages, shouldPaginate]);

  return (
    <ThemeProvider theme={theme}>
      <TableContainer>
        <ScrollableContainer minHeight={minHeight}>
          <StyledTable>
            <TableHeader>
              <tr>
                {columns.map((column) => (
                  <TableHeaderCell
                    key={column.key}
                    width={column.width}
                    minWidth={column.minWidth}
                  >
                    {column.label}
                  </TableHeaderCell>
                ))}
              </tr>
            </TableHeader>
            <TableBody>
              {currentData.map((row, index) => (
                <TableRow key={index} isEven={index % 2 === 0}>
                  {columns.map((column) => {
                    const cellValue = row[column.key];
                    const hasTextContent = Boolean(
                      extractTextContent(cellValue).trim()
                    );

                    return (
                      <TableCell
                        key={`${index}-${column.key}`}
                        isClickable={hasTextContent}
                        onClick={
                          hasTextContent
                            ? (e) =>
                                handleCellClick(cellValue, row, column.key, e)
                            : undefined
                        }
                        title={
                          hasTextContent
                            ? "Click to copy to clipboard"
                            : undefined
                        }
                      >
                        {cellValue}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </StyledTable>
        </ScrollableContainer>

        {shouldPaginate && totalPages > 1 && (
          <PaginationContainer>
            <PaginationButton
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </PaginationButton>

            {getPageNumbers.map((pageNum, index) => {
              if (pageNum === -1 || pageNum === -2) {
                return (
                  <EllipsisSpan key={`ellipsis-${index}`}>...</EllipsisSpan>
                );
              }

              return (
                <PaginationButton
                  key={pageNum}
                  isActive={pageNum === currentPage}
                  onClick={() => handlePageChange(pageNum)}
                >
                  {pageNum}
                </PaginationButton>
              );
            })}

            <PaginationButton
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </PaginationButton>

            <PageInfo>
              Page {currentPage} of {totalPages} ({data.length} total items)
            </PageInfo>
          </PaginationContainer>
        )}
      </TableContainer>

      <CopyToast show={showCopyToast}>
        {copySuccess
          ? "✓ Copied to clipboard!"
          : "⚠ Copy failed - try selecting text manually"}
      </CopyToast>
    </ThemeProvider>
  );
};

export default Table;
