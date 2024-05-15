import Channel from "@/components/channel/Channel";
import ChannelHeader from "@/components/channel/ChannelHeader";
import ChannelInput from "@/components/channel/ChannelInput";
import { db } from "@/lib/db";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import React from "react";

const Page = async ({
  params: { channel_id },
}: {
  params: { server_id: string; channel_id: string };
}) => {
  const supabase = createClient();
  const channel = await db.channel.findUnique({
    where: {
      id: channel_id,
    },
  });

  if (!channel) return null;

  const {
    data: { user: authUser },
  } = await supabase.auth.getUser();

  if (!authUser) {
    return redirect("/");
  }

  return (
    <div className="ml-60 flex h-screen w-full flex-col overflow-y-hidden">
      <ChannelHeader channelTitle={channel.title} />
      <Channel channel_id={channel_id} />
      <ChannelInput
        channelTitle={channel.title}
        channelId={channel_id}
        authUserId={authUser.id}
      />
    </div>
  );
};

export default Page;
