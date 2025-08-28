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

  // If filters are applied, return filtered data based on the new format
  if (filterData && filterData.length > 0) {
    console.log("Returning filtered data based on:", filterData);
    
    // Mock filtered data response
    return {
      status: true,
      code: 200,
      respMessage: "Data Fetched Successfully",
      tableData: [
        {
          STATUS: "Delivered",
          ORDER_REF_NUM: "ORD1001",
          PAYMENT_MODE: "Credit Card"
        },
        {
          STATUS: "Pending",
          ORDER_REF_NUM: "ORD1002",
          PAYMENT_MODE: "UPI"
        },
        {
          STATUS: "Cancelled",
          ORDER_REF_NUM: "ORD1003",
          PAYMENT_MODE: "Net Banking"
        },
        {
          STATUS: "Shipped",
          ORDER_REF_NUM: "ORD1004",
          PAYMENT_MODE: "Cash on Delivery"
        },
        {
          STATUS: "Delivered",
          ORDER_REF_NUM: "ORD1005",
          PAYMENT_MODE: "Credit Card"
        },
        {
          STATUS: "Returned",
          ORDER_REF_NUM: "ORD1006",
          PAYMENT_MODE: "UPI"
        },
        {
          STATUS: "Pending",
          ORDER_REF_NUM: "ORD1007",
          PAYMENT_MODE: "Debit Card"
        },
        {
          STATUS: "Shipped",
          ORDER_REF_NUM: "ORD1008",
          PAYMENT_MODE: "Net Banking"
        },
        {
          STATUS: "Delivered",
          ORDER_REF_NUM: "ORD1009",
          PAYMENT_MODE: "Cash on Delivery"
        },
        {
          STATUS: "Cancelled",
          ORDER_REF_NUM: "ORD1010",
          PAYMENT_MODE: "Credit Card"
        }
      ],
      columnData: {
        ORDER_REF_NUM: {
          label: "order ref num",
          filterable: true,
          searchable: false,
          hidden: false
        },
        PAYMENT_MODE: {
          label: "Payment Mode",
          filterable: true,
          searchable: false,
          hidden: false,
          filerValues: "UPI,Credit Card,Debit Card,Net Banking,Cash on Delivery"
        },
        STATUS: {
          label: "Status",
          filterable: true,
          searchable: false,
          hidden: false,
          filerValues: "Delivered,Pending,Cancelled,Shipped,Returned"
        }
      }
    };
  }

  // Default data for initial load
  return {
    status: true,
    code: 200,
    respMessage: "Success",
    tableData: [
      {
        id: "1",
        pgName: "Razorpay",
        status: "success",
        date: "2024-01-15 10:30:45",
        amount: "$250.00",
        region: "us-west",
        username: "admin_user",
      },
      {
        id: "2",
        pgName: "Jmpay",
        status: "pending",
        date: "2024-01-15 11:20:12",
        amount: "$180.50",
        region: "eu-central",
        username: "test_user",
      },
      {
        id: "3",
        pgName: "Innoviti",
        status: "failed",
        date: "2024-01-15 12:05:33",
        amount: "$95.75",
        region: "us-west",
        username: "admin",
      },
      {
        id: "4",
        pgName: "Razorpay",
        status: "success",
        date: "2024-01-15 13:45:21",
        amount: "$420.25",
        region: "eu-central",
        username: "power_user",
      },
      {
        id: "5",
        pgName: "Jmpay",
        status: "success",
        date: "2024-01-15 14:15:08",
        amount: "$310.00",
        region: "ap-south",
        username: "admin_test",
      },
      {
        id: "6",
        pgName: "Innoviti",
        status: "pending",
        date: "2024-01-15 15:30:55",
        amount: "$155.80",
        region: "us-west",
        username: "guest_user",
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
        filerValues: "success,pending,failed",
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
      region: {
        label: "Region",
        filterable: true,
        searchable: true,
        hidden: false,
        filerValues: "us-west,eu-central,ap-south",
      },
      username: {
        label: "Username",
        filterable: true,
        searchable: true,
        hidden: false,
        filerValues:
          "admin_user,test_user,admin,power_user,admin_test,guest_user",
      },
    },
  };
};
