import React from "react";
import { Route, Redirect } from "react-router-dom";
import { getToken, isSuperAdmin } from "../../utils/auth";

const SuperAdminProtect = ({ component: Component, ...rest }) => {
    const isAdmin = getToken();
    const superAdmin = isSuperAdmin();
  
    return (
      <Route
        {...rest}
        render={(props) =>
            superAdmin ? (
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