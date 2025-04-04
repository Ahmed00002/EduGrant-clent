import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Outlet } from "react-router";
import { Bell, Search } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import useAuth from "@/hooks/useAuth";
import useUserRole from "@/hooks/useUserRole";

const DashboardLayout = () => {
  // const location = useLocation();
  const { user } = useAuth();
  const { role } = useUserRole();

  return (
    <>
      <SidebarProvider className="bg-PrimaryContent">
        <div className="flex w-full">
          {/* Sidebar */}
          <AppSidebar />

          {/* Main Content */}
          <main className="flex-1 w-full ">
            <div className=" lg:ml-2 flex items-center gap-2 sticky top-0 md:top-2 z-50 p-2 md:p-[13px] rounded-none md:rounded-lg bg-white/10 backdrop-blur-2xl shadow md:mt-2 md:mr-2">
              <SidebarTrigger />
              {/* menus */}
              <div className="flex items-center justify-between w-full">
                <form>
                  <div className="flex items-center gap-2 border px-2 text-gray-500 rounded-full max-w-">
                    <Search size={15} />
                    <input
                      className="text-sm py-2 ring-0 outline-0"
                      type="text"
                      placeholder="Search"
                    />
                  </div>
                </form>
                {/* notification */}
                <div className="flex items-center gap-4">
                  <div className="relative z-0">
                    <Bell className="cursor-pointer text-Primary" size={20} />
                    <div className="size-4 bg-red-500 flex items-center justify-center text-xs text-white rounded-full absolute -top-2 -right-1">
                      0
                    </div>
                  </div>

                  {/* avatar */}
                  <Avatar>
                    <AvatarImage
                      className="rounded-full size-9 cursor-pointer"
                      src={user?.photoURL}
                    />
                    <AvatarFallback>DP</AvatarFallback>
                  </Avatar>
                  <div className="hidden md:block">
                    <h1 className="text-sm text-text font-medium">
                      {user?.displayName}
                    </h1>
                    <p className={"text-xs text-text"}>
                      {role.isAdmin
                        ? "Admin"
                        : role.isModerator
                        ? "Moderator"
                        : ""}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-2 sm:px-2 md:pl-[2px] md:pr-2  lg:px-2">
              <Outlet />
            </div>
          </main>
        </div>
      </SidebarProvider>
    </>
  );
};

export default DashboardLayout;
