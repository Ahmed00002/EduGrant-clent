import Marquee from "react-fast-marquee";

const Announcements = () => {
  const announcements = [
    {
      id: 1,
      icon: "📢",
      message:
        "New scholarship applications are now open! Apply before March 15.",
    },
    {
      id: 2,
      icon: "🎓",
      message:
        "Congratulations to the 2024 scholarship winners! Check your email for details.",
    },
    {
      id: 3,
      icon: "🚀",
      message:
        "Exclusive funding opportunity for STEM students! Don't miss out.",
    },
    {
      id: 4,
      icon: "📅",
      message: "Reminder: Scholarship deadline extended till April 5!",
    },
    {
      id: 5,
      icon: "🌍",
      message:
        "International students can now apply for the global scholarship program.",
    },
  ];

  return (
    <>
      <section className=" text-center py-2 bg-blue-50 space-y-4">
        <h1 className="uppercase text-xl font-bold text-Primary drop-shadow-md">
          Announcements
        </h1>

        <Marquee loop={0} speed={100} pauseOnHover={true}>
          {announcements.map((ann) => (
            <p className="mx-4 cursor-pointer" key={ann.id}>
              {ann.icon} {ann.message}
            </p>
          ))}
        </Marquee>
      </section>
    </>
  );
};

export default Announcements;
