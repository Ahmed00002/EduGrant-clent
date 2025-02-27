import AdminReviewCard from "@/components/adminReviewCard";
import SetPageTitle from "@/components/shared/SetPageTitle";
import { Input } from "@/components/ui/input";
import ReviewSkelton from "@/components/ui/ReviewSkelton";
import useAllReviews from "@/hooks/useAllReviews";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import useCustomToast from "@/hooks/useCustomToast";
import Swal from "sweetalert2";

const AllReviews = () => {
  const { reviews, refetch, isLoading } = useAllReviews();
  const axiosSecure = useAxiosSecure();
  const customToast = useCustomToast();

  const handleDeleteReview = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/reviews/${id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              customToast(
                "Review Deleted!",
                "Review has been deleted successfully"
              );
              refetch();
            }
          })
          .catch(() => {
            customToast("Opps!", "Something went wrong");
            refetch();
          });
      }
    });
  };

  return (
    <>
      <section className=" bg-white rounded-lg p-6 font-inter">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold font-railway">All Reviews</h1>
          <form>
            <Input
              className="border-none focus:border-none"
              type="search"
              placeholder="search"
            />
          </form>
        </div>

        {/* applications data */}
        <div className="grid grid-cols-1 md:grid-cols-3  mt-12 gap-3">
          {reviews.map((review) => (
            <AdminReviewCard
              key={review._id}
              review={{ review, handleDeleteReview }}
            />
          ))}
          {isLoading && (
            <>
              <ReviewSkelton />
              <ReviewSkelton />
              <ReviewSkelton />
            </>
          )}
        </div>

        <p className="text-center text-gray-400">
          {!isLoading && reviews.length === 0 && "No Review Found"}
        </p>
      </section>
      <SetPageTitle title={"All Reviews"} />
    </>
  );
};

export default AllReviews;
