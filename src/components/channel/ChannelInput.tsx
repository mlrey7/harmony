/* eslint-disable jsx-a11y/alt-text */
"use client";
import { CirclePlus, Gift, SmilePlus, Sticker, Image } from "lucide-react";
import React, { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import useSendChannelMessage from "@/hooks/useSendChannelMessage";

const ChannelInput = ({
  channelTitle,
  channelId,
}: {
  channelTitle: string;
  channelId: string;
}) => {
  const [textInput, setTextInput] = useState("");

  const { sendMessage } = useSendChannelMessage({
    channelId,
    onMutation: () => setTextInput(""),
  });

  return (
    <div className="left-[312px] z-50  bg-background px-4 pb-5">
      <div className="mr-4 flex w-full gap-4 rounded-lg bg-background4 py-1 pr-4 has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-blue-500">
        <button className="ml-4 h-6 w-6 py-1.5 text-foreground3 hover:text-gray-300">
          <CirclePlus />
        </button>
        <TextareaAutosize
          className="flex h-9 w-full resize-none rounded-md bg-background4 py-2 pr-3 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium  placeholder:text-foreground1/50 focus-visible:outline-none focus-visible:placeholder:text-foreground3 disabled:cursor-not-allowed disabled:opacity-50"
          placeholder={`Message #${channelTitle}`}
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              sendMessage(textInput);
            }
          }}
        ></TextareaAutosize>
        <button className="h-6 w-6 py-1.5 text-foreground3 hover:text-gray-300">
          <Gift />
        </button>
        <button className="h-6 w-6 py-1.5 text-foreground3 hover:text-gray-300">
          <Image />
        </button>
        <button className="h-6 w-6 py-1.5 text-foreground3 hover:text-gray-300">
          <Sticker />
        </button>
        <button className="h-6 w-6 py-1.5 text-foreground3 hover:text-gray-300">
          <SmilePlus />
        </button>
      </div>
    </div>
  );
};

export default ChannelInput;
