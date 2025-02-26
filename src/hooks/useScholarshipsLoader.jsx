import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useScholarshipsLoader = (search) => {
  const axiosSecure = useAxiosSecure();

  const {
    data: scholarships = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["scholarships", search],
    queryFn: async () => {
      const res = await axiosSecure.get(`scholarships`, {
        params: search ? { search } : {},
      });
      return res.data;
    },
  });

  return { scholarships, refetch, isLoading };
};

export default useScholarshipsLoader;
