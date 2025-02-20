import SetPageTitle from "../../components/shared/SetPageTitle";
import { useForm } from "react-hook-form";
import { FaFacebookF, FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router";
import * as motion from "motion/react-client";
import Lottie from "lottie-react";
import loginLottie from "../../assets/lottie/login.json";
import { useEffect, useState } from "react";

const Register = () => {
  const { register, handleSubmit } = useForm();
  const [isExit, setIsExit] = useState(false);
  const navigate = useNavigate();
  const loginWithEmailPass = (data) => {
    console.log(data);
  };
  useEffect(() => {
    setIsExit(false);
  }, []);
  const handleNavigate = () => {
    setIsExit(true);
    setTimeout(() => {
      navigate("/auth/login");
      // Logic to hide or navigate away after animation ends
    }, 500); // Corresponds to the 3s duration in transition
  };
  return (
    <>
      <SetPageTitle title={"Login"} />
      <motion.section
        initial={isExit ? { y: 0, opacity: 1 } : { y: -50, opacity: 0 }}
        animate={isExit ? { y: -50, opacity: 0 } : { y: 0, opacity: 1 }}
        transition={{
          duration: 0.5,
          delay: 0,
          ease: [0, 0.71, 0.2, 1.01],
        }}
        className="h-screen flex justify-center items-center"
      >
        <div className="flex flex-wrap items-center justify-center lg:justify-between w-full max-w-5xl p-4 md:p-0">
          {/* Left Side Image */}
          <div className="hidden md:block md:w-6/12">
            <Lottie animationData={loginLottie} loop={true} />
          </div>

          {/* Right Side Form */}
          <div className="w-full md:w-5/12 p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-xl font-inter font-semibold mb-2 text-center">
              Join Us Today
            </h2>
            <p className="text-center text-md text-gray-500">
              Your future scholarship is just a click away
            </p>

            {/* Social Login Buttons */}
            <div className="flex  items-center gap-4 mt-6">
              <p>Sign in with</p>
              <motion.button
                whileHover={{ translateY: -5 }}
                whileTap={{ translateY: 0 }}
                className="bg-blue-600 text-white p-2 rounded-full w-10 h-10 flex justify-center items-center cursor-pointer hover:shadow-lg shadow-Secondary"
              >
                <FaFacebookF />
              </motion.button>
              <motion.button
                whileHover={{ translateY: -5 }}
                whileTap={{ translateY: 0 }}
                className="bg-blue-600 text-white p-2 rounded-full w-10 h-10 flex justify-center items-center cursor-pointer hover:shadow-lg shadow-Secondary"
              >
                <FaGoogle />
              </motion.button>
            </div>

            {/* Divider */}
            <div className="flex items-center my-4">
              <hr className="flex-1 border-t" />
              <p className="mx-2 text-sm">Or</p>
              <hr className="flex-1 border-t" />
            </div>

            {/* login form */}
            <form onSubmit={handleSubmit(loginWithEmailPass)}>
              {/* name Input */}
              <input
                {...register("name", { required: true })}
                type="text"
                className="w-full p-2 mb-3 border rounded-md"
                placeholder="Jhon Doe"
              />
              {/* Email Input */}
              <input
                {...register("email", { required: true })}
                type="email"
                className="w-full p-2 mb-3 border rounded-md"
                placeholder="exaple@gmail.com"
              />
              {/* photo url Input */}
              <input
                {...register("photoURL", { required: true })}
                type="url"
                className="w-full p-2 mb-3 border rounded-md"
                placeholder="https://photo.com"
              />

              {/* Password Input */}
              <input
                {...register("password", { required: true })}
                type="password"
                className="w-full p-2 mb-3 border rounded-md"
                placeholder="********"
              />

              {/* Login Button */}
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 1 }}
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 cursor-pointerf hover:shadow-lg shadow-Primary mt-4"
              >
                Register
              </motion.button>
            </form>

            {/* Register Link */}
            <p className="text-sm text-center mt-4 cursor-pointer">
              Have an account?{" "}
              <span onClick={handleNavigate} className="text-blue-600">
                Login
              </span>
            </p>
          </div>
        </div>
      </motion.section>
    </>
  );
};

export default Register;
