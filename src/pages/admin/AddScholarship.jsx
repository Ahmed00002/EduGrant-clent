import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import useCustomToast from "@/hooks/useCustomToast";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import useAuth from "@/hooks/useAuth";

const AddScholarship = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const customToast = useCustomToast();
  const [imageURL, setImageURL] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

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

  // Handle Form Submit
  const onSubmit = async (data) => {
    if (!imageURL) {
      customToast("Opps!", "Please upload an image!");
      return;
    }

    const newScholarship = {
      ...data,
      university_logo: imageURL,
      post_date: new Date().toISOString().split("T")[0],
    };


    try {
      const res = await axiosSecure.post("scholarship", newScholarship);
      if (res.data.insertedId) {
        customToast("Successful!", "Scholarship Added Successfully!");
        reset();
        setImageURL("");
      }
    } catch (error) {
      customToast("Opps!", "Failed to Add Scholarship!");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold text-center mb-6">
        🎓 Add Scholarship
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Scholarship Name & University Name */}
        <input
          {...register("scholarship_name", { required: true })}
          placeholder="Scholarship Name"
          className="bordered w-full p-3 border rounded-lg"
        />
        {errors.scholarship_name && (
          <p className="text-red-500 text-xs">Scholarship Name is required</p>
        )}

        <input
          {...register("university_name", { required: true })}
          placeholder="University Name"
          className="bordered w-full p-3 border rounded-lg"
        />
        {errors.university_name && (
          <p className="text-red-500 text-xs">University Name is required</p>
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
            required
            className="relative m-0 rounded-lg block w-full min-w-0 flex-auto cursor-pointer py-2 border border-solid border-secondary-500 bg-transparent bg-clip-padding px-3 text-base font-normal text-surface transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:me-3 file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-e file:border-solid file:border-inherit file:bg-transparent file:px-3  file:py-[0.32rem] file:text-surface focus:border-primary focus:text-gray-700 focus:shadow-inset focus:outline-none dark:border-white/70 dark:text-white  file:dark:text-white"
            type="file"
            id="formFile"
          />
        </div>
        {/* <input
          type="file"
          onChange={handleImageUpload}
          required
          className="file-input w-full border p-2 rounded-lg"
        /> */}
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
          <p className="text-red-500 text-xs">University Country is required</p>
        )}
        <input
          {...register("university_city", { required: true })}
          placeholder="University City"
          className="bordered w-full p-3 border rounded-lg"
        />
        {errors.university_city && (
          <p className="text-red-500 text-xs">City is required</p>
        )}
        <input
          {...register("university_rank", { required: true })}
          type="number"
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
          <p className="text-red-500 text-xs">Subject category is required</p>
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
          <p className="text-red-500 text-xs">Scholarship Type is required</p>
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
          <p className="text-red-500 text-xs">Scholarship Degree is required</p>
        )}

        {/* Fees & Charges  & stipend */}
        <input
          {...register("tuition_fees")}
          type="number"
          placeholder="Tuition Fees (Optional)"
          className="input-bordered w-full p-3 border rounded-lg"
        />

        <input
          {...register("stipend", { required: true })}
          type="number"
          placeholder="stipend (Optional)"
          className="input-bordered w-full p-3 border rounded-lg"
        />
        {errors.stipend && (
          <p className="text-red-500 text-xs">Stipend is required</p>
        )}
        <input
          {...register("application_fees", { required: true })}
          type="number"
          placeholder="Application Fees"
          className="input-bordered w-full p-3 border rounded-lg"
        />
        {errors.application_fees && (
          <p className="text-red-500 text-xs">Application fees is required</p>
        )}
        <input
          {...register("service_charge", { required: true })}
          type="number"
          placeholder="Service Charge"
          className="input-bordered w-full p-3 border rounded-lg"
        />
        {errors.service_charge && (
          <p className="text-red-500 text-xs">Service Charge is required</p>
        )}
        <div>
          <label htmlFor="date" className="text-md block pb-2 ">
            Application Deadline
          </label>
          <input
            type="date"
            {...register("application_deadline", { required: true })}
            className="input-bordered w-full p-3 border rounded-lg"
          />
          {errors.application_deadline && (
            <p className="text-red-500 text-xs">
              Application deadline is required
            </p>
          )}
        </div>
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
          value={user?.email}
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full mt-4 bg-Primary text-white p-3 rounded-lg"
        >
          Publish
        </button>
      </form>
    </div>
  );
};

export default AddScholarship;
