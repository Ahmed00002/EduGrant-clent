import { Delete, Pen } from "lucide-react";
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
import useCustomToast from "@/hooks/useCustomToast";

const ReviewsRow = ({
  scholarship: review,
  handleDeleteReview: handleDelete,
  updateRating,
}) => {
  const { register, handleSubmit } = useForm();
  const [rating, setRating] = useState(review.rating);
  const customToast = useCustomToast();
  //   de-structure review
  const {
    scholarship_category = "Robotics",
    university_name = "Pabna University",
  } = review.scholarshipDetails;

  return (
    <TableRow className="py-2">
      <TableCell>{scholarship_category}</TableCell>
      <TableCell>{university_name}</TableCell>
      <TableCell>{review.review}</TableCell>
      <TableCell>{review.date}</TableCell>

      <TableCell className="flex gap-2 items-center border-l">
        <Dialog>
          <DialogTrigger asChild>
            <button
              className="uppercase text-xs bg-orange-500 px-[4px] py-[2px] rounded-sm text-white cursor-pointer flex  items-center gap-1"
              size={"sm"}
            >
              <Pen size={10} /> Edit
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit Review</DialogTitle>
              <DialogDescription>
                Make changes to your review here. Click save when you&apos;re
                done.
              </DialogDescription>
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
                  onSubmit={handleSubmit(updateRating)}
                >
                  <Input
                    type="text"
                    id="ussername"
                    value="@peduarte"
                    {...register("comment")}
                    className="col-span-3"
                  />
                </form>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleSubmit(updateRating)} type="submit">
                Save changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <button
          onClick={() => handleDelete(review._id)}
          className="uppercase text-xs bg-red-500 px-[4px] py-[2px] rounded-sm text-white cursor-pointer flex  items-center gap-1"
          size={"sm"}
        >
          <Delete size={10} /> Delete
        </button>
      </TableCell>
    </TableRow>
  );
};

export default ReviewsRow;

ReviewsRow.propTypes = {
  scholarship: PropTypes.object,
  handleDeleteReview: PropTypes.func,
  updateRating: PropTypes.func,
};
