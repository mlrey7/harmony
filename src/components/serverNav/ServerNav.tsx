"use client";

import { TextSearch } from "lucide-react";
import { Button } from "../ui/button";
import { useSelectedLayoutSegment } from "next/navigation";
import { Separator } from "../ui/separator";
import ServerNavChannelGroup from "./ServerNavChannelGroup";
import ServerNavHeader from "./ServerNavHeader";
import ServerNavUser from "./ServerNavUser";

const ServerNav = ({ serverId }: { serverId: string }) => {
  const channelId = useSelectedLayoutSegment();

  return (
    <div className="fixed top-0 flex min-h-screen w-60 flex-col bg-background2">
      <ServerNavHeader />
      <div className="flex-1 px-2 py-2">
        <Button
          variant={"ghost"}
          className="text-foreground1 w-full px-2 hover:text-gray-300"
        >
          <TextSearch className="mr-2 h-6 w-6" />
          <p className="text-base">Browse Channels</p>
          <div className="flex-1" />
        </Button>
        <Separator className="mt-2 w-full self-center bg-gray-700" />
        <ServerNavChannelGroup serverId={serverId} />
      </div>
      <ServerNavUser />
    </div>
  );
};

export default ServerNav;
