// import { GraduationCap } from "lucide-react";
import PropTypes from "prop-types";
// import { BookUser, GraduationCap, Users } from "lucide-react";

const StatCard = ({ data, icon, title }) => {
  return (
    <div>
      <div className="flex justify-between items-center bg-white p-4 rounded-lg drop-shadow-xl overflow-hidden relative">
        <div className="bg-sky-50 block h-52 w-24 absolute -left-0 top-0 -rotate-45"></div>
        <div className="[&>svg]:size-12 lg:[&>svg]:size-18 2xl:[&>svg]:size-20  absolute left-4 text-blue-300">
          {icon}
        </div>
        <div className="text-right w-full">
          <p className="text-gray-500 font-thin font-inter">{title}</p>
          <h1 className="text-2xl lg:text-4xl 2xl:text-6xl font-medium text-text">
            {data || "0"}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default StatCard;

StatCard.propTypes = {
  data: PropTypes.string,
  icon: PropTypes.string,
  title: PropTypes.string,
};
