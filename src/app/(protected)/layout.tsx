import { db } from "@/lib/db";
import { createClient } from "@/utils/supabase/server";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { redirect } from "next/navigation";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const supabase = createClient();

  const queryClient = new QueryClient();

  const {
    data: { user: authUser },
  } = await supabase.auth.getUser();

  if (!authUser) {
    return redirect("/");
  }

  await queryClient.prefetchQuery({
    queryKey: ["user", "current"],
    queryFn: async () => {
      const user = await db.user.findUnique({
        where: {
          id: authUser.id,
        },
      });

      return user;
    },
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div>{children}</div>
    </HydrationBoundary>
  );
};

export default Layout;
