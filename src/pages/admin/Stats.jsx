import GenderBasedChart from "@/components/GenderBasedChard";
import SetPageTitle from "@/components/shared/SetPageTitle";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { BookUser, GraduationCap, Users } from "lucide-react";
// import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";
import { useEffect, useState } from "react";
const Stats = () => {
  const axiosSecure = useAxiosSecure();
  const [stats, setStats] = useState();

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

        <div className="grid md:grid-cols-3 lg:grid-cols-4">
          <div className="drop-shadow-xl mt-6 rounded-lg bg-white flex flex-col justify-center items-center p-4">
            <h1 className="text-left w-full text-xl font-medium text-gray-500">
              Applicants Gender
            </h1>
            <GenderBasedChart />
          </div>
        </div>
      </section>
      <SetPageTitle title={"Statistics"} />
    </>
  );
};

export default Stats;
