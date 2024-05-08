"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import ChannelMessage from "./ChannelMessage";
import { z } from "zod";
import {
  PrismaMessageType,
  PrismaMessageValidator,
} from "@/lib/validators/message";
import { useIntersection } from "@mantine/hooks";
import { useEffect } from "react";

const Channel = ({ channel_id }: { channel_id: string }) => {
  const { ref, entry } = useIntersection({
    root: null,
    threshold: 1,
  });

  const {
    data,
    isFetchingNextPage,
    isPending,
    hasNextPage,
    isFetching,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["infinite", "channel", channel_id],
    queryFn: async ({ pageParam }) => {
      const query = `/api/channel/${channel_id}/messages?limit=5&page=${pageParam}`;
      const data = await fetch(query);
      // console.log(await data.json());
      return (await data.json()) as Array<PrismaMessageType>;
      // return z.array(PrismaMessageValidator).parse(await data.json());
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, _, lastPageParam) => {
      if (lastPage.length === 0) {
        return undefined;
      }
      return lastPageParam + 1;
    },
  });

  const messages = data?.pages.flat() ?? [];
  console.log(messages);
  useEffect(() => {
    if (entry?.isIntersecting && hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [entry, fetchNextPage, hasNextPage, isFetching]);

  return (
    <ul className="flex h-full flex-col-reverse">
      {...messages.map((message, index) => {
        return (
          <li key={message.id} ref={index === messages.length - 1 ? ref : null}>
            <ChannelMessage message={message} />
          </li>
        );
      })}
    </ul>
  );
};

export default Channel;
