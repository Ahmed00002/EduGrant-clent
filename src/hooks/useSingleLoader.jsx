import { useEffect, useState } from "react";
import useAxiosSecure from "./useAxiosSecure";
import { useParams } from "react-router";

const useSingleLoader = () => {
  const axiosSecure = useAxiosSecure();
  const [data, setData] = useState([]);
  const param = useParams();
  useEffect(() => {
    const loadData = async () => {
      const res = await axiosSecure.get(`/scholarships/${param.id}`);
      setData(res.data);
    };
    loadData();
  }, [axiosSecure, param.id]);
  return data;
};

export default useSingleLoader;
