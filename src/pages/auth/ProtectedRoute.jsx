import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getToken } from "../../utils/auth";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = getToken();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children || <Outlet />;
};

export default ProtectedRoute;
