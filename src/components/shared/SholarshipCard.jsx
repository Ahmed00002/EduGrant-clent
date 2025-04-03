import useAverageRating from "@/hooks/useAverageRating";
import { MapPin, Bookmark, Book, Calendar1, ArrowRight } from "lucide-react";
import PropTypes from "prop-types";
import { FaRegStar, FaStar } from "react-icons/fa";
import Rating from "react-rating";
import { Link } from "react-router";
import { MdOutlineCategory } from "react-icons/md";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

const ScholarshipCard = ({ scholarship }) => {
  const {
    application_deadline = "--",
    application_fees,
    post_date = "--",
    scholarship_category = "-- ",
    scholarship_description = "--",
    // service_charge,
    // stipend = "--",
    subject_category = "--",
    university_city = "--",
    university_country = "--",
    university_logo = "--",
    university_name = "--",
    scholarship_name,
    _id,
  } = scholarship;

  const { ratings } = useAverageRating(_id);
  console.log("total rating", ratings);
  const shortMonths = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const month_sl = parseInt(post_date.split("-")[1]);

  // const deadline = application_deadline.split("-");
  const [deadlineOver, setDeadlineOver] = useState(false);

  // check deadline is over
  useEffect(() => {
    const today = new Date();
    const deadLine = new Date(application_deadline);
    if (today > deadLine) {
      setDeadlineOver(true);
    } else {
      setDeadlineOver(false);
    }
  }, [application_deadline]);

  return (
    <>
      <motion.div
        initial={{ y: 50 }}
        whileInView={{ y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="shadow-md rounded-lg cardContainer cursor-pointer overflow-hidden flex flex-col relative "
      >
        <div
          className={`absolute top-0 left-0 ${
            deadlineOver ? "bg-Secondary text-black" : "bg-Primary text-white"
          }  px-6 py-1 text-sm font-bold transform z-10 rounded-br-lg`}
        >
          {deadlineOver ? "Closed" : "Open"}
        </div>

        <div className="aspect-video relative ">
          <div className="overflow-hidden">
            <img
              className="w-full h-full object-cover rounded-t-lg thumbnail ease-out"
              src="https://themephi.net/template/eduan/eduan/assets/img/course/2/4.jpg"
              alt="clg thumbnail"
            />
          </div>
          {/* rating and bookmark container */}
          <div className="flex justify-between items-center px-4 py-1 w-11/12 -translate-x-1/2  bg-white absolute top-full left-1/2 z-10 -translate-y-1/2 rounded-lg shadow-md">
            <div className="py-2 text-lg flex items-center gap-2">
              <Rating
                fullSymbol={<FaStar color="#ffa121" />}
                emptySymbol={<FaRegStar color="#ffa121" />}
                placeholderSymbol={<FaStar color="#ffa121" />}
                placeholderRating={ratings?.averageRating}
                readonly={true}
              />
              <p className="text-xs text-gray-400">
                ({ratings?.totalRating || "0"} Reviews)
              </p>
            </div>
            <button
              className={
                "rounded-full p-2 text-white bg-gray-400 cursor-pointer hover:bg-Primary hover:text-white transition-colors duration-500"
              }
            >
              <Bookmark size={18} />{" "}
            </button>
          </div>
        </div>
        {/* card content container */}
        <div className="px-4 py-2 mt-8 flex flex-col  grow">
          <h1 className="text-2xl font-medium">{scholarship_name}</h1>
          <div className="flex gap-1">
            <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
              <Calendar1 size={14} /> {shortMonths[month_sl]},{" "}
              {post_date.split("-")[2]}, {post_date.split("-")[0]}
            </p>
            <Separator orientation="vertical" />
            <p className="text-xs text-gray-400 mt-1 flex gap-1 items-center">
              <MapPin size={14} />
              {university_city}, {university_country}
            </p>
            <Separator orientation="vertical" />
          </div>

          {/* subject and scholarship category */}
          <div className="p-2 bg-gray-100 text-gray-500 flex justify-between mt-4">
            <div className="flex gap-1 items-center text-sm">
              <Book size={12} /> <p>{subject_category}</p>
            </div>
            <div className="flex gap-1 items-center text-sm">
              <MdOutlineCategory />
              <p> {scholarship_category} </p>
            </div>
          </div>

          {/* description */}
          <p className="text-gray-500 mt-4">{scholarship_description}</p>

          {/* university name */}
          <div className="flex items-center gap-2 mt-4">
            <Avatar className={"text-sm text-Primary"}>
              <AvatarImage src={university_logo}></AvatarImage>
              <AvatarFallback>{university_name[0]}</AvatarFallback>
            </Avatar>

            <h1 className="text-lg font-medium text-Primary">
              {" "}
              By: {university_name}
            </h1>
          </div>
          <div className="grow basis-0 mt-4  flex items-end ">
            <div className="py-2 border-t w-full flex justify-between items-center">
              <p className="text-2xl font-railway font-bold text-Primary">
                $ {application_fees}
              </p>

              {/* more details button */}
              <Link to={`/scholarships/${_id}`}>
                <p className="text-lg font-railway  hover:text-Primary flex items-center gap-1">
                  More Details <ArrowRight size={18} />{" "}
                </p>
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default ScholarshipCard;

ScholarshipCard.propTypes = {
  scholarship: PropTypes.object,
};
