"use client";

import { Atom, Compass, Plus } from "lucide-react";
import SidebarButton from "./SidebarButton";
import { Separator } from "./ui/separator";
import { useRouter, useSelectedLayoutSegment } from "next/navigation";
import { ExtendedServer } from "@/types/db";
import { stringToInitials } from "@/lib/utils";

const Sidebar = ({
  servers,
}: {
  userId: string;
  servers: Array<ExtendedServer>;
}) => {
  const segment = useSelectedLayoutSegment();
  const router = useRouter();

  return (
    <nav className="fixed left-0 top-0 flex min-h-screen flex-col gap-2 bg-gray-900 px-3 pt-3">
      <SidebarButton
        tooltip="Direct Messages"
        active={segment === "me"}
        onClick={() => {
          router.push("/channels/me");
        }}
      >
        <Atom className="h-6 w-6" />
      </SidebarButton>
      <Separator className="w-8 self-center bg-gray-600" />
      {...servers.map((server) => (
        <SidebarButton
          tooltip={server.title}
          active={segment === server.id}
          onClick={() => {
            router.push(
              `/channels/${server.id}/${server.channel_groups.at(0)?.channels.at(0)?.id}`,
            );
          }}
          key={server.id}
        >
          {stringToInitials(server.title)}
        </SidebarButton>
      ))}
      <SidebarButton tooltip="Add a Server" variant={"action"}>
        <Plus className="h-6 w-6" />
      </SidebarButton>
      <SidebarButton tooltip="Explore Discoverable Servers" variant={"action"}>
        <Compass className="h-6 w-6" />
      </SidebarButton>
    </nav>
  );
};

export default Sidebar;
