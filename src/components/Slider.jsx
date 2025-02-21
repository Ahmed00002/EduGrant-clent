import * as motion from "motion/react-client";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import { MoveLeft, MoveRight } from "lucide-react";
import { useRef } from "react";

const Slider = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  return (
    <div className="relative">
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        effect="fade"
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        modules={[EffectFade, Autoplay, Navigation]}
        className="h-[400px] 2xl:h-[600px]"
        onSwiper={(swiper) => {
          setTimeout(() => {
            if (swiper.params.navigation) {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
              swiper.navigation.init();
              swiper.navigation.update();
            }
          });
        }}
      >
        <SwiperSlide>
          <div className="relative">
            <img
              className="aspect-video h-full w-full object-cover"
              src="https://scholarship.kshec.kerala.gov.in/assets/index/assets/images/aq4.png"
              alt=""
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="aspect-video h-full w-full object-cover"
            src="https://www.utahtrooper.com/wp-content/uploads/2023/08/scholarship-program-img.jpg"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="aspect-video h-full w-full object-cover"
            src="https://mitwpu.edu.in/assets/frontend/images/scholarship-img1.jpg"
            alt=""
          />
        </SwiperSlide>
      </Swiper>
      {/* Custom Navigation Buttons */}
      <motion.button
        whileHover={{ translateX: -5 }}
        whileTap={{ translateX: 0 }}
        ref={prevRef}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-transparent text-white backdrop-blur-3xl px-4 rounded-full z-10 cursor-pointer"
      >
        <MoveLeft size={30} />
      </motion.button>
      <motion.button
        whileHover={{ translateX: 5 }}
        whileTap={{ translateX: 0 }}
        ref={nextRef}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-transparent backdrop-blur-3xl text-white px-4 rounded-full cursor-pointer  z-10"
      >
        <MoveRight size={30} />
      </motion.button>

      {/* banner text */}
      <div className="absolute top-0 left-0 z-[5] w-full h-full flex flex-col justify-center items-center bg-gradient-to-t from-black/70 to-black/10">
        <h1 className="text-Secondary font-medium text-xl">Welcome to the</h1>
        <h1 className="text-white text-5xl 2xl:text-7xl font-bold mb-3 font-inter">
          EduGrant Scholarships
        </h1>
        <h1 className="text-white text-md 2xl:text-lg">
          Empower the leaders of tomorrow through education
        </h1>
        <motion.button
          whileHover={{ translateY: -7 }}
          whileTap={{ translateY: 0 }}
          className={
            "bg-Secondary rounded-none mt-5 text-text py-2 px-4 cursor-pointer hover:shadow-lg shadow-Secondary"
          }
        >
          Apply Now
        </motion.button>
      </div>
    </div>
  );
};

export default Slider;
