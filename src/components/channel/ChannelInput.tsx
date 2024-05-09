/* eslint-disable jsx-a11y/alt-text */
"use client";
import { CirclePlus, Gift, SmilePlus, Sticker, Image } from "lucide-react";
import React from "react";

const ChannelInput = () => {
  return (
    <div className="fixed bottom-0 left-[312px] right-0 z-50 bg-background px-4 pb-5">
      <div className="mr-4 flex h-11 w-full items-center gap-4 rounded-lg bg-background4 pr-4 has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-blue-500">
        <button className="ml-4 h-6 w-6 text-foreground3 hover:text-gray-300">
          <CirclePlus />
        </button>
        <input
          className="flex h-9 w-full rounded-md bg-background4 py-2 pr-3 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-foreground1/50  focus-visible:outline-none focus-visible:placeholder:text-foreground3 disabled:cursor-not-allowed disabled:opacity-50"
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
  );
};

export default ChannelInput;
