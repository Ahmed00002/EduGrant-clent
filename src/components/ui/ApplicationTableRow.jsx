import {
  Book,
  Edit2,
  Eye,
  GraduationCap,
  GraduationCapIcon,
  Pen,
  Phone,
  Star,
  Triangle,
  University,
  X,
} from "lucide-react";
import { TableCell, TableRow } from "./table";
import PropTypes from "prop-types";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "./label";
import { Input } from "./input";
import { useState } from "react";
import Rating from "../Rating";
import { useForm } from "react-hook-form";
import { Badge } from "./badge";
import { FaAddressCard } from "react-icons/fa";

const ApplicationTableRow = ({
  application,
  handleAddReview,
  handleUpdate,
}) => {
  const {
    _id,
    applicantNumber,
    applicantAddress,
    applicantSscResult,
    applicantHscResult,
    scholarshipUniversity,
    scholarshipCategory,
    scholarshipSub,
    applicantGender,
    applicantDegree,
    applicationStatus,
    applicantStudyGap,
    applicantPhoto,
    // applied_ScholarshipId,
    applicantEmail,
    // applicantId,
    applicantName,
    appliedData,
    feedback,
  } = application;

  const { register, handleSubmit } = useForm();
  const { register: registerUpdate, handleSubmit: handleSubmitOnUpdate } =
    useForm();
  const [rating, setRating] = useState(0);

  const {
    application_fees = "2000",
    service_charge = "200",
    subject_name = "Bangla",
    university_name = "Pabna University",
    scholarship_name,
    // _id: scholarshipId,
  } = application.scholarshipDetails;

  const handleReview = (data) => {
    data.rating = rating;
    handleAddReview(data, _id, scholarship_name, university_name);
  };

  const handleUpdateApplication = (data) => {
    handleUpdate(data, _id);
  };

  // handle cancel
  const hadleCancelApplication = () => {
    alert("clicked");
  };
  return (
    <TableRow className="py-2">
      <TableCell>1</TableCell>
      <TableCell>{university_name}</TableCell>
      <TableCell>{feedback || "--"}</TableCell>
      <TableCell>{subject_name}</TableCell>
      <TableCell>{applicantDegree}</TableCell>
      <TableCell>${application_fees}</TableCell>
      <TableCell>${service_charge}</TableCell>
      {/* application status */}
      <TableCell className="border-l">
        <div
          className={`px-[5px] py-[2px] rounded-full border-[1px] ${
            applicationStatus === "pending" ||
            applicationStatus === "processing"
              ? "border-yellow-600 bg-yellow-100 text-yellow-600"
              : applicationStatus === "completed"
              ? "border-green-600 bg-green-100 text-green-600"
              : "border-red-600 bg-red-100 text-red-600"
          }  text-center capitalize text-sm inline-block`}
        >
          <p className="text-xs capitalize">{applicationStatus}</p>
        </div>
      </TableCell>
      <TableCell className="flex gap-2 items-center border-l">
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

            <Badge className="mt-2">Aplied At: {appliedData}</Badge>
          </DialogContent>
        </Dialog>

        <Dialog>
          <DialogTrigger asChild>
            <Button
              className={
                "bg-yellow-500 cursor-pointer transition-all duration-300 hover:bg-yellow-600"
              }
            >
              <Edit2 />
            </Button>
          </DialogTrigger>
          <DialogContent className={"max-h-[90vh] overflow-y-auto"}>
            <DialogHeader>
              <DialogTitle>Edit Application</DialogTitle>
            </DialogHeader>

            <form
              onSubmit={handleSubmitOnUpdate(handleUpdateApplication)}
              className="space-y-4 p-2"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Name</Label>
                  <Input
                    type="text"
                    defaultValue={applicantName}
                    {...registerUpdate("applicantName")}
                  />
                </div>
                <div>
                  <Label>Number</Label>
                  <Input
                    type="number"
                    defaultValue={applicantNumber}
                    {...registerUpdate("applicantNumber")}
                  />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input
                    type="email"
                    defaultValue={applicantEmail}
                    disabled
                    {...registerUpdate("applicant_email")}
                  />
                </div>
                <div>
                  <Label>Address</Label>
                  <Input
                    type="text"
                    defaultValue={applicantAddress}
                    {...registerUpdate("applicantAddress")}
                  />
                </div>
                <div>
                  <Label>SSC Result</Label>
                  <Input
                    type="number"
                    step="0.01"
                    defaultValue={applicantSscResult}
                    {...registerUpdate("applicantSscResult")}
                  />
                </div>
                <div>
                  <Label>HSC Result</Label>
                  <Input
                    type="number"
                    step="0.01"
                    defaultValue={applicantHscResult}
                    {...registerUpdate("applicantHscResult")}
                  />
                </div>
                <div>
                  <Label>Degree</Label>
                  <Input
                    type="text"
                    defaultValue={applicantDegree}
                    {...registerUpdate("applicantDegree")}
                  />
                </div>
                <div>
                  <Label>Study Gap</Label>
                  <Input
                    type="number"
                    defaultValue={applicantStudyGap}
                    {...registerUpdate("applicantStudyGap")}
                  />
                </div>
                <div>
                  <Label>University</Label>
                  <Input
                    type="text"
                    defaultValue={scholarshipUniversity}
                    {...registerUpdate("scholarshipUniversity")}
                  />
                </div>
                <div>
                  <Label>Scholarship Category</Label>
                  <Input
                    type="text"
                    defaultValue={scholarshipCategory}
                    {...registerUpdate("scholarshipCategory")}
                  />
                </div>
                <div>
                  <Label>Scholarship Subject</Label>
                  <Input
                    defaultValue={scholarshipSub}
                    {...registerUpdate("scholarshipSub")}
                  />
                </div>
              </div>
              <Button type="submit" className="w-full">
                Save Changes
              </Button>
            </form>
          </DialogContent>
        </Dialog>

        <Button
          onClick={hadleCancelApplication}
          className={`uppercase text-xs bg-red-500 px-[4px] py-[2px] rounded-sm text-white  flex  items-center gap-1 cursor-pointer
            `}
          size={"sm"}
        >
          <X size={10} />
        </Button>

        {/* Add review button */}
        <Dialog>
          <DialogTrigger asChild>
            <Button
              className="uppercase text-xs bg-orange-500 px-[4px] py-[2px] rounded-sm text-white cursor-pointer flex  items-center gap-1"
              size={"sm"}
            >
              <Star size={10} />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add Review</DialogTitle>
              <DialogDescription>Write your review here</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Rating
                </Label>
                <Rating ratingData={{ rating, setRating }} />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Comment
                </Label>

                <form
                  className="col-span-3"
                  onSubmit={handleSubmit(handleReview)}
                >
                  <Input
                    type="text"
                    id="ussername"
                    placeholder="Review here"
                    {...register("review")}
                    className="col-span-3"
                  />
                </form>
              </div>
            </div>
            <DialogFooter>
              <Button
                className={"cursor-pointer"}
                onClick={handleSubmit(handleReview)}
                type="submit"
              >
                Add
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </TableCell>
    </TableRow>
  );
};

export default ApplicationTableRow;

ApplicationTableRow.propTypes = {
  application: PropTypes.object,
  handleAddReview: PropTypes.func,
  handleUpdate: PropTypes.func,
};
