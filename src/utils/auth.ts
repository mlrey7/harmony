import { cache } from "react";
import { createClient } from "./supabase/server";

export const getAuthUser = cache(async () => {
  const {
    data: { user },
  } = await createClient().auth.getUser();

  return user;
});
