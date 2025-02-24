import Logo from "../assets/logo/FavIcon.png";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import {
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

export function AppSidebar() {
  const isAdmin = true;
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
      {/* <div className="flex items-center justify-center">
        <SidebarTrigger />
      </div> */}
      <SidebarHeader />
      <SidebarContent className={"flex items-center"}>
        <Link className="w-full" to={"/"}>
          <SidebarMenuButton
            size="lg"
            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
          >
            <div className="flex aspect-square mx-auto size-8 items-center justify-center rounded-lg bg-Primary">
              <img src={Logo} alt="site logo" />
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">EduGrant</span>
              <span className="truncate font-xs">Your Dream Ahead</span>
            </div>
          </SidebarMenuButton>
        </Link>

        {/* user options */}
        <div className="w-full sidebarMenu ">
          {isAdmin ? ModeratorORAdmin(true) : userRoutes}
        </div>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenuButton>
          <LogOut />
          <span>Logout</span>
        </SidebarMenuButton>
      </SidebarFooter>
      <SidebarFooter />
    </Sidebar>
  );
}
