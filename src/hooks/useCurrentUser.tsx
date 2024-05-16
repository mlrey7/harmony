import { apiClient } from "@/lib/apiClient";
import { useQuery } from "@tanstack/react-query";
import { user } from "@prisma/client";
import { queryKeys } from "@/lib/queryKeys";

const useCurrentUser = () => {
  const { data: user } = useQuery({
    queryKey: queryKeys.currentUser(),
    queryFn: async () => {
      const data = await apiClient.get(`/user/current`);
      return (await data.json()) as user;
    },
    staleTime: 3600000,
  });

  return user;
};

export default useCurrentUser;
