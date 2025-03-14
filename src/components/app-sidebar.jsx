import Logo from "../assets/logo/FavIcon.png";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import useUserRole from "@/hooks/useUserRole";
import {
  BarChart,
  BookUser,
  ClipboardCheck,
  GraduationCap,
  LogOut,
  PlusCircle,
  Star,
  User,
  Users,
} from "lucide-react";
import { Link, NavLink } from "react-router";
import { Card } from "./ui/card";

export function AppSidebar() {
  const { role } = useUserRole();

  const userRoutes = (
    <>
      <NavLink to={"/dashboard/user/profile"}>
        <SidebarMenuButton
          tooltip={"My Profile"}
          className={"mx-auto userDashMenu"}
        >
          <User size={30} />
          <span>My Profile</span>
        </SidebarMenuButton>
      </NavLink>
      <NavLink to={"/dashboard/user/applications"}>
        <SidebarMenuButton
          tooltip={"My Applications"}
          className={"mx-auto userDashMenu"}
        >
          <BookUser size={30} />
          <span>My Applications</span>
        </SidebarMenuButton>
      </NavLink>
      <NavLink to={"/dashboard/user/reviews"}>
        <SidebarMenuButton
          tooltip={"My Reviews"}
          className={"mx-auto userDashMenu"}
        >
          <Star size={30} />
          <span>My Reviews</span>
        </SidebarMenuButton>
      </NavLink>
    </>
  );
  const ModeratorORAdmin = (admin) => (
    <>
      <NavLink to={"/admin/stats"} end>
        <SidebarMenuButton
          tooltip={"My Profile"}
          className={"mx-auto userDashMenu py-4"}
        >
          <BarChart size={40} />
          <span>Statistics</span>
        </SidebarMenuButton>
      </NavLink>

      <NavLink to={"/admin/profile"} end>
        <SidebarMenuButton
          tooltip={"My Profile"}
          className={"mx-auto userDashMenu"}
        >
          <User size={30} />
          <span>My Profile</span>
        </SidebarMenuButton>
      </NavLink>

      {admin && (
        <NavLink to={"/admin/users"} end>
          <SidebarMenuButton
            tooltip={"My Profile"}
            className={"mx-auto userDashMenu"}
          >
            <Users size={30} />
            <span>Users</span>
          </SidebarMenuButton>
        </NavLink>
      )}

      <NavLink to={"/admin/scholarships/reviews"} end>
        <SidebarMenuButton
          tooltip={"My Reviews"}
          className={"mx-auto userDashMenu"}
        >
          <Star size={30} />
          <span>All reviews</span>
        </SidebarMenuButton>
      </NavLink>

      <NavLink to={"/admin/scholarships"} end>
        <SidebarMenuButton
          tooltip={"All Scholarships"}
          className={"mx-auto userDashMenu"}
        >
          <GraduationCap size={30} />
          <span>All Scholarship</span>
        </SidebarMenuButton>
      </NavLink>

      <NavLink to={"/admin/scholarships/add"} end>
        <SidebarMenuButton
          tooltip={"Add Scholarship"}
          className={"mx-auto userDashMenu"}
        >
          <PlusCircle size={30} />
          <span>Add Scholarship</span>
        </SidebarMenuButton>
      </NavLink>

      <NavLink to={"/admin/scholarships/applications"} end>
        <SidebarMenuButton
          tooltip={"My Reviews"}
          className={"mx-auto userDashMenu"}
        >
          <ClipboardCheck size={30} />
          <span>All applied Scholarship</span>
        </SidebarMenuButton>
      </NavLink>
    </>
  );
  return (
    <Sidebar collapsible="icon">
      {/* website logo */}
      <SidebarHeader>
        <Link className="p-0:" to={"/"}>
          <SidebarMenuButton
            size="lg"
            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground p-0 mx-auto"
          >
            <div className="flex aspect-square mx-auto size-12 p-2 items-center justify-center rounded-lg bg-Primary ">
              <img className="" src={Logo} alt="site logo" />
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight overflow-ellipsis">
              <span className="truncate font-semibold">EduGrant</span>
              <span className="truncate font-xs">Your Dream Ahead</span>
            </div>
          </SidebarMenuButton>
        </Link>
      </SidebarHeader>

      {/* sidebar contents */}
      <SidebarContent className={"flex items-center   px-2"}>
        {/* user options */}
        <Card className="w-full sidebarMenu bg-white h-full border-none rounded-xl p-2 my-2">
          {role.isAdmin || role.isModerator
            ? ModeratorORAdmin(role.isAdmin)
            : userRoutes}
        </Card>
      </SidebarContent>

      {/* sidebar footer */}
      <SidebarFooter className={"bg-white mx-2 shadow rounded-lg"}>
        <SidebarMenuButton>
          <LogOut />
          <span>Logout</span>
        </SidebarMenuButton>
      </SidebarFooter>
      <SidebarFooter />
    </Sidebar>
  );
}
