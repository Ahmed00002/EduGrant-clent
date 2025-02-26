import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useAllReviews = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: reviews = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["userReviews"],
    queryFn: async () => {
      const res = await axiosSecure.get(`reviews`);
      return res.data;
    },
  });
  console.log(reviews);
  return { reviews, refetch, isLoading };
};

export default useAllReviews;
