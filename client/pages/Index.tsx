import React from "react";
import TaskManagementDashboard from "../components/dashboard";
import { ThemeProvider } from "@/styles/ThemeControllerProvider";

export default function Index() {
  return (
    <ThemeProvider>
      <TaskManagementDashboard />
    </ThemeProvider>
  );
}
