/* eslint-disable jsx-a11y/alt-text */
"use client";
import { useMutation } from "@tanstack/react-query";
import { CirclePlus, Gift, SmilePlus, Sticker, Image } from "lucide-react";
import React, { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { createClient } from "@/utils/supabase/client";
import { CreateMessagePayloadType } from "@/lib/validators/message";

const ChannelInput = ({
  channelTitle,
  channelId,
}: {
  channelTitle: string;
  channelId: string;
}) => {
  const client = createClient();
  const [textInput, setTextInput] = useState("");

  const { mutate: sendMessage } = useMutation({
    mutationFn: async () => {
      const payload: CreateMessagePayloadType = {
        text_content: textInput,
        channel_id: channelId,
      };

      const data = await fetch("/api/message/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      return data;
    },
    onSuccess: () => {
      setTextInput("");

      client
        .channel(channelId, {
          config: {
            broadcast: { self: true },
          },
        })
        .send({
          type: "broadcast",
          event: "new_message",
          payload: { message: "invalidate queries" },
        });
    },
  });

  const onSendMessage = () => {
    sendMessage();
  };

  return (
    <div className="left-[312px] z-50 bg-background px-4 pb-5">
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
              onSendMessage();
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
