import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children, adminRequired }) => {
  const { user } = useAuthContext();

  return !user || (adminRequired && user.isAdmin) ? (
    <Navigate to="/" replace />
  ) : (
    children
  );
};

export default ProtectedRoute;
