import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuthStore from '../Auth/store';

interface ProtectedRouteProps {
  allowedRoles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace />;
  }

  // Check role-based access if roles are specified
  if (allowedRoles && user) {
    const hasRequiredRole = allowedRoles.includes(user.role);
    if (!hasRequiredRole) {
      // Redirect to unauthorized or dashboard if role doesn't match
      return <Navigate to="/unauthorized" replace />;
    }
  }

  // Render child routes if authenticated and has required role
  return <Outlet />;
};

export default ProtectedRoute;