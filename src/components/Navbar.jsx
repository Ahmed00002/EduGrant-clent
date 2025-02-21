import * as motion from "motion/react-client";
import useCustomToast from "@/hooks/useCustomToast";
import logo from "../assets/logo/logo-01.png";
import { Link, NavLink, useNavigate } from "react-router";
import { Button } from "./ui/button";
import { LogOut, User } from "lucide-react";
import useAuth from "@/hooks/useAuth";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const toast = useCustomToast();

  // logout user
  const handleLogout = () => {
    logout()
      .then(() => {
        toast(
          "Successful!",
          "You have successfully logged out from your account"
        );
        navigate("/auth/login");
      })
      .catch(() => {
        toast(
          "Successful!",
          "You have successfully logged out from your account"
        );
      });
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
              className="h-[50px] md:h-[60px] 2xl:h-[70px]"
              src={logo}
              alt=""
            />
          </div>
          <div className="grow text-right space-x-4 navMenu">
            <NavLink to={"/"}>Home</NavLink>
            <NavLink to={"/scholarships"}>All Scholarship</NavLink>
            <NavLink to={"/dashboard/user/profile"}>Dashboard</NavLink>
          </div>
          <div>
            {!user ? (
              // login signup buttons
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
                      scale: {
                        type: "spring",
                        visualDuration: 0.4,
                        bounce: 0.5,
                      },
                    }}
                    whileTap={{ scale: 0.89 }}
                    className="bg-Secondary px-5 h-full text-text hover:bg-Secondary hover:text-text cursor-pointer rounded-full"
                  >
                    Register
                  </motion.button>
                </Link>
              </div>
            ) : (
              // user avatar
              <div>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Avatar>
                      <AvatarImage
                        className="rounded-full w-10 h-10 cursor-pointer"
                        src={user?.photoURL}
                      />
                      <AvatarFallback
                        className={`w-10 h-10 bg-gray-200 text-Primary rounded-full  flex justify-center items-center cursor-pointer ${
                          user.photoURL || "p-2"
                        }`}
                      >
                        {user?.displayName.split(" ")[0][0]}
                      </AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 mr-8 mt-4">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      {/* user name and avatar */}
                      <div className=" flex flex-col items-center gap-2 justify-center mt-4 my-2">
                        <Avatar>
                          <AvatarImage
                            className="rounded-full w-10 h-10 cursor-pointer"
                            src={user?.photoURL}
                          />
                          <AvatarFallback
                            className={`w-10 h-10 bg-gray-200 text-Primary rounded-full  flex justify-center items-center cursor-pointer ${
                              user.photoURL || "p-2"
                            }`}
                          >
                            {user?.displayName.split(" ")[0][0]}
                          </AvatarFallback>
                        </Avatar>
                        <h1 className="text-xs mx-auto">{user?.displayName}</h1>
                        <h1 className="text-xs mx-auto">{user?.email}</h1>
                      </div>
                      <Link to={"/dashboard/user/profile"}>
                        <DropdownMenuItem>
                          Profile
                          <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                        </DropdownMenuItem>
                      </Link>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Support</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      {" "}
                      <LogOut size={10} />
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
          </div>
        </section>
      </nav>
    </>
  );
};

export default Navbar;
