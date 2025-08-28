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

// Your static data with corrections for search functionality
export const getDashboardData = {
  status: true,
  code: 200,
  respMessage: "Data Fetched Successfully",
  tableData: [
    {
      STATUS: "Delivered",
      ORDER_REF_NUM: "ORD1001",
      PAYMENT_MODE: "Credit Card",
    },
    {
      STATUS: "Pending",
      ORDER_REF_NUM: "ORD1002",
      PAYMENT_MODE: "UPI",
    },
    {
      STATUS: "Cancelled",
      ORDER_REF_NUM: "ORD1003",
      PAYMENT_MODE: "Net Banking",
    },
    {
      STATUS: "Shipped",
      ORDER_REF_NUM: "ORD1004",
      PAYMENT_MODE: "Cash on Delivery",
    },
    {
      STATUS: "Delivered",
      ORDER_REF_NUM: "ORD1005",
      PAYMENT_MODE: "Credit Card",
    },
    {
      STATUS: "Returned",
      ORDER_REF_NUM: "ORD1006",
      PAYMENT_MODE: "UPI",
    },
    {
      STATUS: "Pending",
      ORDER_REF_NUM: "ORD1007",
      PAYMENT_MODE: "Debit Card",
    },
    {
      STATUS: "Shipped",
      ORDER_REF_NUM: "ORD1008",
      PAYMENT_MODE: "Net Banking",
    },
    {
      STATUS: "Delivered",
      ORDER_REF_NUM: "ORD1009",
      PAYMENT_MODE: "Cash on Delivery",
    },
    {
      STATUS: "Cancelled",
      ORDER_REF_NUM: "ORD1010",
      PAYMENT_MODE: "Credit Card",
    },
  ],
  columnData: {
    ORDER_REF_NUM: {
      label: "Order Ref Num",
      filterable: true,
      searchable: true, // Changed from false to true
      hidden: false,
    },
    PAYMENT_MODE: {
      label: "Payment Mode",
      filterable: true,
      searchable: true, // Changed from false to true
      hidden: false,
      filerValues: "UPI,Credit Card,Debit Card,Net Banking,Cash on Delivery", // Added missing values
    },
    STATUS: {
      label: "Status",
      filterable: true,
      searchable: true, // Changed from false to true
      hidden: false,
      filerValues: "Delivered,Pending,Cancelled,Shipped,Returned", // Added missing filerValues
    },
  },
};

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

  // If filters are applied, return your data with filtering applied
  if (filterData && filterData.length > 0) {
    console.log("Returning filtered data based on:", filterData);

    // Return your static data (you can add filtering logic here if needed)
    return getDashboardData;
  }

  // Default data for initial load - use your static data
  return getDashboardData;
};

export const srGetMonitoringData = async ({
  bussId,
  timeRange,
}: {
  bussId: string;
  timeRange?: {
    startTime: string;
    endTime: string;
  };
}): Promise<DashboardResponse> => {
  // Log the request for debugging
  console.log("🚀 srGetMonitoringData called with:", {
    bussId,
    timeRange: timeRange ? JSON.stringify(timeRange, null, 2) : null,
  });

  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  // Return fresh monitoring data (same structure for now)
  return getDashboardData;
};
