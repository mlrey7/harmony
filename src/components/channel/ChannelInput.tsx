/* eslint-disable jsx-a11y/alt-text */
"use client";
import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { CirclePlus, Gift, SmilePlus, Sticker, Image } from "lucide-react";
import React, { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { createClient } from "@/utils/supabase/client";
import {
  CreateMessagePayloadType,
  PrismaMessageType,
} from "@/lib/validators/message";
import { apiClient } from "@/lib/apiClient";
import { v4 as uuidv4 } from "uuid";
import useCurrentUser from "@/hooks/useCurrentUser";
import { queryKeys } from "@/lib/queryKeys";
import { REALTIME_EVENTS } from "@/constants";

const ChannelInput = ({
  channelTitle,
  channelId,
}: {
  channelTitle: string;
  channelId: string;
}) => {
  const client = createClient();
  const [textInput, setTextInput] = useState("");
  const queryClient = useQueryClient();
  const user = useCurrentUser();

  const { mutate: sendMessage } = useMutation({
    mutationFn: async ({
      text_content,
      id,
    }: {
      text_content: string;
      id: string;
    }) => {
      const payload: CreateMessagePayloadType = {
        id,
        text_content,
        channel_id: channelId,
      };

      const data = await apiClient.post("/message/create", payload);

      return data;
    },
    onMutate: async ({
      text_content,
      id,
    }: {
      text_content: string;
      id: string;
    }) => {
      setTextInput("");

      await queryClient.cancelQueries({
        queryKey: queryKeys.channelInfiniteMessages(channelId),
      });
      const previousPostMetrics = queryClient.getQueryData(
        queryKeys.channelInfiniteMessages(channelId),
      );

      if (user) {
        queryClient.setQueryData(
          queryKeys.channelInfiniteMessages(channelId),
          (oldMessages: InfiniteData<Array<PrismaMessageType>>) => {
            const optimisticMessage: PrismaMessageType = {
              id,
              text_content,
              created_at: new Date(),
              updated_at: new Date(),
              image_content: [],
              reactions: [],
              author: {
                id: user.id,
                image: user.image,
                name: user.name,
                username: user.username,
              },
              reply_to_id: null,
            };

            const firstPage = [optimisticMessage, ...oldMessages.pages[0]];

            return {
              pages: oldMessages.pages.map((page, index) =>
                index === 0 ? firstPage : page,
              ),
              pageParams: oldMessages.pageParams,
            };
          },
        );
      }

      return { previousPostMetrics };
    },
    onError: (err, _, context) => {
      queryClient.setQueryData(
        queryKeys.channelInfiniteMessages(channelId),
        context?.previousPostMetrics,
      );

      console.error(err);

      return err;
    },
    onSettled: () => {
      client
        .channel(channelId, {
          config: {
            broadcast: { self: true },
          },
        })
        .send({
          type: "broadcast",
          event: REALTIME_EVENTS.NEW_MESSAGE,
          payload: { message: "invalidate queries" },
        });
    },
  });

  const onSendMessage = () => {
    sendMessage({ text_content: textInput, id: uuidv4() });
  };

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
