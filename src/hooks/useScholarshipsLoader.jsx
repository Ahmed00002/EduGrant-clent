import useAxiosSecure from "./useAxiosSecure";
import { useEffect, useState } from "react";
import useCustomToast from "./useCustomToast";

const useScholarshipsLoader = () => {
  const axiosSecure = useAxiosSecure();
  const customToast = useCustomToast();
  const [scholarships, setScholarships] = useState([]);
  useEffect(() => {
    axiosSecure
      .get("/scholarships")
      .then((res) => setScholarships(res.data))
      .catch((e) => {
        customToast("Opps!", e.response.data.message);
      });
  }, []);

  return scholarships;
};

export default useScholarshipsLoader;
