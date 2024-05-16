import { db } from "@/lib/db";
import { queryKeys } from "@/lib/queryKeys";
import { getAuthUser } from "@/utils/auth";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { redirect } from "next/navigation";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 60,
      },
    },
  });

  const authUser = await getAuthUser();

  if (!authUser) return redirect("/");

  await queryClient.prefetchQuery({
    queryKey: queryKeys.currentUser(),
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
