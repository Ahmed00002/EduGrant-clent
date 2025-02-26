import PropTypes from "prop-types";

const TopLoader = ({ status }) => {
  return (
    <div className="absolute top-0 left-0 w-full mx-auto flex justify-center items-center z-50 space-y-4">
      <div className="px-4 py-1 mt-6 mx-auto bg-Primary text-white rounded-full drop-shadow-lg flex justify-center items-center gap-2">
        <div className="loader"></div>
        <p className="tex-md font-medium">{status}</p>
      </div>
    </div>
  );
};

export default TopLoader;
TopLoader.propTypes = {
  status: PropTypes.string,
};
