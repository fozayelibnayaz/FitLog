"use client";

import { ToastContainer } from "react-toastify";
import { PlanProvider } from "@/context/PlanContext";

export default function Providers({ children }) {
  return (
    <PlanProvider>
      {children}
      <ToastContainer position="top-right" autoClose={2500} pauseOnHover theme="dark" />
    </PlanProvider>
  );
}