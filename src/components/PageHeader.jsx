import { Sparkle, Trophy } from "lucide-react";
import * as motion from "motion/react-client";
import PropTypes from "prop-types";
import headerBg from "../assets/headerBg.svg";

const PageHeader = ({ title, subTitle }) => {
  return (
    <>
      <section
        style={{
          backgroundImage: `url(${headerBg})`,
        }}
        className={` h-[350px]  flex flex-col justify-center items-center space-y-2 relative overflow-hidden bg-cover bg-center`}
      >
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
        <motion.h1
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{
            duration: 0.3,
          }}
          className="text-5xl font-inter font-bold"
        >
          {title}
        </motion.h1>
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
