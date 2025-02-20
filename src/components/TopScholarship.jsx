import SectionTitle from "./shared/SectionTitle";
import ScholarshipCard from "./shared/SholarshipCard";

const TopScholarship = () => {
  const scholarships = [
    {
      university: "Harvard University",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdiHyjeFpUq_H80ouavcJV5O1q86-3HLOqKTrCG8zvQPwRSIOi-IaEIwlcroVUFl4zno8&usqp=CAU",
      category: "Full Scholarship",
      location: "USA, Cambridge",
      deadline: "2025-03-15",
      subject: "Computer Science",
      description: "A prestigious scholarship for outstanding students in CS.",
      stipend: "$2000/month",
      postDate: "2025-02-10",
      serviceCharge: "Free",
      applicationFees: "$50",
    },
    {
      university: "Oxford University",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdiHyjeFpUq_H80ouavcJV5O1q86-3HLOqKTrCG8zvQPwRSIOi-IaEIwlcroVUFl4zno8&usqp=CAU",
      category: "Partial Scholarship",
      location: "UK, Oxford",
      deadline: "2025-04-20",
      subject: "Law",
      description: "Scholarship covering 50% tuition fees for Law students.",
      stipend: "$1000/month",
      postDate: "2025-02-12",
      serviceCharge: "$100",
      applicationFees: "$30",
    },
    {
      university: "Stanford University",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdiHyjeFpUq_H80ouavcJV5O1q86-3HLOqKTrCG8zvQPwRSIOi-IaEIwlcroVUFl4zno8&usqp=CAU",
      category: "Merit-based Scholarship",
      location: "USA, California",
      deadline: "2025-05-10",
      subject: "Engineering",
      description: "For top students excelling in Engineering disciplines.",
      stipend: "$2500/month",
      postDate: "2025-02-14",
      serviceCharge: "$150",
      applicationFees: "$40",
    },
    {
      university: "University of Toronto",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdiHyjeFpUq_H80ouavcJV5O1q86-3HLOqKTrCG8zvQPwRSIOi-IaEIwlcroVUFl4zno8&usqp=CAU",
      category: "Need-based Scholarship",
      location: "Canada, Toronto",
      deadline: "2025-06-05",
      subject: "Business Administration",
      description:
        "Need-based funding for students with financial constraints.",
      stipend: "$1800/month",
      postDate: "2025-02-18",
      serviceCharge: "$80",
      applicationFees: "$35",
    },
    {
      university: "National University of Singapore",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdiHyjeFpUq_H80ouavcJV5O1q86-3HLOqKTrCG8zvQPwRSIOi-IaEIwlcroVUFl4zno8&usqp=CAU",
      category: "Research Grant",
      location: "Singapore",
      deadline: "2025-07-15",
      subject: "Biotechnology",
      description: "A research-based scholarship for PhD students in Biotech.",
      stipend: "$2200/month",
      postDate: "2025-02-20",
      serviceCharge: "$120",
      applicationFees: "$60",
    },
  ];

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
          {scholarships.map((scholarship, idx) => {
            return <ScholarshipCard key={idx} scholarship={scholarship} />;
          })}
        </div>
      </section>
    </>
  );
};

export default TopScholarship;
