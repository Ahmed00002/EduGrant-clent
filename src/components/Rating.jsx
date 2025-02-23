import PropTypes from "prop-types";
import { useState } from "react";
import { FaStar } from "react-icons/fa";

const Rating = ({ ratingData }) => {
  const { rating, setRating } = ratingData;
  //   making rating stars
  const [hoverValue, setHoverValue] = useState(null);
  const colors = {
    orange: "#F2C265",
    grey: "a9a9a9",
  };
  const stars = Array(5).fill(0);

  const handleMouseOverStar = (value) => {
    setHoverValue(value);
  };

  const handleMouseLeaveStar = () => {
    setHoverValue(null);
  };

  const handleClickStar = (value) => {
    setRating(value);
  };

  return (
    <>
      <div className="flex">
        {stars.map((_, idx) => {
          return (
            <FaStar
              className="cursor-pointer"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              onClick={() => handleClickStar(idx + 1)}
              onMouseOver={() => handleMouseOverStar(idx + 1)}
              onMouseLeave={() => handleMouseLeaveStar}
              key={idx}
              size={24}
              color={rating > idx ? colors.orange : colors.grey}
            />
          );
        })}
      </div>
    </>
  );
};

export default Rating;

Rating.propTypes = {
  //   rating: PropTypes.number,
  //   setRating: PropTypes.func,
  ratingData: PropTypes.object,
};
