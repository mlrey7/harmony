import { Button } from "@/components/ui/button";
import { Bell, Hash, Pin, Users } from "lucide-react";
import React from "react";

const Page = ({
  params: { server_id, channel_id },
}: {
  params: { server_id: string; channel_id: string };
}) => {
  return (
    <div className="ml-60 flex flex-col">
      <div className="fixed left-[312px] right-0 top-0 flex items-center justify-between px-4 py-3 shadow-lg">
        <div className="flex items-center">
          <Hash className="mr-2 h-6 w-6 text-foreground1" />
          general
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
      <div className="mt-12">{channel_id}</div>
    </div>
  );
};

export default Page;
