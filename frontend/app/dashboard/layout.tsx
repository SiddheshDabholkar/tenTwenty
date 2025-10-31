import Navbar from "@/components/dashboard/Navbar";
import SubNavbar from "@/components/dashboard/SubNavbar";
import { cn } from "@/lib/utils";
import React from "react";

type DashboardLayoutProps = React.FC<{
  children: React.ReactNode;
}>;

const DashboardLayout: DashboardLayoutProps = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col overflow-y-auto">
      <Navbar />
      <SubNavbar />
      <div className={cn("mx-auto px-2 container flex-col flex relative mt-4")}>
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
