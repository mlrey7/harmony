import Sidebar from "@/components/Sidebar";
import React from "react";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="ml-16 min-h-screen w-full pl-2">{children}</main>
    </div>
  );
};

export default Layout;
