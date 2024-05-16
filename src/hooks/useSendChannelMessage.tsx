import { REALTIME_EVENTS } from "@/constants";
import { apiClient } from "@/lib/apiClient";
import { queryKeys } from "@/lib/queryKeys";
import {
  CreateMessagePayloadType,
  PrismaMessageType,
} from "@/lib/validators/message";
import { createClient } from "@/utils/supabase/client";
import {
  useMutation,
  InfiniteData,
  useQueryClient,
} from "@tanstack/react-query";
import { v4 as uuidv4 } from "uuid";
import useCurrentUser from "./useCurrentUser";

const useSendChannelMessage = ({
  channelId,
  onMutation,
}: {
  channelId: string;
  onMutation: () => void;
}) => {
  const queryClient = useQueryClient();
  const client = createClient();
  const user = useCurrentUser();

  const { mutate } = useMutation({
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
      onMutation();

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

  const sendMessage = (textInput: string) => {
    mutate({ text_content: textInput, id: uuidv4() });
  };

  return { sendMessage };
};

export default useSendChannelMessage;
