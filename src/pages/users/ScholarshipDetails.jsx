import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";
import useSingleLoader from "@/hooks/useSingleLoader";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { TabsTrigger } from "@radix-ui/react-tabs";
import {
  Bookmark,
  BookOpen,
  Calendar,
  CreditCard,
  HandCoins,
  MessageSquareHeart,
  Star,
} from "lucide-react";
import { Link, useParams } from "react-router";

// import svg from
const ScholarshipDetails = () => {
  const scholarship = useSingleLoader();
  const params = useParams();
  console.log("params", params);

  console.log(scholarship);

  //   de-structure scholarship
  const {
    application_deadline = "21 Feb 2023",
    application_fees = "2000",
    // post_date = "23 Oct 2024",
    scholarship_category = "Robotics",
    scholarship_description = "Demo description",
    service_charge = "200",
    stipend = "500",
    subject_name = "Bangla",
    university_location = "Uganda",
    university_logo = "demo",
    university_name = "Pabna University",
    _id,
  } = scholarship;
  const reviews = [
    {
      id: 1,
      name: "John Doe",
      image: "https://randomuser.me/api/portraits/men/1.jpg",
      date: "Feb 20, 2025",
      rating: 4.5,
      comment: "Great scholarship opportunity!",
    },
    {
      id: 2,
      name: "Jane Smith",
      image: "https://randomuser.me/api/portraits/women/2.jpg",
      date: "Jan 15, 2025",
      rating: 5,
      comment: "Highly recommended!",
    },
  ];
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
        <div className="grid grid-cols-12 gap-4 -translate-y-10 font-inter">
          <aside className="col-span-8">
            {/* title and rating */}
            <div className="bg-white shadow-xl px-6 py-4 rounded-xl rounded-tl-none">
              <div className="text-3xl font-inter font-bold text-text">
                <h1>{university_name}</h1>
              </div>
              {/* university name */}
              <div className="mt-4 flex gap-4 items-center">
                <div className="flex gap-2 items-center">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={university_logo} />
                  </Avatar>
                  <div className="p-0">
                    <p className="text-md font-medium text-gray-400">
                      Location
                    </p>
                    <p>{university_location}</p>
                  </div>
                </div>

                {/* stipend */}
                <div className="p-0 border-l-[1.5px] pl-4">
                  <p className="text-md font-medium text-gray-400">Category</p>
                  <p>{scholarship_category}</p>
                </div>
                {/* Rating */}
                <div className="p-0 border-l-[1.5px] pl-4">
                  <p className="text-md font-medium text-gray-400">Rating</p>
                  <p className="flex items-center gap-1">
                    5 <Star size={15} color="#ffa121" />
                  </p>
                </div>
              </div>
            </div>

            {/* scholarships details in tabs */}
            <Tabs className="mt-12" defaultValue="overview">
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
                {reviews.map((review, idx) => (
                  <>
                    <div
                      key={idx}
                      className="p-4 bg-gray-50 text-text rounded-lg"
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={review.image}
                          alt={review.name}
                          className="w-12 h-12 rounded-full"
                        />
                        <div className="flex justify-between w-full">
                          <div>
                            <h4 className="font-semibold">{review.name}</h4>
                            <p className="text-sm text-gray-500">
                              {review.date}
                            </p>
                          </div>
                          <p className="text-yellow-500">⭐ {review.rating}</p>
                        </div>
                      </div>
                      <p className="mt-2">{review.comment}</p>
                    </div>
                  </>
                ))}
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
                  <BookOpen size={17} color="#004aad" />
                  Subject
                </p>
                <p className="text-right">{subject_name}</p>
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

              {/* service charge */}
              <Separator />
              <div className="flex justify-between px-6 py-2">
                <p className="flex items-center gap-2">
                  <CreditCard size={17} color="#004aad" />
                  Service Charge
                </p>
                <p className="text-right">{service_charge}</p>
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
