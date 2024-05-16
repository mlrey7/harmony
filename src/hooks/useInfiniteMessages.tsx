import { apiClient } from "@/lib/apiClient";
import { queryKeys } from "@/lib/queryKeys";
import { PrismaMessageValidator } from "@/lib/validators/message";
import { useIntersection } from "@mantine/hooks";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { z } from "zod";

const useInfiniteMessages = (channel_id: string) => {
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
      const query = `/channel/${channel_id}/messages?limit=5&page=${pageParam}`;
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
