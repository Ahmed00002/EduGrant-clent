import { Clock, User } from "lucide-react";
import { Button } from "../ui/button";

const ArticleCard = () => {
  return (
    <div>
      <div className="col-span-4 row-span-6 bg-white rounded-xl  p-4">
        <div className="col-span-4">
          <img
            className="aspect-video rounded-lg w-full  object-cover"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPcTq0J6xmN6yxeLTydfedH_dKv7tgur6VBg&s"
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
              <Clock size={12} color="blue" /> March j25, 2024
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
    </div>
  );
};

export default ArticleCard;
