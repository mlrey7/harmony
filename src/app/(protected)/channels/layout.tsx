import Sidebar from "@/components/Sidebar";
import React from "react";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="ml-16 w-full min-h-screen">{children}</main>
    </div>
  );
};

export default Layout;
