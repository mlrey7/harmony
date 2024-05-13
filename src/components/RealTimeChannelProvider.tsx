"use client";

import { createClient } from "@/utils/supabase/client";
import { RealtimeChannel } from "@supabase/supabase-js";
import React, { createContext, useContext, useState } from "react";

export const RealTimeChannelContext = createContext<RealtimeChannel | null>(
  null,
);

const RealTimeChannelProvider = ({
  children,
  channel_id,
}: {
  children: React.ReactNode;
  channel_id: string;
}) => {
  const realTimeChannel = createClient().channel(channel_id, {
    config: {
      broadcast: { self: true },
    },
  });

  return (
    <RealTimeChannelContext.Provider value={realTimeChannel}>
      {children}
    </RealTimeChannelContext.Provider>
  );
};

export const useRealTimeChannel = () => {
  const context = useContext(RealTimeChannelContext);

  if (!context) {
    throw new Error(
      "useRealTimeChannel must be used within a <RealTimeChannelProvider />",
    );
  }

  return context;
};

export default RealTimeChannelProvider;
