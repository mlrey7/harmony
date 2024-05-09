"use client";
import { Bell, Hash, Pin, Users } from "lucide-react";
import React from "react";

const ChannelHeader = ({ channelTitle }: { channelTitle: string }) => {
  return (
    <div className="fixed left-[312px] right-0 top-0 z-50 flex items-center justify-between bg-background px-4 py-3 shadow-lg">
      <div className="flex items-center text-sm">
        <Hash className="mr-2 h-6 w-6 text-foreground1" />
        {channelTitle}
      </div>
      <div className="flex gap-4">
        <button className="h-6 w-6 text-foreground3 hover:text-gray-300">
          <Bell />
        </button>
        <button className="h-6 w-6 text-foreground3 hover:text-gray-300">
          <Pin />
        </button>
        <button className="h-6 w-6 text-foreground3 hover:text-gray-300">
          <Users />
        </button>
      </div>
    </div>
  );
};

export default ChannelHeader;
