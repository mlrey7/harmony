import MemberList from "@/components/MemberList";
import ServerNav from "@/components/serverNav/ServerNav";
import React from "react";

const Layout = async ({
  children,
  params: { server_id },
}: {
  children: React.ReactNode;
  params: { server_id: string };
}) => {
  return (
    <div className="flex">
      <ServerNav serverId={server_id} />
      {children}
      <MemberList />
    </div>
  );
};

export default Layout;
