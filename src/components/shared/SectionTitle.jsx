import PropTypes from "prop-types";

const SectionTitle = ({ heading, title }) => {
  return (
    <>
      <div className="flex flex-col justify-center items-center ">
        <p className="text-sm bg-blue-200 uppercase rounded-xs text-text inline px-2">
          {heading}
        </p>
        <h1 className="text-4xl font-inter capitalize mt-4 font-medium text-text">
          {title}
        </h1>
      </div>
    </>
  );
};

export default SectionTitle;

SectionTitle.propTypes = {
  title: PropTypes.string,
  heading: PropTypes.string,
};
