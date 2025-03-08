import useAxiosSecure from "@/hooks/useAxiosSecure";
import { Tooltip } from "@radix-ui/react-tooltip";
import { useEffect, useState } from "react";
import {
  Legend,
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  Bar,
} from "recharts";

// const COLORS = ["#0088FE", "#00C49F"];

export default function GenderBasedChard() {
  const axiosSecure = useAxiosSecure();
  const [stat, setStat] = useState();

  useEffect(() => {
    axiosSecure.get("applications/stats").then((res) => setStat(res.data));
  }, [axiosSecure]);

  const data = [
    { name: "Male", value: stat?.male },
    { name: "Female", value: stat?.female },
    { name: "Others", value: 0 },
  ];

  return (
    // <PieChart width={400} height={250}>
    //   <Pie
    //     dataKey="value"
    //     startAngle={180}
    //     endAngle={0}
    //     data={data}
    //     outerRadius={80}
    //     cx="50%"
    //     cy="50%"
    //     label
    //   >
    //     {data.map((entry, index) => (
    //       <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
    //     ))}
    //   </Pie>
    //   <Legend />
    // </PieChart>

    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey={"value"} fill="#4A90E2" barSize={50} />
      </BarChart>
    </ResponsiveContainer>
  );
}
