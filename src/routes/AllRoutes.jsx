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
        </Route>

        {/* Admins Only Routes */}
        <Route element={<DashboardLayout />}>
          <Route index path="/admin/stats" element={<h1>Dashboard</h1>} />
        </Route>

        {/* authentication routes */}
        <Route element={<AuthLayout />}>
          <Route index path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forget-pass" element={<Forget />} />
        </Route>
      </Routes>
    </>
  );
};

export default AllRoutes;
