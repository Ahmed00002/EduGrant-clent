import PageHeader from "@/components/PageHeader";
import ScholarshipCard from "@/components/shared/SholarshipCard";
import { Search } from "lucide-react";
import svg from "@/assets/graduate.svg";
import useScholarshipsLoader from "@/hooks/useScholarshipsLoader";
import ScholarshipCardSkeleton from "@/components/shared/ScholarshipCardSkeleton";

const Scholarships = () => {
  const { scholarships, isLoading } = useScholarshipsLoader();
  return (
    <>
      <section className="mb-12">
        <div className="relative">
          <PageHeader
            title={"All Scholarships"}
            subTitle={"Here is our all scholarships for you"}
          />
          <div className="flex items-center w-11/12 md:w-10/12  lg:w-9/12 mx-auto p-4 gap-2 border-[1px] rounded-lg absolute top-full -translate-y-1/2 left-1/2 -translate-x-1/2 bg-white shadow-lg">
            <Search />
            <input
              type="search"
              className=" w-full outline-none "
              placeholder="University, Degree, location"
            />
            <img
              className="absolute bottom-full h-20 w-full mx-auto"
              src={svg}
              alt=""
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 2xl:grid-cols-4 gap-4 mt-16 center">
          {scholarships.map((scholarship, idx) => {
            return <ScholarshipCard key={idx} scholarship={scholarship} />;
          })}
          {isLoading && (
            <>
              <ScholarshipCardSkeleton />
              <ScholarshipCardSkeleton />
              <ScholarshipCardSkeleton />
              <ScholarshipCardSkeleton />
              <ScholarshipCardSkeleton />
              <ScholarshipCardSkeleton />
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default Scholarships;
