import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useManageApplications = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: applications = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["allApplications"],
    queryFn: async () => {
      const res = await axiosSecure.get(`applications`);
      return res.data;
    },
  });

  return { applications, refetch, isLoading };
};

export default useManageApplications;
