// ['channels', channelId, 'messages, 'infinite']

export const queryKeys = {
  channels: () => ["channels"],
  channel: (channelId: string) => [...queryKeys.channels(), channelId],
  channelInfiniteMessages: (channelId: string) => [
    ...queryKeys.channel(channelId),
    "messages",
    "infinite",
  ],
  users: () => ["users"],
  user: (userId: string) => [...queryKeys.users(), userId],
  currentUser: () => [...queryKeys.users(), "current"],
};
