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

const AllRoutes = () => {
  return (
    <>
      <Routes>
        {/* Users only routes */}
        <Route element={<HomeLayout />}>
          <Route index path="/" element={<HomePage />} />

          <Route index path="/scholarships" element={<p>scholarships</p>} />
        </Route>

        {/* Admins Only Routes */}
        <Route element={<DashboardLayout />}>
          <Route index path="/dashboard" element={<DashboardLayout />} />
          <Route path="/dashboard/profile" element={<Profile />} />
          <Route path="/dashboard/applications" element={<Applications />} />
          <Route path="/dashboard/reviews" element={<Reviews />} />
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
