import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useUserLoader = (role) => {
  const axiosSecure = useAxiosSecure();
  const {
    data: users = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: role ? ["users", role] : ["users"],
    enabled: !!role,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?role=${role}`);
      return res.data;
    },
  });
  return { users, refetch, isLoading };
};

export default useUserLoader;
