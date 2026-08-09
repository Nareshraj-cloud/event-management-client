import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// roles: optional array of allowed roles, e.g. ["faculty", "admin"]
const ProtectedRoute = ({ children, roles }) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/" replace />;

  return children;
};

export default ProtectedRoute;
