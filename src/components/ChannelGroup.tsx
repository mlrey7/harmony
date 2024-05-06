"use client";

import { cn } from "@/lib/utils";
import { ChevronDown, Hash, Plus } from "lucide-react";
import { useState } from "react";
import { buttonVariants } from "./ui/button";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

const sampleChannels = [
  {
    id: "12312312",
    title: "general",
  },
  {
    id: "13432",
    title: "welcome",
  },
  {
    id: "1325672",
    title: "rules",
  },
  {
    id: "18977",
    title: "announcements",
  },
];

const ChannelGroup = ({ serverId }: { serverId: string }) => {
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
        <ChevronDown className="text-foreground1 mr-1 h-3 w-3 transition-transform group-hover/header:text-gray-300 group-[.collapsed]:-rotate-90" />
        <p className="text-foreground1 text-xs font-semibold uppercase group-hover/header:text-gray-300">
          text channels
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
      {...sampleChannels.map((channel) => (
        <li key={channel.id}>
          <Link
            className={cn([
              buttonVariants({
                variant: "ghost",
                className:
                  "text-foreground1 h-min w-full px-3 py-1.5 hover:text-gray-300 group-[.collapsed]:hidden",
              }),
              ,
              {
                "bg-gray-700 text-white group-[.collapsed]:flex":
                  channel.id === currentChannelId,
              },
            ])}
            href={`/channels/${serverId}/${channel.id}`}
          >
            <Hash className="text-foreground1 mr-1 h-5 w-5" />
            {channel.title}
            <div className="flex-1" />
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default ChannelGroup;
