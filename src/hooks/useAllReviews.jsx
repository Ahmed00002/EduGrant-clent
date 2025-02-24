import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useAllReviews = () => {
  const axiosSecure = useAxiosSecure();

  const { data: reviews = [], refetch } = useQuery({
    queryKey: ["userReviews"],
    queryFn: async () => {
      console.log("Query Key:", ["allReviews"]);
      const res = await axiosSecure.get(`reviews`);
      console.log(res.data);
      return res.data;
    },
  });
  console.log(reviews);
  return { reviews, refetch };
};

export default useAllReviews;
