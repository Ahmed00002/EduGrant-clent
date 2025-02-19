import * as motion from "motion/react-client";
import useCustomToast from "@/hooks/useCustomToast";
import logo from "../assets/logo/logo-01.png";
import { Link, NavLink } from "react-router";
import { Button } from "./ui/button";
import { User } from "lucide-react";

const Navbar = () => {
  const toast = useCustomToast();
  const handleToast = () => {
    toast("hello", "worked");
  };
  return (
    <>
      {/**
       * Navbar- the navbar will contain
       * one logo left side
       * the right side should contain
       * ( Home, All Scholarship, User Dashboard (private), Admin Dashboard(private), and Login & Logout Button ( will show according to user login).
       */}
      <nav className="bg-Primary text-PrimaryContent font-inter sticky top-0 left-0 z-50 w-full">
        <section className=" flex justify-between gap-4 items-center center">
          <div>
            <img
              onClick={handleToast}
              className="h-[50px] md:h-[60px] 2xl:h-[70px]"
              src={logo}
              alt=""
            />
          </div>
          <div className="grow text-right space-x-4 navMenu">
            <NavLink to={"/"}>Home</NavLink>
            <NavLink to={"/scholarships"}>All Scholarship</NavLink>
            <NavLink to={"/dashboard"}>Dashboard</NavLink>
          </div>
          <div>
            <div className="flex  gap-4">
              <Link to={"/auth/login"}>
                <Button
                  variant="ghost"
                  className="bg-transparent hover:bg-transparent hover:text-Secondary cursor-pointer"
                >
                  <User />
                  Login
                </Button>
              </Link>

              <Link to={"/auth/register"}>
                <motion.button
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.4,
                    scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
                  }}
                  whileTap={{ scale: 0.89 }}
                  className="bg-Secondary px-5 h-full text-text hover:bg-Secondary hover:text-text cursor-pointer rounded-full"
                >
                  Register
                </motion.button>
              </Link>
            </div>
          </div>
        </section>
      </nav>
    </>
  );
};

export default Navbar;
