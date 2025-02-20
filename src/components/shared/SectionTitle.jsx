import PropTypes from "prop-types";

const SectionTitle = ({ heading, title, des }) => {
  return (
    <>
      <div className="flex flex-col justify-center items-center ">
        <p className="text-sm bg-Secondary uppercase rounded-xs text-text inline px-2">
          {heading}
        </p>
        <h1 className="text-4xl font-inter capitalize mt-4 font-medium text-text">
          {title}
        </h1>
        <p className="mt-2 text-gray-500 text-[14px]">{des}</p>
      </div>
    </>
  );
};

export default SectionTitle;

SectionTitle.propTypes = {
  title: PropTypes.string,
  heading: PropTypes.string,
  des: PropTypes.string,
};
