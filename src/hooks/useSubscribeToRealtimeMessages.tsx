import { queryKeys } from "@/lib/queryKeys";
import { createClient } from "@/utils/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

const useSubscribeToRealtimeMessages = (channel_id: string) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const client = createClient();
    const realtimeChannel = client.channel(channel_id);

    realtimeChannel
      .on("broadcast", { event: "new_message" }, (payload) => {
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

  return { queryClient };
};

export default useSubscribeToRealtimeMessages;
