// Mock dashboard data source
export interface DashboardResponse {
  status: boolean;
  code: number;
  respMessage: string;
  tableData: Array<{ [key: string]: string | null }>;
  columnData: {
    [key: string]: {
      label: string;
      filterable: boolean;
      searchable: boolean;
      hidden: boolean;
      filerValues?: string;
    };
  };
}

export const srGetDashboardTableData = async ({
  bussId,
  filterData,
}: {
  bussId: string;
  filterData: any;
}): Promise<DashboardResponse> => {
  // Mock data for demonstration
  return {
    status: true,
    code: 200,
    respMessage: "Success",
    tableData: [
      { id: "1", name: "Sample Item 1", status: "Active", date: "2024-01-01" },
      {
        id: "2",
        name: "Sample Item 2",
        status: "Inactive",
        date: "2024-01-02",
      },
    ],
    columnData: {
      id: { label: "ID", filterable: false, searchable: true, hidden: false },
      name: {
        label: "Name",
        filterable: true,
        searchable: true,
        hidden: false,
        filerValues: "Sample Item 1,Sample Item 2",
      },
      status: {
        label: "Status",
        filterable: true,
        searchable: false,
        hidden: false,
        filerValues: "Active,Inactive",
      },
      date: {
        label: "Date",
        filterable: false,
        searchable: false,
        hidden: false,
      },
    },
  };
};
