import useAxiosSecure from "./useAxiosSecure";
import { useEffect, useState } from "react";
import useCustomToast from "./useCustomToast";
import { useQuery } from "@tanstack/react-query";

const useScholarshipsLoader = () => {
  const axiosSecure = useAxiosSecure();
  const customToast = useCustomToast();
  // useEffect(() => {
  //   axiosSecure
  //     .get("/scholarships")
  //     .then((res) => setScholarships(res.data))
  //     .catch((e) => {
  //       customToast("Opps!", e.response.data.message);
  //     });
  // }, []);

  const { data: scholarships = [], refetch } = useQuery({
    queryKey: ["scholarships"],
    queryFn: async () => {
      const res = await axiosSecure.get("/scholarships");
      return res.data;
    },
  });

  return { scholarships, refetch };
};

export default useScholarshipsLoader;
