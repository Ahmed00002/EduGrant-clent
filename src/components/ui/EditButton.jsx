import { Pen } from "lucide-react";
import PropTypes from "prop-types";
import { RxCross2 } from "react-icons/rx";

const EditButton = ({ setMode, editMode }) => {
  return (
    <>
      <div className="flex gap-2">
        <div>
          <button
            className={`text-xs  px-2 border-[1px] py-1 rounded-md  cursor-pointer bg-green-500 text-white hover:bg-green-600 transform-all duration-800 ${
              editMode ? "block" : "hidden"
            }`}
          >
            Update
          </button>
        </div>
        <div
          onClick={setMode}
          className={`flex gap-2 items-center text-xs px-2 border-[1px] py-1 rounded-md  cursor-pointer hover:bg-gray-100 transform-all duration-800 `}
        >
          {editMode ? (
            <>
              <RxCross2 size={12} />
            </>
          ) : (
            <>
              <Pen size={12} /> Edit
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default EditButton;

EditButton.propTypes = {
  setMode: PropTypes.node,
  editMode: PropTypes.bool,
};
