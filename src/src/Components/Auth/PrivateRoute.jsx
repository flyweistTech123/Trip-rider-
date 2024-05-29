import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from './Auth';

const PrivateRoute = ({ component: Component, role, ...rest }) => {
  const { userRole } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) =>
        userRole === role ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" /> // Redirect to home page or login page
        )
      }
    />
  );
};

export default PrivateRoute;
