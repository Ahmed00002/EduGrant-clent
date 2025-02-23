import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useAverageRating = (id) => {
  const axiosSecure = useAxiosSecure();
  const { data: ratings, refetch } = useQuery({
    queryKey: ["averageRatings", id],
    enabled: !!id,
    queryFn: async () => {
      const res = await axiosSecure.get(`scholarships/${id}/average-rating`);
      console.log(res.data);
      return res.data;
    },
  });
  console.log(ratings);
  return { ratings, refetch };
};

export default useAverageRating;
