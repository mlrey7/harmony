import Channel from "@/components/channel/Channel";
import ChannelHeader from "@/components/channel/ChannelHeader";
import ChannelInput from "@/components/channel/ChannelInput";
import { db } from "@/lib/db";
import React from "react";

const Page = async ({
  params: { channel_id },
}: {
  params: { server_id: string; channel_id: string };
}) => {
  const channel = await db.channel.findUnique({
    where: {
      id: channel_id,
    },
  });

  if (!channel) return null;

  return (
    <div className="ml-60 flex h-screen w-full flex-col">
      <ChannelHeader channelTitle={channel.title} />
      <div className="mb-16 mt-12 h-full">
        <Channel channel_id={channel_id} />
      </div>
      <ChannelInput />
    </div>
  );
};

export default Page;
