import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { TabsTrigger } from "@radix-ui/react-tabs";
import {
  Bookmark,
  BookOpen,
  Calendar,
  Clock,
  CreditCard,
  HandCoins,
  MessageSquareHeart,
  Star,
} from "lucide-react";

// import svg from
const ScholarshipDetails = () => {
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
                <h1>University Name Here</h1>
              </div>
              {/* university name */}
              <div className="mt-4 flex gap-4 items-center">
                <div className="flex gap-2 items-center">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src="https://themephi.net/template/eduan/eduan/assets/img/course/details/author.jpg" />
                  </Avatar>
                  <div className="p-0">
                    <p className="text-md font-medium text-gray-400">
                      Location
                    </p>
                    <p>America, losangeles</p>
                  </div>
                </div>

                {/* stipend */}
                <div className="p-0 border-l-[1.5px] pl-4">
                  <p className="text-md font-medium text-gray-400">Category</p>
                  <p>Robotics</p>
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
                <h2>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Veniam quis tempora ipsum esse vero temporibus corrupti
                  obcaecati, consectetur, a velit quod, eos voluptate distinctio
                  dolorem accusamus odit. Quidem facere at qui blanditiis,
                  recusandae suscipit incidunt accusamus, similique aliquid
                  beatae fugiat voluptatum ratione quia accusantium dolores,
                  maiores quae provident odit? Eligendi!
                </h2>
              </TabsContent>

              {/* tab content : reviews */}
              <TabsContent value="reviews" className={"space-y-2"}>
                {reviews.map((review) => (
                  <>
                    <div className="p-4 bg-gray-50 text-text rounded-lg">
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
              <h1 className="text-5xl font-medium text-text p-6">$200</h1>

              {/* subject name */}
              <Separator />
              <div className="flex justify-between px-6 py-2">
                <p className="flex items-center gap-2">
                  <BookOpen size={17} color="#004aad" />
                  Subject
                </p>
                <p className="text-right">Robotics</p>
              </div>

              {/* stipend */}
              <Separator />
              <div className="flex justify-between px-6 py-2">
                <p className="flex items-center gap-2">
                  <HandCoins size={17} color="#004aad" />
                  Stipend
                </p>
                <p className="text-right">$ 5000</p>
              </div>

              {/* service charge */}
              <Separator />
              <div className="flex justify-between px-6 py-2">
                <p className="flex items-center gap-2">
                  <CreditCard size={17} color="#004aad" />
                  Service Charge
                </p>
                <p className="text-right">$ 5000</p>
              </div>

              {/* Deadline */}
              <Separator />
              <div className="flex justify-between px-6 py-2">
                <p className="flex items-center gap-2">
                  <Calendar size={17} color="#004aad" />
                  Deadline
                </p>
                <p className="text-right">24 March, 2025</p>
              </div>

              <div className="p-6">
                <button className="w-full bg-Primary text-white text-xl font-medium py-2 rounded-xl cursor-pointer">
                  Apply Now
                </button>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
};

export default ScholarshipDetails;
