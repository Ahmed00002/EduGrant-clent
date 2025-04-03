import { Route, Routes } from "react-router";
import HomeLayout from "../layouts/HomeLayout";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Forget from "../pages/Auth/Forget";
import DashboardLayout from "../layouts/DashboardLayout";
import HomePage from "../pages/users/HomePage";
import Profile from "@/pages/users/dashboard/Profile";
import Applications from "@/pages/users/dashboard/Applications";
import Reviews from "@/pages/users/dashboard/Reviews";
import ManageScholarships from "@/pages/admin/manage_Scholarships/ManageScholarships";
import AllUsers from "@/pages/admin/AllUsers";
import AllReviews from "@/pages/admin/AllReviews";
import Scholarships from "@/pages/users/Scholarships";
import ScholarshipDetails from "@/pages/users/ScholarshipDetails";
import Payment from "@/pages/payment/Payment";
import NotFound from "@/pages/NotFound";
import AddScholarship from "@/pages/admin/AddScholarship";
import PrivateRoutes from "./private/PrivateRoutes";
import AdminOnly from "./private/AdminOnly";
import ManageApplications from "@/pages/admin/manage_applications/ManageApplications";
import Stats from "@/pages/admin/Stats";
import PrivacyPolicy from "@/components/PrivacyPolicy";

const AllRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="*" element={<NotFound />} />

        {/* Users only routes */}
        <Route element={<HomeLayout />}>
          <Route index path="/" element={<HomePage />} />
          <Route path="/scholarships" element={<Scholarships />} />
          <Route
            path="/scholarships/:id"
            element={
              <PrivateRoutes>
                <ScholarshipDetails />
              </PrivateRoutes>
            }
          />
          <Route
            path="/scholarships/:id/checkout"
            element={
              <PrivateRoutes>
                <Payment />
              </PrivateRoutes>
            }
          />
          <Route path="/privacyPolicy" element={<PrivacyPolicy />} />
        </Route>

        {/* user dashboard paths */}
        <Route element={<DashboardLayout />}>
          <Route
            index
            path="/dashboard/user/profile"
            element={
              <PrivateRoutes>
                <Profile />
              </PrivateRoutes>
            }
          />
          <Route
            path="/dashboard/user/applications"
            element={<Applications />}
          />
          <Route
            path="/dashboard/user/reviews"
            element={
              <PrivateRoutes>
                <Reviews />
              </PrivateRoutes>
            }
          />
        </Route>

        {/* Admins Only Routes */}
        <Route element={<DashboardLayout />}>
          <Route
            index
            path="/admin/stats"
            element={
              <AdminOnly>
                <Stats />
              </AdminOnly>
            }
          />
          <Route
            path="/admin/profile"
            element={
              <AdminOnly>
                <Profile />
              </AdminOnly>
            }
          />
          <Route
            path="/admin/users"
            element={
              <AdminOnly>
                <AllUsers />
              </AdminOnly>
            }
          />
          <Route
            path="/admin/scholarships"
            element={
              <AdminOnly>
                <ManageScholarships />
              </AdminOnly>
            }
          />
          <Route
            path="/admin/scholarships/add"
            element={
              <AdminOnly>
                <AddScholarship />
              </AdminOnly>
            }
          />
          <Route
            path="/admin/scholarships/applications"
            element={
              <AdminOnly>
                <ManageApplications />
              </AdminOnly>
            }
          />
          <Route
            path="/admin/scholarships/reviews"
            element={
              <AdminOnly>
                <AllReviews />
              </AdminOnly>
            }
          />
        </Route>

        {/* authentication routes */}
        <Route element={<AuthLayout />}>
          <Route index path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
          <Route path="/auth/reset-pass" element={<Forget />} />
        </Route>
      </Routes>
    </>
  );
};

export default AllRoutes;
