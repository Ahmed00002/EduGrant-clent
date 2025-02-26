import { Input } from "@/components/ui/input";
import ReviewsRow from "@/components/ui/ReviewsTableRow";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import useCustomToast from "@/hooks/useCustomToast";
import useUserReviews from "@/hooks/useUserReviews";
import Swal from "sweetalert2";

const Reviews = () => {
  const { userReview, refetch } = useUserReviews();
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
        axiosSecure.delete(`reviews/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            customToast(
              "Review Deleted!",
              "Your review has been deleted successfully"
            );
            refetch();
          }
        });
      }
    });
  };

  const updateRating = (data, reviewId) => {
    axiosSecure.patch(`/reviews/${reviewId}`, data).then((res) => {
      if (res.data.modifiedCount > 0) {
        customToast("Updated!", "Your rating has been updated successfully");
        refetch();
      }
    });
    console.log(data, reviewId);
  };
  return (
    <>
      <section className=" bg-white rounded-lg p-6 font-inter">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold font-railway">My Reviews</h1>
          <form>
            <Input
              className="border-none focus:border-none"
              type="search"
              placeholder="search"
            />
          </form>
        </div>

        {/* reviews data */}
        <Table className="mt-6">
          <TableHeader>
            <TableRow>
              <TableHead className="font-thin">Scholarship Name</TableHead>
              <TableHead className="font-thin">University</TableHead>
              <TableHead className="font-thin">Comments</TableHead>
              <TableHead className="font-thin">Date</TableHead>
              <TableHead className="font-thin">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {userReview.map((review) => {
              return (
                <ReviewsRow
                  handleDeleteReview={handleDeleteReview}
                  updateRating={updateRating}
                  scholarship={review}
                  key={review._id}
                />
              );
            })}
          </TableBody>
        </Table>
        {userReview.length === 0 && (
          <p className="text-center mt-6 text-gray-400 font-medium font-inter">
            No Review Found
          </p>
        )}
      </section>
    </>
  );
};

export default Reviews;
