import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useManageApplications = () => {
  const axiosSecure = useAxiosSecure();

  const { data: applications = [], refetch } = useQuery({
    queryKey: ["allApplications"],
    queryFn: async () => {
      const res = await axiosSecure.get(`applications`);
      console.log(res.data);
      return res.data;
    },
  });

  return { applications, refetch };
};

export default useManageApplications;
