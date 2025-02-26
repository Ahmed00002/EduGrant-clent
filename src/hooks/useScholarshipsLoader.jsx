import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useScholarshipsLoader = () => {
  const axiosSecure = useAxiosSecure();

  const { data: scholarships = [], refetch } = useQuery({
    queryKey: ["scholarships"],
    queryFn: async () => {
      const res = await axiosSecure.get("scholarships");
      return res.data;
    },
  });

  return { scholarships, refetch };
};

export default useScholarshipsLoader;
