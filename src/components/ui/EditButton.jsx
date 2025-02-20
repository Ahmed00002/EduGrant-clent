import { Pen } from "lucide-react";

const EditButton = () => {
  return (
    <>
      <div>
        <div className="flex gap-2 items-center text-xs px-4 border-[1px] py-1 rounded-md  cursor-pointer hover:bg-gray-100 transform-all duration-800">
          <Pen size={12} /> Edit
        </div>
      </div>
    </>
  );
};

export default EditButton;
