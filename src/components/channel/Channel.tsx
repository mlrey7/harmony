"use client";

import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import ChannelMessage from "./ChannelMessage";
import { z } from "zod";
import { PrismaMessageValidator } from "@/lib/validators/message";
import { useIntersection } from "@mantine/hooks";
import { useEffect } from "react";
import { createClient } from "@/utils/supabase/client";

const Channel = ({ channel_id }: { channel_id: string }) => {
  const queryClient = useQueryClient();
  const client = createClient();

  useEffect(() => {
    const realtimeChannel = client.channel(channel_id);

    realtimeChannel
      .on("broadcast", { event: "new_message" }, (payload) => {
        console.log("Receive new message event", payload);

        queryClient.invalidateQueries({
          queryKey: ["infinite", "channel", channel_id],
        });
      })
      .subscribe((status) => {
        console.log("REALTIME STATUS: ", status);
      });

    return () => {
      realtimeChannel && client.removeChannel(realtimeChannel);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [channel_id]);

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
      return z.array(PrismaMessageValidator).parse(await data.json());
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

  useEffect(() => {
    if (entry?.isIntersecting && hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [entry, fetchNextPage, hasNextPage, isFetching]);

  return (
    <ul className="flex h-full flex-col-reverse overflow-y-auto">
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
