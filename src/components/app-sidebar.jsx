import Logo from "../assets/logo/FavIcon.png";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  BookUser,
  ChevronsUpDown,
  LogOut,
  Star,
  Terminal,
  User,
} from "lucide-react";
import { Link, NavLink } from "react-router";

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <div className="flex items-center justify-center">
        <SidebarTrigger />
      </div>
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
        <div className="w-full sidebarMenu">
          <NavLink to={"/dashboard/profile"}>
            <SidebarMenuButton
              tooltip={"My Profile"}
              className={"mx-auto userDashMenu"}
            >
              <User size={30} />
              <span>My Profile</span>
            </SidebarMenuButton>
          </NavLink>
          <NavLink to={"/dashboard/applications"}>
            <SidebarMenuButton
              tooltip={"My Applications"}
              className={"mx-auto userDashMenu"}
            >
              <BookUser size={30} />
              <span>My Applications</span>
            </SidebarMenuButton>
          </NavLink>
          <NavLink to={"/dashboard/reviews"}>
            <SidebarMenuButton
              tooltip={"My Reviews"}
              className={"mx-auto userDashMenu"}
            >
              <Star size={30} />
              <span>My Reviews</span>
            </SidebarMenuButton>
          </NavLink>
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
