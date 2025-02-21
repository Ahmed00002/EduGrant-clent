import { AuthContext } from "@/contexts/contexts";
import { useContext } from "react";

const useAuth = () => {
  const userAuth = useContext(AuthContext);
  return userAuth;
};

export default useAuth;
