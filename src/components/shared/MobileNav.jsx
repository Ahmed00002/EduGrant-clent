import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import useUserRole from "@/hooks/useUserRole";
import { Menu } from "lucide-react";
import { NavLink } from "react-router";
import logo from "../../assets/logo/logo-01.png";

const MobileDrawer = () => {
  const { role } = useUserRole();
  return (
    <Drawer direction="left">
      <DrawerTrigger className="p-2 rounded-md bg-transparent hover:bg-gray-200 transition">
        <Menu className="w-6 h-6" />
      </DrawerTrigger>
      <DrawerContent className="">
        <div className="w-full bg-Primary py-2 px-2">
          <img
            className="h-[50px] md:h-[60px] 2xl:h-[70px]"
            src={logo}
            alt=""
          />
        </div>
        <section className="mt-6">
          <div className="flex flex-col space-y-4 navMenuM">
            <NavLink className={"px-2 py-2"} to={"/"}>
              Home
            </NavLink>
            <NavLink className={"px-2 py-2"} to={"/scholarships"}>
              All Scholarship
            </NavLink>
            <NavLink
              className={"px-2 py-2"}
              to={
                role?.isAdmin || role?.isModerator
                  ? "/admin/stats"
                  : "/dashboard/user/profile"
              }
            >
              Dashboard
            </NavLink>
          </div>
        </section>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileDrawer;
