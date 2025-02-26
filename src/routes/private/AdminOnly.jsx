import PropTypes from "prop-types";
import useAuth from "@/hooks/useAuth";
import Loading from "@/components/shared/loader/Loading";
import { Navigate, useLocation } from "react-router";
import useUserRole from "@/hooks/useUserRole";

const AdminOnly = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  const { role, isLoading } = useUserRole();

  if (loading || isLoading) {
    return <Loading />;
  }
  if (user && (role?.isAdmin || role?.isModerator)) {
    return children;
  }

  return <Navigate state={location.pathname} to={"/auth/login"} />;
};

export default AdminOnly;

AdminOnly.propTypes = {
  children: PropTypes.node,
};
