import { REALTIME_EVENTS, TAKE_MESSAGE } from "@/constants";
import { apiClient } from "@/lib/apiClient";
import { queryKeys } from "@/lib/queryKeys";
import { PrismaMessageValidator } from "@/lib/validators/message";
import { createClient } from "@/utils/supabase/client";
import { useIntersection } from "@mantine/hooks";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { z } from "zod";

const useInfiniteMessages = (channel_id: string) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const client = createClient();
    const realtimeChannel = client.channel(channel_id);

    realtimeChannel
      .on("broadcast", { event: REALTIME_EVENTS.NEW_MESSAGE }, (payload) => {
        console.log("Receive new message event", payload);

        queryClient.invalidateQueries({
          queryKey: queryKeys.channelInfiniteMessages(channel_id),
        });
      })
      .subscribe((status) => {
        console.log("REALTIME STATUS: ", status);
      });

    return () => {
      realtimeChannel && client.removeChannel(realtimeChannel);
    };
  }, [channel_id, queryClient]);

  const { ref: lastElementRef, entry } = useIntersection({
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
    queryKey: queryKeys.channelInfiniteMessages(channel_id),
    queryFn: async ({ pageParam }) => {
      const query = `/channel/${channel_id}/messages?limit=${TAKE_MESSAGE}&page=${pageParam}`;
      const data = await apiClient.get(query);
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

  return {
    lastElementRef,
    messages,
    isFetchingNextPage,
    isFetching,
    isPending,
  };
};

export default useInfiniteMessages;
