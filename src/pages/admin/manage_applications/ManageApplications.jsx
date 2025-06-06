import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useCustomToast from "@/hooks/useCustomToast";
import ApplicationTRow from "./ApplicationTRow";
import useManageApplications from "@/hooks/useManageApplications";
import { useState } from "react";
import TopLoader from "@/components/shared/loader/TopLoader";
import TableSkeleton from "@/components/ui/TableSkeleton";
import SetPageTitle from "@/components/shared/SetPageTitle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";

const ManageApplications = () => {
  const [updating, setUpdating] = useState(false);
  const axiosSecure = useAxiosSecure();
  const customToast = useCustomToast();
  const { applications, refetch, isLoading } = useManageApplications();

  // update application status
  const handleUpdateStatus = (status, id) => {
    Swal.fire({
      title: "Alert",
      text: "Are you sure to update this application status",
      // icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#004aad",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Update",
    }).then((result) => {
      if (result.isConfirmed) {
        setUpdating(true);
        axiosSecure
          .patch(`/applications/${id}`, { status })
          .then((res) => {
            if (res.data.modifiedCount > 0) {
              setTimeout(() => {
                const timer = setTimeout(() => {
                  refetch();
                  setUpdating(false);
                  customToast(
                    "Successful..!",
                    `Application status updated to ${status}`
                  );
                }, 1000);

                return () => clearTimeout(timer);
              }, 1000);
            } else {
              setUpdating(false);
            }
          })
          .catch(() => {
            setTimeout(() => {
              const timer = setTimeout(() => {
                setUpdating(false);
              }, 2000);

              return () => clearTimeout(timer); // Cleanup to avoid memory leaks
            }, 2000);
            customToast(
              "Opps!",
              `Something went wrong while updating Application status to ${status}`
            );
          });
      }
    });
  };

  return (
    <>
      <SetPageTitle title={"Manage Applications"} />
      <section className=" bg-white rounded-lg p-6 font-inter">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold font-railway">All Applications</h1>
        </div>

        {/* applications data */}
        <Table className="mt-6">
          <TableHeader>
            <TableRow>
              <TableHead className="font-thin">Scholarship name</TableHead>
              <TableHead className="font-thin">University Name</TableHead>
              <TableHead className="font-thin">Degree</TableHead>
              <TableHead className="font-thin">Scholarship Category</TableHead>
              <TableHead className="font-thin">Application Status</TableHead>
              <TableHead className="font-thin">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applications.map((application) => (
              <ApplicationTRow
                key={application._id}
                applications={application}
                handleUpdateStatus={handleUpdateStatus}
              />
            ))}
            {isLoading && (
              <>
                <TableSkeleton />
                <TableSkeleton />
                <TableSkeleton />
                <TableSkeleton />
              </>
            )}
          </TableBody>
        </Table>

        {applications.length === 0 && !isLoading && (
          <p className="text-center mt-6 text-gray-400 font-medium font-inter">
            No Application Found
          </p>
        )}

        {updating && <TopLoader status={"Updating..."} />}
      </section>
    </>
  );
};

export default ManageApplications;
