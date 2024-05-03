import MemberList from "@/components/MemberList";
import ServerNav from "@/components/ServerNav";
import React from "react";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex">
      <ServerNav />
      {children}
      <MemberList />
    </div>
  );
};

export default Layout;
