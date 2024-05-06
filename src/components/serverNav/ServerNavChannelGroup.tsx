"use client";

import { cn } from "@/lib/utils";
import { ChevronDown, Hash, Plus } from "lucide-react";
import { useState } from "react";
import { buttonVariants } from "../ui/button";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { ExtendedChannelGroup } from "@/types/db";

const ServerNavChannelGroup = ({
  serverId,
  channelGroup,
}: {
  serverId: string;
  channelGroup: ExtendedChannelGroup;
}) => {
  const [collapsed, setCollapsed] = useState(false);
  const currentChannelId = useSelectedLayoutSegment();

  return (
    <ul
      className={cn("group mt-4 flex flex-col gap-0.5", {
        collapsed: collapsed,
      })}
    >
      <li
        className="group/header mb-1 flex cursor-pointer items-center"
        onClick={() => {
          setCollapsed((prev) => !prev);
        }}
      >
        <ChevronDown className="mr-1 h-3 w-3 text-foreground1 transition-transform group-hover/header:text-gray-300 group-[.collapsed]:-rotate-90" />
        <p className="text-xs font-semibold uppercase text-foreground1 group-hover/header:text-gray-300">
          {channelGroup.title}
        </p>
        <div className="flex-1" />
        <button
          className="text-foreground1 hover:text-gray-300"
          onClick={(e: React.MouseEvent) => {
            e.stopPropagation();
          }}
        >
          <Plus className="h-4 w-4" />
        </button>
      </li>
      {...channelGroup.channels.map((channel) => (
        <li key={channel.id}>
          <Link
            className={cn([
              buttonVariants({
                variant: "ghost",
                className:
                  "h-min w-full px-3 py-1.5 text-foreground1 hover:text-gray-300 group-[.collapsed]:hidden",
              }),
              ,
              {
                "bg-gray-700 text-white hover:bg-gray-700 hover:text-white group-[.collapsed]:flex":
                  channel.id === currentChannelId,
              },
            ])}
            href={`/channels/${serverId}/${channel.id}`}
          >
            <Hash className="mr-1.5 h-5 w-5 text-foreground1" />
            {channel.title}
            <div className="flex-1" />
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default ServerNavChannelGroup;
