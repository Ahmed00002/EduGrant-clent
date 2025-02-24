import { Card, CardContent } from "@/components/ui/card";
import useAverageRating from "@/hooks/useAverageRating";
import {
  Calendar,
  MapPin,
  DollarSign,
  PenBoxIcon,
  ArrowDownRight,
} from "lucide-react";
import PropTypes from "prop-types";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router";

const ScholarshipCard = ({ scholarship }) => {
  const {
    application_deadline = "--",
    // application_fees,
    post_date = "--",
    scholarship_category = "-- ",
    scholarship_description = "--",
    // service_charge,
    stipend = "--",
    subject_category = "--",
    university_city = "--",
    university_country = "--",
    university_logo = "--",
    university_name = "--",
    _id,
  } = scholarship;

  const { ratings } = useAverageRating(_id);
  return (
    <Card className="max-w-md p-4 shadow-lg rounded-2xl border border-gray-200 flex flex-col">
      <div className="flex items-center gap-4">
        <img
          src={university_logo}
          alt={university_name}
          className="w-16 h-16 object-cover"
        />
        <div>
          <h2 className="text-lg font-semibold">{university_name}</h2>
          <p className="text-sm text-gray-500">{scholarship_category}</p>
          <p className="flex items-center gap-2 mt-2 text-gray-500">
            {" "}
            <FaStar size={15} color="orange" />{" "}
            {ratings?.averageRating.toFixed(1)}{" "}
          </p>
        </div>
      </div>
      <CardContent className="mt-4 space-y-2 flex flex-col flex-1">
        <div className="flex items-center text-sm text-gray-600">
          <MapPin className="w-4 h-4 mr-2" /> {university_country},
          {university_city}
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <PenBoxIcon className="w-4 h-4 mr-2" />
          Posted On: {post_date}
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Calendar className="w-4 h-4 mr-2" /> Application Deadline:{" "}
          {application_deadline}
        </div>

        <p className="text-sm font-medium">Subject: {subject_category}</p>
        <p className="text-sm text-gray-700 line-clamp-3">
          {scholarship_description}
        </p>
        {stipend && (
          <div className="flex items-center text-sm text-Primary font-medium">
            <DollarSign className="w-4 h-4 mr-2" /> Stipend: {stipend}
          </div>
        )}

        {/* View Details Always at Bottom */}
        <div className="w-full mt-auto text-Primary cursor-pointer text-md">
          <Link to={`/scholarships/${_id}`}>
            <p className="group flex items-center justify-end gap-2">
              View Details{" "}
              <ArrowDownRight
                size={15}
                className="arrow transition-transform duration-300 group-hover:-rotate-45"
              />
            </p>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default ScholarshipCard;

ScholarshipCard.propTypes = {
  scholarship: PropTypes.object,
};
