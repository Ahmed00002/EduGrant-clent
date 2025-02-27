import axios from "axios";

// import useAuth from "@/hooks/useAuth";

const axiosSecure = axios.create({
  // baseURL: "https://scholarships-server.vercel.app/apis/",
  baseURL: "http://localhost:5000/apis/",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  },
});
const useAxiosSecure = () => {
  return axiosSecure;
};

export default useAxiosSecure;
