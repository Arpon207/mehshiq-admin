import { useAuthStore } from "../store/authStore";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();
  if (!isAuthenticated || user?.role !== "admin") {
    return <Navigate to={"/login"} replace />;
  }
  return children;
};

export default ProtectedRoute;
