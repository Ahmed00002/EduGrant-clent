import { Pen, X } from "lucide-react";
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

const ApplicationTableRow = ({ application, handleAddReview }) => {
  const {
    _id: applicationId,
    // applicantNumber,
    // applicantAddress,
    // applicantSscResult,
    // applicantHscResult,
    // scholarshipUniversity,
    // scholarshipCategory,
    // scholarshipSub,
    // applicantGender,
    applicantDegree,
    applicationStatus,
    // applicantStudyGap,
    // applicantPhoto,
    // applied_ScholarshipId,
    // applicant_email,
    // applicant_Id,
    // appliedData,
  } = application;

  const { register, handleSubmit } = useForm();
  const [rating, setRating] = useState(0);

  const {
    application_fees = "2000",
    service_charge = "200",
    subject_name = "Bangla",
    university_name = "Pabna University",
    _id,
  } = application.scholarshipDetails;

  const handleReview = (data) => {
    data.rating = rating;
    handleAddReview(data, applicationId, _id);
  };

  // handle cancel
  const hadleCancelApplication = () => {
    alert("clicked");
  };
  return (
    <TableRow className="py-2">
      <TableCell>1</TableCell>
      <TableCell>{university_name}</TableCell>
      <TableCell></TableCell>
      <TableCell>{subject_name}</TableCell>
      <TableCell>{applicantDegree}</TableCell>
      <TableCell>${application_fees}</TableCell>
      <TableCell>${service_charge}</TableCell>
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
        <button
          className="uppercase text-xs bg-green-500 px-[4px] py-[2px] rounded-sm text-white cursor-pointer"
          size={"sm"}
        >
          Details
        </button>

        <button
          className="uppercase text-xs bg-orange-500 px-[4px] py-[2px] rounded-sm text-white cursor-pointer flex  items-center gap-1"
          size={"sm"}
        >
          <Pen size={10} /> Edit
        </button>

        <button
          onClick={hadleCancelApplication}
          className={`uppercase text-xs bg-red-500 px-[4px] py-[2px] rounded-sm text-white  flex  items-center gap-1 cursor-pointer
            `}
          size={"sm"}
        >
          <X size={10} /> Cancel
        </button>

        {/* Add review button */}
        <Dialog>
          <DialogTrigger asChild>
            <button
              className="uppercase text-xs bg-orange-500 px-[4px] py-[2px] rounded-sm text-white cursor-pointer flex  items-center gap-1"
              size={"sm"}
            >
              <Pen size={10} /> Add Review
            </button>
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
};
