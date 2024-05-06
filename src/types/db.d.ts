import { channel, channel_group, server, server_member } from "@prisma/client";

export type ExtendedServer = server & {
  channel_groups: Array<
    channel_group & {
      channels: Array<channel>;
    }
  >;
};

export type ExtendedServerWithChannels = server & {
  channel_groups: Array<
    channel_group & {
      channels: Array<channel>;
    }
  >;
  server_members: Array<server_member>;
};

export type ExtendedChannelGroup = channel_group & {
  channels: Array<channel>;
};
