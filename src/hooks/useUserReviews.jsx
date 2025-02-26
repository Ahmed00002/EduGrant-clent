import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useUserReviews = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: userReview = [], refetch } = useQuery({
    queryKey: ["userReviews"],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`scholarships/reviews/${user?.email}`);
      return res.data;
    },
  });
  return { userReview, refetch };
};

export default useUserReviews;
