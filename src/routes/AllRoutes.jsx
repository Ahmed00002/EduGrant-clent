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
import ManageScholarships from "@/pages/admin/ManageScholarships";
import AllUsers from "@/pages/admin/AllUsers";
import AllApplications from "@/pages/admin/AllApplications";
import AllReviews from "@/pages/admin/AllReviews";
import Scholarships from "@/pages/users/Scholarships";
import ScholarshipDetails from "@/pages/users/ScholarshipDetails";
import Payment from "@/pages/payment/Payment";
import NotFound from "@/pages/NotFound";
import useAxiosSecure from "@/hooks/useAxiosSecure";

const AllRoutes = () => {
  const axiosSecure = useAxiosSecure();
  return (
    <>
      <Routes>
        <Route path="*" element={<NotFound />} />

        {/* Users only routes */}
        <Route element={<HomeLayout />}>
          <Route index path="/" element={<HomePage />} />
          <Route path="/scholarships" element={<Scholarships />} />
          <Route path="/scholarships/:id" element={<ScholarshipDetails />} />
          <Route path="/scholarships/:id/checkout" element={<Payment />} />
        </Route>

        {/* user dashboard paths */}
        <Route element={<DashboardLayout />}>
          <Route index path="/dashboard/user/profile" element={<Profile />} />
          <Route
            path="/dashboard/user/applications"
            element={<Applications />}
          />
          <Route path="/dashboard/user/reviews" element={<Reviews />} />
        </Route>

        {/* Admins Only Routes */}
        <Route element={<DashboardLayout />}>
          <Route index path="/admin/profile" element={<Profile />} />
          <Route path="/admin/users" element={<AllUsers />} />
          <Route path="/admin/scholarships" element={<ManageScholarships />} />
          <Route
            path="/admin/scholarships/applications"
            element={<AllApplications />}
          />
          <Route path="/admin/scholarships/reviews" element={<AllReviews />} />
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
