import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { FaStar, FaTrashAlt } from "react-icons/fa";

const AdminReviewCard = ({ review }) => {
  const { review: reviewDetails, handleDeleteReview } = review;

  const {
    _id,
    date,
    // email,
    userPhoto,
    name,
    rating,
    review: comment,
    scholarshipDetails: {
      // _id,
      scholarship_name,
      university_name,
      // university_logo,
      // university_location,
      subject_name,
      // scholarship_category,
      // scholarship_description,
      // application_deadline,
      // application_fees,
      // service_charge,
      // stipend,
      // post_date,
    },
  } = reviewDetails;
  console.log("review name", scholarship_name);
  return (
    <motion.div
      className="bg-white rounded-2xl shadow-lg p-5 flex flex-col justify-between border hover:shadow-xl transition"
      whileHover={{ scale: 1.02 }}
    >
      {/* University Info */}
      <div className="mb-3">
        <h3 className="text-xl font-semibold">{scholarship_name}</h3>
        <h3 className="text-xl font-semibold">{university_name}</h3>
        <p className="text-sm text-gray-500">{subject_name}</p>
      </div>

      {/* Reviewer Info */}
      <div className="flex items-center gap-3 border-t pt-3">
        <img
          src={userPhoto}
          alt="Reviewer"
          className="w-12 h-12 rounded-full border"
        />
        <div>
          <h4 className="font-semibold">{name}</h4>
          <p className="text-xs text-gray-500">{date}</p>
        </div>
      </div>

      {/* Rating and Comment */}
      <div className="mt-3">
        <div className="flex items-center gap-1 text-yellow-500">
          {[...Array(5)].map((_, i) => (
            <FaStar
              key={i}
              className={i < rating ? "text-yellow-500" : "text-gray-300"}
            />
          ))}
          <span className="text-sm font-semibold">{rating}/5</span>
        </div>
        <p className="text-gray-700 text-sm mt-2">{comment}</p>
      </div>

      {/* Delete Button */}
      <button
        onClick={() => handleDeleteReview(_id)}
        className="mt-4 bg-red-500 hover:bg-red-600 text-white py-2 rounded-xl flex items-center justify-center gap-2 transition cursor-pointer"
      >
        <FaTrashAlt /> Delete Review
      </button>
    </motion.div>
  );
};

export default AdminReviewCard;

AdminReviewCard.propTypes = {
  review: PropTypes.object,
  handleDeleteReview: PropTypes.object,
};
