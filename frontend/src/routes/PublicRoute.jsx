import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
const PublicRoute = () => {
  const { user } = useSelector((state) => state.auth);
  return user ? <Navigate to="/dashboard" /> : <Outlet />;
};

export default PublicRoute;
