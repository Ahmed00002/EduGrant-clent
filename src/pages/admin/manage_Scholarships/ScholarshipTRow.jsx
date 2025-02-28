import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import {
  Building,
  CalendarIcon,
  DollarSign,
  Edit,
  Eye,
  Globe,
  GraduationCap,
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
import axios from "axios";

const ScholarshipTRow = ({ scholarshipData, handleDelete }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: scholarshipData,
  });

  const [open, setOpen] = useState(false);

  const {
    _id,
    scholarship_name,
    university_name,
    university_country,
    university_city,
    // university_rank,
    subject_category,
    // scholarship_category,
    degree,
    tuition_fees,
    stipend,
    application_fees,
    service_charge,
    application_deadline,
    scholarship_description,
    posted_user_email,
    university_logo,
    // post_date,
  } = scholarshipData;

  const [imageURL, setImageURL] = useState(university_logo);

  const customToast = useCustomToast();

  const axiosSecure = useAxiosSecure();

  // Handle Form Submit (update scholarship data)
  const onSubmit = async (data) => {
    if (!imageURL) {
      customToast("Opps!", "Please upload an image!");
      return;
    }

    const updatedScholarshipData = {
      ...data,
      university_logo: imageURL,
      post_date: new Date().toISOString().split("T")[0],
    };

    try {
      const res = await axiosSecure.patch(
        `/scholarships/${_id}`,
        updatedScholarshipData
      );
      if (res.data.modifiedCount > 0) {
        customToast("Successful!", "Scholarship Updated Successfully!");
        reset();
        setImageURL("");
        setOpen(false);
      }
    } catch (error) {
      customToast("Opps!", "Failed to Update Scholarship!");
    }
  };
  // Handle Image Upload to ImgBB
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imgbb}`,
        formData
      );
      if (res.data.success) {
        setImageURL(res.data.data.url);
        customToast("Uploaded", "✅ Image Uploaded Successfully!");
      }
    } catch (error) {
      customToast("Opps!", "Image Upload Failed!");
    }
  };

  return (
    <>
      <TableRow>
        <TableCell>{scholarship_name}</TableCell>
        <TableCell>{university_name}</TableCell>
        <TableCell>{subject_category}</TableCell>
        <TableCell>{degree}</TableCell>
        <TableCell>${application_fees}</TableCell>
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
            <DialogContent>
              <DialogTitle>Scholarship Details</DialogTitle>
              <div className="flex gap-4 items-center">
                <img
                  src={university_logo}
                  alt={university_name}
                  className="w-16 h-16 rounded-full border"
                />
                <div>
                  <h3 className="text-lg font-semibold">{university_name}</h3>
                  <p className="text-sm text-gray-600 flex items-center gap-2">
                    <Globe size={16} /> {university_city}, {university_country}
                  </p>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <p className="text-sm flex items-center gap-2">
                  <GraduationCap size={16} /> Degree: {degree}
                </p>
                <p className="text-sm flex items-center gap-2">
                  <Building size={16} /> Subject: {subject_category}
                </p>
                <p className="text-sm flex items-center gap-2">
                  <DollarSign size={16} /> Tuition Fees: ${" "}
                  {tuition_fees || "N/A"}
                </p>
                <p className="text-sm flex items-center gap-2">
                  <DollarSign size={16} /> Stipend: ${stipend || "N/A"}
                </p>
                <p className="text-sm flex items-center gap-2">
                  <DollarSign size={16} /> Application Fees: ${" "}
                  {application_fees}
                </p>
                <p className="text-sm flex items-center gap-2">
                  <DollarSign size={16} /> Service Charge: ${service_charge}
                </p>
                <p className="text-sm flex items-center gap-2">
                  <CalendarIcon size={16} /> Deadline: {application_deadline}
                </p>
              </div>
              <p className="text-gray-700 mt-4 text-sm">
                {scholarship_description}
              </p>
              <Badge className="mt-2">Posted by: {posted_user_email}</Badge>
            </DialogContent>
          </Dialog>

          {/* edit button with dialog */}
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button
                className={
                  "bg-orange-500 cursor-pointer transition-all duration-300 hover:bg-orange-600"
                }
              >
                {" "}
                <Edit />{" "}
              </Button>
            </DialogTrigger>
            <DialogContent className={"max-h-[90vh] overflow-y-auto"}>
              <DialogHeader>
                <DialogTitle>Edit Scholarship</DialogTitle>
              </DialogHeader>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* Scholarship Name & University Name */}
                <input
                  {...register("scholarship_name", { required: true })}
                  placeholder="Scholarship Name"
                  className="bordered w-full p-3 border rounded-lg"
                />
                {errors.scholarship_name && (
                  <p className="text-red-500 text-xs">
                    Scholarship Name is required
                  </p>
                )}

                <input
                  {...register("university_name", { required: true })}
                  placeholder="University Name"
                  className="bordered w-full p-3 border rounded-lg"
                />
                {errors.university_name && (
                  <p className="text-red-500 text-xs">
                    University Name is required
                  </p>
                )}

                {/* Image Upload */}
                <div>
                  <label
                    htmlFor="formFile"
                    className="mb-2 inline-block text-gray-600 dark:text-neutral-400"
                  >
                    Upload University Logo
                  </label>
                  <input
                    onChange={handleImageUpload}
                    className="relative m-0 rounded-lg block w-full min-w-0 flex-auto cursor-pointer py-2 border border-solid border-secondary-500 bg-transparent bg-clip-padding px-3 text-base font-normal text-surface transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:me-3 file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-e file:border-solid file:border-inherit file:bg-transparent file:px-3  file:py-[0.32rem] file:text-surface focus:border-primary focus:text-gray-700 focus:shadow-inset focus:outline-none dark:border-white/70 dark:text-white  file:dark:text-white"
                    type="file"
                    id="formFile"
                  />
                </div>

                {imageURL && (
                  <img
                    src={imageURL}
                    alt="Preview"
                    className="w-24 h-24 mt-2 rounded-lg border"
                  />
                )}

                {/* University Location */}
                <input
                  {...register("university_country", { required: true })}
                  placeholder="University Country"
                  className="bordered w-full p-3 border rounded-lg"
                />
                {errors.university_country && (
                  <p className="text-red-500 text-xs">
                    University Country is required
                  </p>
                )}
                {/* University City */}
                <input
                  {...register("university_city", { required: true })}
                  placeholder="University City"
                  className="bordered w-full p-3 border rounded-lg"
                />
                {errors.university_city && (
                  <p className="text-red-500 text-xs">City is required</p>
                )}
                {/* Rank */}
                <input
                  {...register("university_rank", { required: true })}
                  placeholder="University World Rank"
                  className="bordered w-full p-3 border rounded-lg"
                />
                {errors.university_rank && (
                  <p className="text-red-500 text-xs">World Rank is required</p>
                )}

                {/* Dropdowns */}
                <select
                  {...register("subject_category", { required: true })}
                  className="bordered w-full p-3 border rounded-lg"
                >
                  <option value="">Select Subject Category</option>
                  <option>Agriculture</option>
                  <option>Engineering</option>
                  <option>Doctor</option>
                </select>
                {errors.subject_category && (
                  <p className="text-red-500 text-xs">
                    Subject category is required
                  </p>
                )}

                <select
                  {...register("scholarship_category", { required: true })}
                  className="bordered w-full p-3 border rounded-lg"
                >
                  <option value="">Select Scholarship Type</option>
                  <option>Full fund</option>
                  <option>Partial</option>
                  <option>Self-fund</option>
                </select>
                {errors.scholarship_category && (
                  <p className="text-red-500 text-xs">
                    Scholarship Type is required
                  </p>
                )}

                <select
                  {...register("degree", { required: true })}
                  className="select-bordered w-full p-3 border rounded-lg"
                >
                  <option value="">Select Degree</option>
                  <option>Diploma</option>
                  <option>Bachelor</option>
                  <option>Masters</option>
                </select>
                {errors.degree && (
                  <p className="text-red-500 text-xs">
                    Scholarship Degree is required
                  </p>
                )}

                {/* Fees & Charges  & stipend */}
                <input
                  {...register("tuition_fees")}
                  placeholder="Tuition Fees (Optional)"
                  className="input-bordered w-full p-3 border rounded-lg"
                />

                <input
                  {...register("stipend", { required: true })}
                  placeholder="stipend (Optional)"
                  className="input-bordered w-full p-3 border rounded-lg"
                />
                {errors.stipend && (
                  <p className="text-red-500 text-xs">Stipend is required</p>
                )}
                <input
                  {...register("application_fees", { required: true })}
                  placeholder="Application Fees"
                  className="input-bordered w-full p-3 border rounded-lg"
                />
                {errors.application_fees && (
                  <p className="text-red-500 text-xs">
                    Application fees is required
                  </p>
                )}
                <input
                  {...register("service_charge", { required: true })}
                  placeholder="Service Charge"
                  className="input-bordered w-full p-3 border rounded-lg"
                />
                {errors.service_charge && (
                  <p className="text-red-500 text-xs">
                    Service Charge is required
                  </p>
                )}
                <input
                  type="date"
                  {...register("application_deadline", { required: true })}
                  className="input-bordered w-full p-3 border rounded-lg"
                  value={application_deadline}
                />
                {errors.application_deadline && (
                  <p className="text-red-500 text-xs">
                    Application deadline is required
                  </p>
                )}
                <input
                  type="text"
                  placeholder="Scholarship Description"
                  {...register("scholarship_description", { required: true })}
                  className="input-bordered w-full p-3 border rounded-lg"
                />
                {errors.scholarship_description && (
                  <p className="text-red-500 text-xs">
                    Scholarship Description is required
                  </p>
                )}

                {/* User Email */}
                <input
                  {...register("posted_user_email", { required: true })}
                  placeholder="Posted User Email"
                  className="bordered w-full p-3 border rounded-lg"
                  disabled
                  value={posted_user_email}
                />

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full mt-4 bg-Primary text-white p-3 rounded-lg"
                >
                  Publish
                </button>
              </form>
            </DialogContent>
          </Dialog>

          {/* cancel button with dialog */}
          <Button
            className={
              "bg-red-500 cursor-pointer transition-all duration-300 hover:bg-red-600"
            }
            onClick={() => handleDelete(_id, scholarship_name)}
          >
            {" "}
            <XCircle />{" "}
          </Button>
        </TableCell>
      </TableRow>
    </>
  );
};

export default ScholarshipTRow;
ScholarshipTRow.propTypes = {
  scholarshipData: PropTypes.object,
  handleDelete: PropTypes.func,
};
