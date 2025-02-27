import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useAverageRating = (id) => {
  const axiosSecure = useAxiosSecure();
  const { data: ratings, refetch } = useQuery({
    queryKey: ["averageRatings", id],
    enabled: !!id,
    queryFn: async () => {
      const res = await axiosSecure.get(`/scholarships/${id}/average-rating`);
      return res.data;
    },
  });
  return { ratings, refetch };
};

export default useAverageRating;
