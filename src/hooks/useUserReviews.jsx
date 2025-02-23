import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useUserReviews = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  console.log(user);
  console.log(user?.email);

  const { data: userReview = [], refetch } = useQuery({
    queryKey: ["userReviews"],
    enabled: !!user?.email,
    queryFn: async () => {
      console.log("Query Key:", ["userReviews", user?.email]);
      const res = await axiosSecure.get(`reviews?email=${user?.email}`);
      console.log(res.data);
      return res.data;
    },
  });
  console.log(userReview);
  return { userReview, refetch };
};

export default useUserReviews;
