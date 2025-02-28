import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useApplications = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const {
    data: applications = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["applications", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/users/applications?email=${user?.email}`
      );
      return res.data;
    },
  });

  return { applications, refetch, isLoading };
};

export default useApplications;
