import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useTopScholarships = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: topScholarships = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["topScholarships"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/scholarships/top`);
      return res.data;
    },
  });
  return { topScholarships, refetch, isLoading };
};

export default useTopScholarships;
