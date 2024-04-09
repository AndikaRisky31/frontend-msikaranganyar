import React from "react";
import { Route, Redirect } from "react-router-dom";

const SuperAdminProtect = ({ component: Component, ...rest }) => {
    const isAdmin = localStorage.getItem("access_token");
    const isSuperAdmin = localStorage.getItem("role") === "superadmin";
  
    return (
      <Route
        {...rest}
        render={(props) =>
            isSuperAdmin ? (
              <Component {...props} />
            ) : (
                isAdmin ? (
                    <Redirect to="/dashboard/news" />
                ):(
                    <Redirect to="/login" />
                )
            )
        }
      />
    );
};

export default SuperAdminProtect;