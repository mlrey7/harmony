import { db } from "@/lib/db";
import { cache } from "react";

export const getServer = cache(async ({ server_id }: { server_id: string }) => {
  return await db.server.findUnique({
    where: {
      id: server_id,
    },
    include: {
      channel_groups: {
        include: {
          channels: true,
        },
      },
      server_members: true,
    },
  });
});
