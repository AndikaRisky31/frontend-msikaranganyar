import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getToken, isSuperAdmin } from "../../utils/auth";

const SuperAdminProtect = ({ children }) => {
  const isAdmin = getToken();
  const superAdmin = isSuperAdmin();

  if (superAdmin) {
    return children || <Outlet />;
  } else if (isAdmin) {
    return <Navigate to="/dashboard/news" />;
  } else {
    return <Navigate to="/login" />;
  }
};

export default SuperAdminProtect;
