import axios from "axios";

const useAxiosSecure = () => {
  const axiosPublic = axios.create({
    baseURL: "http://localhost:5000/",
  });
  return axiosPublic;
};

export default useAxiosSecure;
