import axios from "axios";

const useAxiosPublic = () => {
  const axiosPublic = axios.create({
    baseURL: "https://scholarships-server.vercel.app/apis/",
  });
  return axiosPublic;
};

export default useAxiosPublic;
