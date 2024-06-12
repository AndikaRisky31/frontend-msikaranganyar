import React from 'react';
import { Navigate } from 'react-router-dom';
import { getToken } from '../../utils/auth';
import DashboardLayout from '../dashboard/component/DashboardLayout';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = getToken(); // Replace this with your authentication logic

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return(
    <DashboardLayout>
      {children}
    </DashboardLayout>
  ) 
};

export default ProtectedRoute;
