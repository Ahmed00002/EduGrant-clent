import GenderBasedChart from "@/components/GenderBasedChard";
import StatCard from "@/components/shared/Admin/StatCard";
import SetPageTitle from "@/components/shared/SetPageTitle";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { BookUser, GraduationCap, Users } from "lucide-react";
// import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";
import { useEffect, useState } from "react";
const Stats = () => {
  const axiosSecure = useAxiosSecure();
  const [stats, setStats] = useState();

  useEffect(() => {
    axiosSecure.get("/stats").then((res) => setStats(res.data));
  }, [axiosSecure]);

  return (
    <>
      <section className="  rounded-lg font-inter">
        {/* <h1 className="mb-6 text-3xl font-bold">Statistics</h1> */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Total Users */}
          <StatCard
            title={"Total Users"}
            data={stats?.totalUsers}
            icon={<Users />}
          />

          {/* Total scholarship card */}
          <StatCard
            title={"Total Scholarships"}
            data={stats?.totalScholarships}
            icon={<GraduationCap />}
          />

          {/* Total Applications card */}
          <StatCard
            title={"Total Applications"}
            data={stats?.totalApplications}
            icon={<BookUser />}
          />
        </div>

        <div className="">
          <div className="drop-shadow mt-6 rounded-lg bg-white flex flex-col justify-center items-center p-4">
            <h1 className="text-left w-full text-xl font-medium text-gray-500">
              Applicants
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
