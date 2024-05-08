/* eslint-disable jsx-a11y/alt-text */
import Channel from "@/components/channel/Channel";
import {
  Bell,
  CirclePlus,
  Gift,
  Hash,
  Image,
  Pin,
  SmilePlus,
  Sticker,
  Users,
} from "lucide-react";
import React from "react";

const Page = ({
  params: { server_id, channel_id },
}: {
  params: { server_id: string; channel_id: string };
}) => {
  return (
    <div className="ml-60 flex h-screen w-full flex-col">
      <div className="fixed left-[312px] right-0 top-0 z-50 flex items-center justify-between bg-background px-4 py-3 shadow-lg">
        <div className="flex items-center text-sm">
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
      <div className="mb-16 mt-12 h-full">
        <Channel channel_id={channel_id} />
      </div>
      <div className="fixed bottom-0 left-[312px] right-0 z-50 bg-background px-4 pb-5">
        <div className="bg-background4 mr-4 flex h-11 w-full items-center gap-4 rounded-lg pr-4 has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-blue-500">
          <button className="ml-4 h-6 w-6 text-foreground3 hover:text-gray-300">
            <CirclePlus />
          </button>
          <input
            className="bg-background4 flex h-9 w-full rounded-md py-2 pr-3 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-foreground1/50  focus-visible:outline-none focus-visible:placeholder:text-foreground3 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Message #general"
          ></input>
          <button className="h-6 w-6 text-foreground3 hover:text-gray-300">
            <Gift />
          </button>
          <button className="h-6 w-6 text-foreground3 hover:text-gray-300">
            <Image />
          </button>
          <button className="h-6 w-6 text-foreground3 hover:text-gray-300">
            <Sticker />
          </button>
          <button className="h-6 w-6 text-foreground3 hover:text-gray-300">
            <SmilePlus />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
