import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getToken } from '../../utils/auth';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const isLoggedIn = getToken(); // Check apakah pengguna sudah login atau belum

  return (
    <Route
      {...rest}
      render={props =>
        isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        )
      }
    />
  );
};

export default ProtectedRoute;
