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
import { useEffect, useState } from "react";

const Applications = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [applications, setApplications] = useState([]);
  const customToast = useCustomToast();

  useEffect(() => {
    if (user) {
      axiosSecure
        .get(`/applications?email=${user?.email}`)
        .then((res) => {
          setApplications(res.data);
        })
        .catch((e) => console.log(e));
    }
  }, [user?.email, axiosSecure, user]);

  // Add review
  const handleAddReview = (data, applicationId, scholarshipId) => {
    if (!data.rating) {
      customToast("Alert!", "Please select your rating");
      return;
    }
    if (!data.review) {
      customToast("Alert!", "Please explain your experience");
      return;
    }
    axiosSecure
      .post("/reviews", {
        email: user?.email,
        name: user?.displayName,
        userPhoto: user?.photoURL,
        review: data.review,
        rating: data.rating,
        scholarshipId: scholarshipId,
      })
      .then((res) => {
        console.log(res.data);
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
  return (
    <>
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
                key={application._id}
              />
            ))}
          </TableBody>
        </Table>
      </section>
    </>
  );
};

export default Applications;
