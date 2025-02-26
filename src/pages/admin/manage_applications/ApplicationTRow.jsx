import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import {
  Book,
  ChevronDown,
  Eye,
  GraduationCap,
  GraduationCapIcon,
  MessageCircle,
  Phone,
  Triangle,
  University,
  XCircle,
} from "lucide-react";
import PropTypes from "prop-types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
// import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import useCustomToast from "@/hooks/useCustomToast";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useState } from "react";
import { FaAddressCard } from "react-icons/fa";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const ApplicationTRow = ({ applications, handleUpdateStatus }) => {
  const status = ["pending", "processing", "completed"];

  const {
    register: registerFeedback,
    handleSubmit: handleFeedbackSubmit,
    // formState: { errors },
    reset,
  } = useForm({
    defaultValues: applications,
  });

  const {
    _id,
    applicantNumber,
    applicantName,
    applicantAddress,
    applicantSscResult,
    applicantHscResult,
    scholarshipUniversity,
    scholarshipCategory,
    scholarshipSub,
    applicantGender,
    applicantDegree,
    applicantStudyGap,
    applicantPhoto,
    // applied_ScholarshipId,
    // applicantEmail,
    // applicant_Id,
    appliedDate,
    applicationStatus,
    feedback,
  } = applications;

  const [open, setOpen] = useState(false);

  const customToast = useCustomToast();

  const axiosSecure = useAxiosSecure();

  // Handle Form Submit (update scholarship data)
  const handleFeedback = async (data) => {
    try {
      const res = await axiosSecure.patch(`applications/${_id}`, {
        feedback: data.feedback,
      });
      if (res.data.modifiedCount > 0) {
        customToast("Successful!", "Scholarship Updated Successfully!");
        reset();
        setOpen(false);
      }
    } catch (error) {
      customToast("Opps!", "Failed to Update Scholarship!");
    }
  };

  return (
    <>
      <TableRow>
        <TableCell>{scholarshipUniversity}</TableCell>
        <TableCell>{scholarshipUniversity}</TableCell>
        <TableCell>{applicantDegree}</TableCell>
        <TableCell>{scholarshipCategory}</TableCell>
        <TableCell>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className={`px-[5px] py-[2px] rounded-full border-[1px] flex cursor-pointer  ${
                  applicationStatus === "pending" ||
                  applicationStatus === "processing"
                    ? "border-yellow-600 bg-yellow-100 text-yellow-600"
                    : applicationStatus === "completed"
                    ? "border-green-600 bg-green-100 text-green-600"
                    : "border-red-600 bg-red-100 text-red-600"
                }  text-center capitalize text-sm inline-block`}
              >
                <p className="text-xs capitalize flex items-center gap-[2px]">
                  {applicationStatus} <ChevronDown size={10} />
                </p>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {status.map((status) => (
                <DropdownMenuItem
                  className={"cursor-pointer"}
                  onClick={() => handleUpdateStatus(status, _id)}
                  key={status}
                >
                  {status}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
        <TableCell className="space-x-2">
          {/* details button with dialog */}
          <Dialog>
            <DialogTrigger asChild>
              <Button
                className={
                  "bg-green-500 cursor-pointer transition-all duration-300 hover:bg-green-600"
                }
              >
                {" "}
                <Eye />{" "}
              </Button>
            </DialogTrigger>
            <DialogContent className={"max-h-[90vh] overflow-y-auto"}>
              <DialogTitle>Application Details</DialogTitle>
              <div className="flex gap-4 items-center">
                <img
                  src={applicantPhoto}
                  alt={applicantNumber}
                  className="w-16 h-16 rounded-full border"
                />
                <div>
                  <h3 className="text-lg font-semibold">
                    {applicantName || "No name"}
                  </h3>
                  <p className="text-sm text-gray-600 flex items-center gap-2">
                    <Phone size={16} /> {applicantNumber}
                  </p>
                  <p className="text-sm text-gray-600 flex items-center gap-2">
                    <FaAddressCard size={16} /> {applicantAddress}
                  </p>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <p className="text-sm flex items-center gap-2">
                  <Triangle size={16} />{" "}
                  <span className="font-bold">Gender:</span> {applicantGender}
                </p>
                <p className="text-sm flex items-center gap-2">
                  <GraduationCap size={16} />{" "}
                  <span className="font-bold">SSC Result:</span> GPA-
                  {applicantSscResult}
                </p>
                <p className="text-sm flex items-center gap-2">
                  <GraduationCap size={16} />{" "}
                  <span className="font-bold">HSC Result:</span> GPA-
                  {applicantHscResult}
                </p>
                <p className="text-sm flex items-center gap-2">
                  <Book size={16} /> <span className="font-bold">Subject:</span>{" "}
                  {scholarshipSub}
                </p>
                <p className="text-sm flex items-center gap-2">
                  <GraduationCapIcon size={16} />{" "}
                  <span className="font-bold">Degree:</span> {applicantDegree}
                </p>
                <p className="text-sm flex items-center gap-2">
                  <University size={16} />{" "}
                  <span className="font-bold">University:</span>{" "}
                  {scholarshipUniversity}
                </p>
                <p className="text-sm flex items-center gap-2">
                  <University size={16} />{" "}
                  <span className="font-bold">Study Gap:</span>{" "}
                  {applicantStudyGap}
                </p>
              </div>

              <Badge className="mt-2">Aplied At: {appliedDate}</Badge>
              {feedback}
            </DialogContent>
          </Dialog>

          {/* feedback button with dialog */}
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button
                className={
                  "bg-orange-500 cursor-pointer transition-all duration-300 hover:bg-orange-600"
                }
              >
                {" "}
                <MessageCircle />{" "}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Give Feedback</DialogTitle>
              </DialogHeader>
              <p className="text-sm text-gray-500">
                Provide feedback regarding this application.
              </p>
              <form onSubmit={handleFeedbackSubmit(handleFeedback)}>
                <div className="mt-4">
                  <label className="block font-medium mb-2">
                    Your Feedback:
                  </label>
                  <textarea
                    placeholder="Mention missing documents or required information..."
                    {...registerFeedback("feedback", { required: true })}
                    className="w-full"
                  />
                </div>

                <div className="flex justify-end gap-2 mt-4">
                  <Button variant="outline" onClick={() => setOpen(false)}>
                    Cancel
                  </Button>
                  <Button>Submit</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>

          {/* cancel button with dialog */}
          <Button
            className={
              "bg-red-500 cursor-pointer transition-all duration-300 hover:bg-red-600"
            }
            onClick={() => handleUpdateStatus("cancled", _id)}
          >
            {" "}
            <XCircle />{" "}
          </Button>
        </TableCell>
      </TableRow>
    </>
  );
};

export default ApplicationTRow;
ApplicationTRow.propTypes = {
  applications: PropTypes.object,
  handleDelete: PropTypes.func,
  handleUpdateStatus: PropTypes.func,
  handleFeedback: PropTypes.func,
};
