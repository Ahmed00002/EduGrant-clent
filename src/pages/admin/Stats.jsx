import useAxiosSecure from "@/hooks/useAxiosSecure";
import { BookUser, GraduationCap, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { PieChart, Pie, Cell } from "recharts";
const Stats = () => {
  const axiosSecure = useAxiosSecure();
  const [stats, setStats] = useState();
  const data = [
    { name: "Group A", value: 400 },
    { name: "Group B", value: 300 },
    { name: "Group C", value: 300 },
    { name: "Group D", value: 200 },
  ];
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  useEffect(() => {
    axiosSecure.get("stats").then((res) => setStats(res.data));
  }, [axiosSecure]);

  return (
    <>
      <section className=" bg-white rounded-lg p-6 font-inter">
        <h1 className="mb-6 text-3xl font-bold">Statistics</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* total users */}
          <div className="flex justify-between items-center bg-white p-4 rounded-lg drop-shadow-xl">
            <div className="bg-Primary p-4 rounded-lg text-white">
              <Users />
            </div>
            <div className="text-right">
              <p className="text-gray-500 font-thin font-inter">Total Users</p>
              <h1 className="text-4xl font-medium text-text">
                {stats?.totalUsers || "0"}
              </h1>
            </div>
          </div>
          {/* total users */}
          <div className="flex justify-between items-center bg-white p-4 rounded-lg drop-shadow-xl">
            <div className="bg-Primary p-4 rounded-lg text-white">
              <GraduationCap />
            </div>
            <div className="text-right">
              <p className="text-gray-500 font-thin font-inter">
                Total Scholarships
              </p>
              <h1 className="text-4xl font-medium text-text">
                {stats?.totalScholarships || "0"}
              </h1>
            </div>
          </div>

          {/* total applications */}
          <div className="flex justify-between items-center bg-white p-4 rounded-lg drop-shadow-xl">
            <div className="bg-Primary p-4 rounded-lg text-white">
              <BookUser />
            </div>
            <div className="text-right">
              <p className="text-gray-500 font-thin font-inter">
                Total Applications
              </p>
              <h1 className="text-4xl font-medium text-text">
                {stats?.totalApplications || "0"}
              </h1>
            </div>
          </div>
        </div>
        <PieChart width={800} height={400}>
          <Pie
            data={data}
            cx={120}
            cy={200}
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Pie
            data={data}
            cx={420}
            cy={200}
            startAngle={180}
            endAngle={0}
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </section>
    </>
  );
};

export default Stats;
