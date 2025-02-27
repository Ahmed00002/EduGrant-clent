import SetPageTitle from "@/components/shared/SetPageTitle";
import ApplicationTableRow from "@/components/ui/ApplicationTableRow";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import useCustomToast from "@/hooks/useCustomToast";
import useApplications from "@/hooks/userUserApplications";
import Swal from "sweetalert2";

const Applications = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { applications } = useApplications();
  const customToast = useCustomToast();

  // Add review
  const handleAddReview = (
    data,
    scholarshipId,
    scholarshipName,
    university_name
  ) => {
    if (!data.rating) {
      customToast("Alert!", "Please select your rating");
      return;
    }
    if (!data.review) {
      customToast("Alert!", "Please explain your experience");
      return;
    }
    axiosSecure
      .post("reviews", {
        email: user?.email,
        name: user?.displayName,
        userPhoto: user?.photoURL,
        review: data.review,
        rating: data.rating,
        scholarshipId: scholarshipId,
        scholarship_name: scholarshipName,
        university_name: university_name,
      })
      .then((res) => {
        if (res.data.insertedId) {
          customToast(
            "Thank You",
            "Your review added and thanks for your valuable review"
          );
        }

        if (res.data.isExist) {
          customToast("Hey!", "You have already reviewed on this scholarship");
        }
      });
  };

  const handleUpdate = (data, id) => {
    axiosSecure
      .patch(`users/applications/${id}`, data)
      .then((res) => {
        if (res.data.modifiedCount) {
          customToast("Successful", "Your application data updated.");
          // refetch
        }
      })
      .catch(() => {
        customToast("failed", "Your application data failed to update.");
      });
  };
  const handleCancel = (data, id) => {
    data.email = user?.email;
    console.log(data);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`users/applications/cancel/${id}`, data)
          .then((res) => {
            console.log(res.data);
            if (res.data.modifiedCount) {
              customToast("Alert", "You have canceled your application");
              // refetch
            }
          })
          .catch((e) => {
            console.log(e);
            customToast("failed", "Failed to cancel your application");
          });
      }
    });
  };
  return (
    <>
      <SetPageTitle title={"Applications"} />
      <section className=" bg-white rounded-lg p-6 font-inter">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold font-railway">My Applications</h1>
          <form>
            <Input
              className="border-none focus:border-none"
              type="search"
              placeholder="search"
            />
          </form>
        </div>

        {/* applications data */}
        <Table className="mt-6">
          <TableHeader>
            <TableRow>
              <TableHead className="font-thin">#SL</TableHead>
              <TableHead className="font-thin">University</TableHead>
              <TableHead className="font-thin">Feedback</TableHead>
              <TableHead className="font-thin">Subject</TableHead>
              <TableHead className="font-thin">Degree</TableHead>
              <TableHead className="font-thin">Fees</TableHead>
              <TableHead className="font-thin">Charge</TableHead>
              <TableHead className="font-thin">Status</TableHead>
              <TableHead className="font-thin">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applications.map((application) => (
              <ApplicationTableRow
                application={application}
                handleAddReview={handleAddReview}
                handleUpdate={handleUpdate}
                handleCancel={handleCancel}
                key={application._id}
              />
            ))}
          </TableBody>
        </Table>

        {applications.length === 0 && (
          <p className="text-center mt-6 text-gray-400 font-medium font-inter">
            No Applications Found
          </p>
        )}
      </section>
    </>
  );
};

export default Applications;
