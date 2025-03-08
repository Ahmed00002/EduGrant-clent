import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Outlet, useLocation } from "react-router";

const DashboardLayout = () => {
  const location = useLocation();

  return (
    <>
      <SidebarProvider className="bg-PrimaryContent">
        <div className="flex w-full">
          {/* Sidebar */}
          <AppSidebar />

          {/* Main Content */}
          <main className="flex-1 w-full ">
            <div className="flex items-center sticky top-0 z-50 bg-white shadow-md p-4 mx-4 mt-4 rounded-lg">
              <SidebarTrigger />
              <h2 className="uppercase">
                Dashboard/{location.pathname.split("/")[2]}
              </h2>
            </div>
            <div className="p-4">
              <Outlet />
            </div>
          </main>
        </div>
      </SidebarProvider>
    </>
  );
};

export default DashboardLayout;
