import React from 'react';
import { Navigate } from 'react-router-dom';
import { getToken, isSuperAdmin } from '../../utils/auth';
import DashboardLayout from '../dashboard/component/DashboardLayout';

const SuperAdminProtect = ({ children }) => {
  const isAdmin = getToken();
  const superAdmin = isSuperAdmin();

  if (superAdmin) {
    return(
      <DashboardLayout>
        {children}
      </DashboardLayout>
    );
  } else if (isAdmin) {
    return <Navigate to="/dashboard/news" />;
  } else {
    return <Navigate to="/login" />;
  }
};

export default SuperAdminProtect;