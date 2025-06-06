import PropTypes from "prop-types";
import { Helmet } from "react-helmet";

const SetPageTitle = ({ title }) => {
  return (
    <div>
      <Helmet>
        <title>{title} - EduGrant</title>
      </Helmet>
    </div>
  );
};

export default SetPageTitle;

SetPageTitle.propTypes = {
  title: PropTypes.string,
};
