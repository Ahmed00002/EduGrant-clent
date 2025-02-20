import { Route, Routes } from "react-router";
import HomeLayout from "../layouts/HomeLayout";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Forget from "../pages/Auth/Forget";
import DashboardLayout from "../layouts/DashboardLayout";
import HomePage from "../pages/users/HomePage";

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
          <Route path="/dashboard/profile" element={<p>Profile</p>} />
          <Route path="/dashboard/applications" element={<p>applications</p>} />
          <Route path="/dashboard/reviews" element={<p>reviews</p>} />
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
