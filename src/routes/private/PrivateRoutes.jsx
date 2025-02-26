import PropTypes from "prop-types";
import useAuth from "@/hooks/useAuth";
import Loading from "@/components/shared/loader/Loading";
import { Navigate, useLocation } from "react-router";

const PrivateRoutes = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (user) {
    return children;
  }
  if (loading) {
    return <Loading />;
  }

  return <Navigate state={location.pathname} to={"/auth/login"} />;
};

export default PrivateRoutes;

PrivateRoutes.propTypes = {
  children: PropTypes.node,
};
