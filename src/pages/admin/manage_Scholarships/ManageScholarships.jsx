import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Swal from "sweetalert2";
import useScholarshipsLoader from "@/hooks/useScholarshipsLoader";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import ScholarshipTRow from "./ScholarshipTRow";
import useCustomToast from "@/hooks/useCustomToast";
const Applications = () => {
  const axiosSecure = useAxiosSecure();
  const customToast = useCustomToast();
  const { scholarships, refetch } = useScholarshipsLoader();

  // Handle application deletion
  const handleDelete = (id, scholarshipName) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`scholarships/${id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              customToast("Deleted", `${scholarshipName} deleted successfully`);
            }
            refetch();
          })
          .catch((e) => {
            console.log(e);
            customToast("Opps!!", `${scholarshipName} Failed to delete`);
          });
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
              <TableHead className="font-thin">Scholarship name</TableHead>
              <TableHead className="font-thin">University Name</TableHead>
              <TableHead className="font-thin">Subject Category</TableHead>
              <TableHead className="font-thin">Degree</TableHead>
              <TableHead className="font-thin">Application Fees</TableHead>
              <TableHead className="font-thin">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {scholarships.map((scholarship) => (
              <ScholarshipTRow
                key={scholarship}
                scholarshipData={scholarship}
                handleDelete={handleDelete}
              />
            ))}
          </TableBody>
        </Table>
      </section>
    </>
  );
};

export default Applications;
