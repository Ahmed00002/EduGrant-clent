import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useEffect, useState } from "react";
import { PieChart, Pie, Legend, Cell } from "recharts";

const COLORS = ["#0088FE", "#00C49F"];

export default function GenderBasedChard() {
  const axiosSecure = useAxiosSecure();
  const [stat, setStat] = useState();

  const data = [
    { name: "Male", value: stat?.male },
    { name: "Female", value: stat?.female },
  ];

  useEffect(() => {
    axiosSecure.get("applications/stats").then((res) => setStat(res.data));
  }, [axiosSecure]);
  return (
    <PieChart width={400} height={250}>
      <Pie
        dataKey="value"
        startAngle={180}
        endAngle={0}
        data={data}
        outerRadius={80}
        cx="50%"
        cy="50%"
        label
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Legend />
    </PieChart>
  );
}
