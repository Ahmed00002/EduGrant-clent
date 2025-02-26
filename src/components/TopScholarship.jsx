import useTopScholarships from "@/hooks/useTopScholarship";
import SectionTitle from "./shared/SectionTitle";
import ScholarshipCard from "./shared/SholarshipCard";
import ScholarshipCardSkeleton from "./shared/ScholarshipCardSkeleton";

const TopScholarship = () => {
  const { topScholarships, isLoading } = useTopScholarships();

  return (
    <>
      <section className="center my-24">
        {/* section title */}
        <SectionTitle
          title={"Top Scholarships for You"}
          heading={"top scholarships"}
          des={
            "Discover top scholarships to fund your education and achieve your dreams!🎓"
          }
        />

        <div className="grid grid-cols-1 md:grid-cols-3 2xl:grid-cols-4 gap-4 mt-12">
          {topScholarships.map((scholarship, idx) => {
            return <ScholarshipCard key={idx} scholarship={scholarship} />;
          })}
          {isLoading && (
            <>
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

export default TopScholarship;
