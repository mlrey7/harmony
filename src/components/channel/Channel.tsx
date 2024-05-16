"use client";

import ChannelMessage from "./ChannelMessage";
import useInfiniteMessages from "@/hooks/useInfiniteMessages";
import useSubscribeToRealtimeMessages from "@/hooks/useSubscribeToRealtimeMessages";

const Channel = ({ channel_id }: { channel_id: string }) => {
  useSubscribeToRealtimeMessages(channel_id);
  const { lastElementRef, messages } = useInfiniteMessages(channel_id);

  return (
    <ul className="mt-12 flex h-full flex-col-reverse overflow-y-auto">
      {...messages.map((message, index) => {
        return (
          <li
            key={message.id}
            ref={index === messages.length - 1 ? lastElementRef : null}
          >
            <ChannelMessage message={message} />
          </li>
        );
      })}
    </ul>
  );
};

export default Channel;
