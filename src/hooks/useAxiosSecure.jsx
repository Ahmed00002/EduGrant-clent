import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router";
import { useEffect } from "react";

const axiosSecure = axios.create({
  baseURL: "https://scholarships-server.vercel.app/apis/",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  },
});
const useAxiosSecure = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    axiosSecure.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.status === 401 || error.status === 403) {
          logout().then(() => navigate("/auth/login"));
        }

        return Promise.reject(error);
      }
    );
  }, [logout, navigate]);
  return axiosSecure;
};

export default useAxiosSecure;
