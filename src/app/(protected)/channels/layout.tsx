import Sidebar from "@/components/Sidebar";
import { db } from "@/lib/db";
import { getAuthUser } from "@/utils/auth";
import { redirect } from "next/navigation";
import React from "react";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const authUser = await getAuthUser();

  if (!authUser) return redirect("/");

  const user = await db.user.findUnique({
    where: {
      id: authUser.id,
    },
    include: {
      server_memberships: {
        include: {
          server: {
            include: {
              channel_groups: {
                include: {
                  channels: true,
                },
              },
            },
          },
        },
      },
    },
  });

  if (!user) return redirect("/");

  const servers = user.server_memberships.map(
    (server_membership) => server_membership.server,
  );

  return (
    <div className="flex">
      <Sidebar userId={authUser.id} servers={servers} />
      <main className="ml-16 min-h-screen w-full pl-2">{children}</main>
    </div>
  );
};

export default Layout;
