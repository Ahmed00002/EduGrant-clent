import { AuthContext } from "../contexts/contexts";
import PropTypes from "prop-types";

const AuthProvider = ({ children }) => {
  const authProviderData = {
    name: "Numan",
  };
  return (
    <AuthContext.Provider value={authProviderData}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

AuthProvider.propTypes = {
  children: PropTypes.node,
};
