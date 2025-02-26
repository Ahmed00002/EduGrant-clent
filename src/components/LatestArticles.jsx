import { Clock, User } from "lucide-react";
import SectionTitle from "./shared/SectionTitle";
import { Button } from "./ui/button";

const LatestArticles = () => {
  return (
    <div className="center">
      <SectionTitle
        heading={"Our Blogs"}
        title={"Our Latest articles"}
        des={
          "Stay updated with the latest insights, tips, and trends in education and scholarships! ✨📚"
        }
      />
      {/* articles */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:grid-rows-6  mt-12 mb-12">
        {/* left side article 1 */}
        <div className="md:col-span-8 md:row-span-3 bg-white shadow-lg rounded-xl grid grid-cols-1 gap-4 md:grid-cols-12 p-4 ">
          <div className="md:col-span-4 ">
            <img
              className="aspect-video rounded-lg w-full h-[150px] object-cover"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPcTq0J6xmN6yxeLTydfedH_dKv7tgur6VBg&s"
              alt="girl reading book"
            />
          </div>
          {/* article content */}
          <div className="md:col-span-8 my-auto">
            {/* article post date */}
            <div className="flex gap-4 text-xs">
              <h1 className="flex items-center gap-1 text-text">
                <User size={12} color="blue" /> Admin
              </h1>
              <h1 className="flex items-center gap-1 text-text">
                <Clock size={12} color="blue" /> February 23, 2025
              </h1>
            </div>
            {/* article heading */}
            <h1 className="text-xl font-bold w-11/12 mt-2">
              Education Week News and Views on Education Policy and Practice.
            </h1>
            <Button
              className={
                "mt-4 bg-Primary hover:bg-transparent hover:text-Primary hover:border-[1px] border-Primary cursor-pointer"
              }
            >
              Read More
            </Button>
          </div>
        </div>

        {/* artilce 2 */}
        <div className="md:col-span-4 md:row-span-6 bg-white shadow-lg rounded-xl  p-4">
          {/* article thumbnail */}
          <div className="col-span-4">
            <img
              className="aspect-video rounded-lg w-full  object-cover"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR24fSHi1j1Las15L22jHPyD5Fhku2kuCrRFQ&s"
              alt="girl reading book"
            />
          </div>
          {/* article content */}
          <div className="col-span-8 my-auto mt-6">
            {/* article post date */}
            <div className="flex gap-4 text-xs">
              <h1 className="flex items-center gap-1 text-text">
                <User size={12} color="blue" /> Admin
              </h1>
              <h1 className="flex items-center gap-1 text-text">
                <Clock size={12} color="blue" /> February 12, 2025
              </h1>
            </div>
            {/* article heading */}
            <h1 className="text-xl font-bold w-11/12 mt-2">
              Study Abroad: Best Countries for Scholarship Opportunities
            </h1>
            <Button
              className={
                "mt-4 bg-Primary hover:bg-transparent hover:text-Primary hover:border-[1px] border-Primary cursor-pointer"
              }
            >
              Read More
            </Button>
          </div>
        </div>

        {/* article 3 */}
        <div className="md:col-span-8 md:row-span-3  bg-white shadow-lg rounded-xl grid grid-cols-1 gap-4 md:grid-cols-12 p-4">
          {/* image */}
          <div className="col-span-4">
            <img
              className="aspect-video rounded-lg w-full h-[150px] object-cover"
              src="https://media.licdn.com/dms/image/v2/D4D12AQHt_mkk5wU7wQ/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1706517796003?e=2147483647&v=beta&t=tsSz-Wfm2O51wrW141yVZAh4kRHaMEXGF96nE1N-QYQ"
              alt="girl reading book"
            />
          </div>
          {/* article content */}
          <div className="md:col-span-8 my-auto">
            {/* article post date */}
            <div className="flex gap-4 text-xs">
              <h1 className="flex items-center gap-1 text-text">
                <User size={12} color="blue" /> Admin
              </h1>
              <h1 className="flex items-center gap-1 text-text">
                <Clock size={12} color="blue" /> January 23, 2025
              </h1>
            </div>
            {/* article heading */}
            <h1 className="text-xl font-bold w-11/12 mt-2">
              Top 10 Scholarships You Should Apply for in 2024
            </h1>
            <Button
              className={
                "mt-4 bg-Primary hover:bg-transparent hover:text-Primary hover:border-[1px] border-Primary cursor-pointer"
              }
            >
              Read More
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LatestArticles;
