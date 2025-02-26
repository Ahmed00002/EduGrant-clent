import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useTopScholarships = () => {
  const axiosSecure = useAxiosSecure();
  const { data: topScholarships = [], refetch } = useQuery({
    queryKey: ["topScholarships"],
    queryFn: async () => {
      const res = await axiosSecure.get(`scholarships/top`);
      console.log(res.data);
      return res.data;
    },
  });
  console.log(topScholarships);
  return { topScholarships, refetch };
};

export default useTopScholarships;
