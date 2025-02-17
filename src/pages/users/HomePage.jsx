import { useContext } from "react";
import { AuthContext } from "../../contexts/contexts";

const HomePage = () => {
  const { name } = useContext(AuthContext);
  return (
    <>
      <h1>{name}</h1>
    </>
  );
};

export default HomePage;
