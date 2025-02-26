import Rating from "@/components/Rating";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";
import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import useCustomToast from "@/hooks/useCustomToast";
import useSingleLoader from "@/hooks/useSingleLoader";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { TabsTrigger } from "@radix-ui/react-tabs";
import * as motion from "motion/react-client";
import {
  Banknote,
  Bookmark,
  BookOpen,
  Calendar,
  CreditCard,
  GraduationCap,
  HandCoins,
  MessageSquareHeart,
  TrendingUp,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import useAverageRating from "@/hooks/useAverageRating";
import { FaStar } from "react-icons/fa";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Pagination, Autoplay } from "swiper/modules";
import { SwiperSlide, Swiper } from "swiper/react";

const ScholarshipDetails = () => {
  const scholarship = useSingleLoader();
  const [userRatings, setUserRatings] = useState([]);
  const customToast = useCustomToast();
  const { ratings, refetch } = useAverageRating(scholarship?._id);

  //   user data
  const { user } = useAuth();
  const { register, handleSubmit } = useForm();

  // axios secure
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure
      .get(`scholarships/ratings/${scholarship._id}`)
      .then((res) => setUserRatings(res.data))
      .catch((e) => console.log(e));
  }, [axiosSecure, scholarship._id]);

  // rating
  const [rating, setRating] = useState(null);

  const handleReview = (data) => {
    if (!rating) {
      customToast("Alert!", "Please select your rating");
      return;
    }
    if (!data.review) {
      customToast("Alert!", "Please explain your experience");
      return;
    }
    axiosSecure
      .post("/reviews", {
        email: user?.email,
        name: user?.displayName,
        userPhoto: user?.photoURL,
        review: data.review,
        rating: rating,
        scholarshipId: scholarship._id,
        scholarship_name: scholarship.scholarship_name,
        university_name: scholarship.university_name,
      })
      .then((res) => {
        if (res.data.insertedId) {
          refetch();
          customToast(
            "Thank You",
            "Your review added and thanks for your valuable review"
          );
        }

        if (res.data.isExist) {
          customToast("Hey!", "You have already reviewed on this scholarship");
        }
      });
  };

  //   de-structure scholarship
  const {
    application_deadline = "--",
    application_fees = "--",
    // post_date = "23 Oct 2024",
    scholarship_category = "--",
    scholarship_description = "--",
    service_charge = "--",
    stipend = "--",
    subject_category = "--",
    university_city = "--",
    university_country = "--",
    university_logo = "--",
    university_name = "--",
    tuition_fees = "--",
    university_rank = "--",
    scholarship_name = "--",
    _id,
    degree = "--",
  } = scholarship;

  return (
    <>
      <section className="center mt-8 mb-8">
        <div>
          <img
            className="aspect-video h-[400px] object-cover w-full"
            src="https://i.imghippo.com/files/kbNS3873sJQ.jpg"
            alt=""
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 -translate-y-10 font-inter">
          <aside className="col-span-8">
            {/* title and rating */}
            <div className="bg-white shadow-xl px-6 py-4 rounded-xl rounded-tl-none">
              <div className=" font-inter font-bold text-text">
                <h1 className="text-3xl">{scholarship_name}</h1>
                <p className="text-md font-medium text-gray-400">
                  {university_name}
                </p>
              </div>
              {/* university name */}
              <div className="mt-4 flex flex-wrap gap-4 items-center">
                <div className="flex w-full gap-2 items-center">
                  <Avatar className="w-16 md:w-10 h-16 md:h-10">
                    <AvatarImage
                      className="w-16 md:w-10 h-16 md:h-10 aspect-square object-cover"
                      src={university_logo}
                    />
                  </Avatar>
                  <div className="p-0">
                    <p className="text-md font-medium text-gray-400">
                      Location
                    </p>
                    <p>{university_city + ", " + university_country}</p>
                  </div>
                </div>

                {/* category */}
                <div className="p-0 border-l-[1.5px] pl-4">
                  <p className="text-md font-medium text-gray-400">Category</p>
                  <p>{scholarship_category}</p>
                </div>
                {/* Rating */}
                <div className="p-0 border-l-[1.5px] pl-4">
                  <p className="text-md font-medium text-gray-400">Rating</p>
                  <p className="flex items-center gap-1">
                    {ratings?.averageRating.toFixed(1) || 0}{" "}
                    <FaStar size={15} color="#ffa121" />
                  </p>
                </div>
                {/* rank */}
                <div className="p-0 border-l-[1.5px] pl-4">
                  <p className="text-md font-medium text-gray-400">
                    World Rank
                  </p>
                  <p className="flex items-center gap-1">
                    {university_rank || 0}{" "}
                    <TrendingUp size={15} color="#ffa121" />
                  </p>
                </div>
              </div>
            </div>

            {/* scholarships details in tabs */}
            <Tabs className="mt-12 order-3" defaultValue="overview">
              <TabsList className="grid w-full grid-cols-2 bg-transparent gap-4 mb-6">
                <TabsTrigger
                  className="flex items-center justify-center gap-2 border-t-[2px] py-2 rounded-md bg-gray-100 data-[state=active]:border-Primary data-[state=active]:bg-blue-50 data-[state=active]:text-Primary cursor-pointer"
                  value="overview"
                >
                  <Bookmark size={17} />
                  Overview{" "}
                </TabsTrigger>
                <TabsTrigger
                  className="flex items-center justify-center gap-2 border-t-[2px] py-2 rounded-md bg-gray-100 data-[state=active]:border-Primary data-[state=active]:bg-blue-50 data-[state=active]:text-Primary cursor-pointer"
                  value="reviews"
                >
                  <MessageSquareHeart size={17} />
                  Reviews{" "}
                </TabsTrigger>
              </TabsList>

              {/* tab content : overview */}
              <TabsContent value="overview">
                <h1 className="text-2xl font-medium mb-2">Description</h1>
                <h2>{scholarship_description}</h2>
              </TabsContent>

              {/* tab content : reviews */}
              <TabsContent value="reviews" className={"space-y-2"}>
                <div className="p-2 rounded-md shadow-sm space-y-2">
                  <Rating ratingData={{ rating, setRating }} />
                  <form
                    onSubmit={handleSubmit(handleReview)}
                    className="w-full flex justify-between"
                  >
                    <input
                      {...register("review")}
                      type="text"
                      className="w-full px-4 py-2 outline-none border-b"
                      placeholder="Write something..."
                    />
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 1 }}
                      type="submit"
                      className="px-4 py-2 h-full bg-gray-100 rounded-xs cursor-pointer"
                    >
                      Post
                    </motion.button>
                  </form>
                </div>

                {ratings?.averageRating > 0 ? (
                  <div className="max-w-3xl mx-auto py-10">
                    <Swiper
                      modules={[Pagination, Autoplay]}
                      slidesPerView={1}
                      // pagination={{ clickable: true }}
                      autoplay={{ delay: 3000, disableOnInteraction: false }}
                      loop={true}
                    >
                      {userRatings.map((review) => (
                        <SwiperSlide key={review._id}>
                          <div className="p-6 bg-gray-50 rounded-2xl shadow-lg text-center flex flex-col items-center">
                            <img
                              src={review.userPhoto}
                              alt={review.name}
                              className="w-20 h-20 rounded-full mb-4 border-2 border-gray-300"
                            />
                            <h3 className="text-xl font-semibold mb-2">
                              {review.name}
                            </h3>
                            <p className="text-gray-600 italic mb-4">
                              &quot;{review.review}&quot;
                            </p>
                            <div className="flex justify-center gap-1">
                              {[...Array(5)].map((_, index) => (
                                <FaStar
                                  key={index}
                                  className={
                                    index < review.rating
                                      ? "text-yellow-500"
                                      : "text-gray-300"
                                  }
                                />
                              ))}
                            </div>
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                ) : (
                  <>
                    <div className="flex justify-center">
                      <svg
                        fill="#d4d4d4"
                        version="1.1"
                        id="Capa_1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        width="60px"
                        height="60px"
                        viewBox="0 0 410.76 410.76"
                        xmlSpace="preserve"
                        stroke="#d4d4d4"
                        strokeWidth="0.00410758"
                        className="mt-6"
                      >
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g
                          id="SVGRepo_tracerCarrier"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          stroke="#CCCCCC"
                          strokeWidth="0.8215159999999999"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                          {" "}
                          <g>
                            {" "}
                            <path d="M350.604,60.153C311.812,21.362,260.237,0,205.379,0C150.521,0,98.945,21.362,60.154,60.153S0,150.52,0,205.378 c0,54.858,21.363,106.437,60.154,145.227c38.79,38.791,90.366,60.153,145.225,60.153c54.859,0,106.434-21.362,145.225-60.153 c38.791-38.79,60.154-90.366,60.154-145.227C410.758,150.521,389.395,98.944,350.604,60.153z M255.626,121.808 c16.955,0,30.749,13.794,30.749,30.749c0,16.955-13.794,30.749-30.749,30.749c-16.954,0-30.749-13.794-30.749-30.749 C224.877,135.602,238.672,121.808,255.626,121.808z M155.131,121.808c16.955,0,30.749,13.794,30.749,30.749 c0,16.955-13.794,30.749-30.749,30.749c-16.956,0-30.748-13.794-30.748-30.749C124.383,135.602,138.175,121.808,155.131,121.808z M292.355,289.348c-7.299,3.916-16.391,1.174-20.309-6.125c-12.428-23.154-36.398-38.406-62.562-39.805 c-26.392-1.408-52.002,11.326-66.799,33.23c-1.436,2.125-2.771,4.336-3.973,6.573c-3.92,7.302-13.014,10.041-20.311,6.123 c-7.301-3.918-10.041-13.012-6.123-20.312c1.68-3.127,3.543-6.215,5.545-9.178c19.625-29.049,52.842-46.543,87.713-46.543 c1.844,0,3.694,0.049,5.547,0.146c36.56,1.953,70.047,23.248,87.396,55.576C302.398,276.336,299.656,285.43,292.355,289.348z"></path>{" "}
                          </g>{" "}
                        </g>
                      </svg>
                    </div>
                    <h1 className="text-center mt-6 font-inter font-medium text-gray-400">
                      No One Reviewed Yet{" "}
                    </h1>
                  </>
                )}
              </TabsContent>
            </Tabs>
          </aside>

          {/* details card and apply button */}
          <aside className=" col-span-4 ">
            <div className="bg-white shadow-xl rounded-xl">
              <h1 className="text-5xl font-medium text-text p-6">
                ${application_fees}
              </h1>

              {/* subject name */}
              <Separator />
              <div className="flex justify-between px-6 py-2">
                <p className="flex items-center gap-2">
                  <GraduationCap size={17} color="#004aad" />
                  Degree
                </p>
                <p className="text-right">{degree}</p>
              </div>

              {/* subject name */}
              <Separator />
              <div className="flex justify-between px-6 py-2">
                <p className="flex items-center gap-2">
                  <BookOpen size={17} color="#004aad" />
                  Subject
                </p>
                <p className="text-right">{subject_category}</p>
              </div>

              {/* stipend */}
              <Separator />
              <div className="flex justify-between px-6 py-2">
                <p className="flex items-center gap-2">
                  <HandCoins size={17} color="#004aad" />
                  Stipend
                </p>
                <p className="text-right">$ {stipend}</p>
              </div>

              {/* tuition fees */}
              <Separator />
              <div className="flex justify-between px-6 py-2">
                <p className="flex items-center gap-2">
                  <Banknote size={17} color="#004aad" />
                  Tuition Fees
                </p>
                <p className="text-right">$ {tuition_fees}</p>
              </div>

              {/* service charge */}
              <Separator />
              <div className="flex justify-between px-6 py-2">
                <p className="flex items-center gap-2">
                  <CreditCard size={17} color="#004aad" />
                  Service Charge
                </p>
                <p className="text-right">$ {service_charge}</p>
              </div>

              {/* Deadline */}
              <Separator />
              <div className="flex justify-between px-6 py-2">
                <p className="flex items-center gap-2">
                  <Calendar size={17} color="#004aad" />
                  Deadline
                </p>
                <p className="text-right">{application_deadline}</p>
              </div>

              <div className="p-6">
                <Link to={`/scholarships/${_id}/checkout`}>
                  <button className="w-full bg-Primary text-white text-xl font-medium py-2 rounded-xl cursor-pointer">
                    Apply Now
                  </button>
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
};

export default ScholarshipDetails;
