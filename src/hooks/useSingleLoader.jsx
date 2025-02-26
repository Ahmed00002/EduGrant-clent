// import { useEffect, useState } from "react";
import useAxiosSecure from "./useAxiosSecure";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";

const useSingleLoader = () => {
  const axiosSecure = useAxiosSecure();
  const param = useParams();

  const {
    data: scholarship = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["scholarships", param.id],
    queryFn: async () => {
      try {
        const res = await axiosSecure.get(`scholarships/${param.id}`);
        return res.data;
      } catch (error) {
        console.log(error);
        return [];
      }
    },
  });

  return { scholarship, refetch, isLoading };
};

export default useSingleLoader;
