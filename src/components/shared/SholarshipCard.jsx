import { Card, CardContent } from "@/components/ui/card";
import {
  Calendar,
  MapPin,
  DollarSign,
  PenBoxIcon,
  ArrowDownRight,
} from "lucide-react";
import PropTypes from "prop-types";
import { Link } from "react-router";

const ScholarshipCard = ({ scholarship }) => {
  return (
    <Card className="max-w-md p-4 shadow-lg rounded-2xl border border-gray-200 flex flex-col">
      <div className="flex items-center gap-4">
        <img
          src={scholarship.logo}
          alt={scholarship.university}
          className="w-16 h-16 object-contain"
        />
        <div>
          <h2 className="text-lg font-semibold">{scholarship.university}</h2>
          <p className="text-sm text-gray-500">{scholarship.category}</p>
        </div>
      </div>
      <CardContent className="mt-4 space-y-2 flex flex-col flex-1">
        <div className="flex items-center text-sm text-gray-600">
          <MapPin className="w-4 h-4 mr-2" /> {scholarship.location}
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <PenBoxIcon className="w-4 h-4 mr-2" />
          Posted On: {scholarship.postDate}
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Calendar className="w-4 h-4 mr-2" /> Application Deadline:{" "}
          {scholarship.deadline}
        </div>

        <p className="text-sm font-medium">Subject: {scholarship.subject}</p>
        <p className="text-sm text-gray-700 line-clamp-3">
          {scholarship.description}
        </p>
        {scholarship.stipend && (
          <div className="flex items-center text-sm text-Primary font-medium">
            <DollarSign className="w-4 h-4 mr-2" /> Stipend:{" "}
            {scholarship.stipend}
          </div>
        )}

        {/* View Details Always at Bottom */}
        <div className="w-full mt-auto text-Primary cursor-pointer text-md">
          <Link to={"/scholarships/1"}>
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
