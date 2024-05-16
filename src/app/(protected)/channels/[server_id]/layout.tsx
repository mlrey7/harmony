import ServerNav from "@/components/serverNav/ServerNav";
import { getServer } from "@/controllers/serverController";
import { redirect } from "next/navigation";
import React from "react";

const Layout = async ({
  children,
  params: { server_id },
}: {
  children: React.ReactNode;
  params: { server_id: string };
}) => {
  const server = await getServer({ server_id });
  if (!server) return redirect("/");

  return (
    <div className="flex">
      <ServerNav serverId={server_id} server={server} />
      {children}
      {/* <MemberList /> */}
    </div>
  );
};

export default Layout;
