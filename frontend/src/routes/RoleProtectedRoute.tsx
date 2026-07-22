import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";
import type { UserRole } from "../types/auth";
import LoadingSpinner from "../components/common/LoadingSpinner";

interface RoleProtectedRouteProps {
  allowedRoles: UserRole[];
}

const RoleProtectedRoute = ({
  allowedRoles,
}: RoleProtectedRouteProps) => {
  const { loading, user } = useAuth();
  const location = useLocation();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default RoleProtectedRoute;