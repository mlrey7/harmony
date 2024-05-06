import MemberList from "@/components/MemberList";
import ServerNav from "@/components/serverNav/ServerNav";
import { db } from "@/lib/db";
import { getAuthUser } from "@/utils/auth";
import { redirect } from "next/navigation";
import React from "react";

const Layout = async ({
  children,
  params: { server_id },
}: {
  children: React.ReactNode;
  params: { server_id: string };
}) => {
  const authUser = await getAuthUser();

  if (!authUser) return redirect("/");

  const server = await db.server.findUnique({
    where: {
      id: server_id,
    },
    include: {
      channel_groups: {
        include: {
          channels: true,
        },
      },
      server_members: true,
    },
  });

  if (!server) return redirect("/");

  return (
    <div className="flex">
      <ServerNav serverId={server_id} server={server} />
      {children}
      <MemberList />
    </div>
  );
};

export default Layout;
