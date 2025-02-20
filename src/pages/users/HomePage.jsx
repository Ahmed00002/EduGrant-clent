// import { useContext } from "react";
// import { AuthContext } from "../../contexts/contexts";
import Slider from "@/components/Slider";
import Announcements from "@/components/shared/Announcements";
import TopScholarship from "@/components/TopScholarship";
import LatestArticles from "@/components/LatestArticles";

const HomePage = () => {
  // const { name } = useContext(AuthContext);
  return (
    <>
      <header>
        <Slider />
        <Announcements />
      </header>
      <TopScholarship />
      <LatestArticles />
    </>
  );
};

export default HomePage;
