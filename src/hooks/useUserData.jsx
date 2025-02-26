import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useUserData = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: userData = [], refetch } = useQuery({
    queryKey: ["userData", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`users/data/${user?.email}`);
      return res.data;
    },
  });

  return { userData, refetch };
};

export default useUserData;
