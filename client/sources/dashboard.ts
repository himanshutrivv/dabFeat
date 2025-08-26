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
  // Log the request for debugging
  console.log("🚀 srGetDashboardTableData called with:", {
    bussId,
    filterData: filterData ? JSON.stringify(filterData, null, 2) : null,
  });

  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  // Mock data for demonstration
  return {
    status: true,
    code: 200,
    respMessage: "Success",
    tableData: [
      {
        id: "1",
        pgName: "Razorpay",
        status: "Success",
        date: "2024-01-15 10:30:45",
        amount: "$250.00",
      },
      {
        id: "2",
        pgName: "Jmpay",
        status: "Pending",
        date: "2024-01-15 11:20:12",
        amount: "$180.50",
      },
      {
        id: "3",
        pgName: "Innoviti",
        status: "Failed",
        date: "2024-01-15 12:05:33",
        amount: "$95.75",
      },
      {
        id: "4",
        pgName: "Razorpay",
        status: "Success",
        date: "2024-01-15 13:45:21",
        amount: "$420.25",
      },
      {
        id: "5",
        pgName: "Jmpay",
        status: "Success",
        date: "2024-01-15 14:15:08",
        amount: "$310.00",
      },
      {
        id: "6",
        pgName: "Innoviti",
        status: "Pending",
        date: "2024-01-15 15:30:55",
        amount: "$155.80",
      },
    ],
    columnData: {
      id: {
        label: "Transaction ID",
        filterable: false,
        searchable: true,
        hidden: false,
      },
      pgName: {
        label: "PG Name",
        filterable: true,
        searchable: true,
        hidden: false,
        filerValues: "Razorpay,Jmpay,Innoviti",
      },
      status: {
        label: "Status",
        filterable: true,
        searchable: false,
        hidden: false,
        filerValues: "Success,Pending,Failed",
      },
      date: {
        label: "Date & Time",
        filterable: false,
        searchable: false,
        hidden: false,
      },
      amount: {
        label: "Amount",
        filterable: false,
        searchable: true,
        hidden: false,
      },
    },
  };
};
