import { Sparkle, Trophy } from "lucide-react";
import * as motion from "motion/react-client";
import PropTypes from "prop-types";

const PageHeader = ({ title, subTitle }) => {
  return (
    <>
      <section className="bg-[#f5f5f5] h-[350px] flex flex-col justify-center items-center space-y-2 relative overflow-hidden ">
        <motion.div
          animate={{ rotate: [0, -90, 90], scale: [1, 0.2, 1] }}
          transition={{
            duration: 5,
            delay: 1,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          <Sparkle size={40} color="pink" />
        </motion.div>
        <h1 className="text-5xl font-inter font-bold">{title}</h1>
        <h1>{subTitle}</h1>
        <div className="absolute -right-10 -translate-x-2 bottom-0 translate-y-3 -rotate-45">
          <Trophy size={100} color="#ffd700" />
        </div>
      </section>
    </>
  );
};

export default PageHeader;
PageHeader.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string,
};
