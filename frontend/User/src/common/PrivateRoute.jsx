import React from 'react';
import { Route, useNavigate } from 'react-router-dom';

const PrivateRoute = ({ component: Component, authenticated, ...rest }) => {
  const navigate = useNavigate();

  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated ? (
          <Component {...rest} {...props} />
        ) : (
          (() => {
            // Use history.replace to change the current URL without adding a new entry to the history stack
            navigate.replace({
              pathname: '/login',
              state: { from: props.location }
            });
            return null; // This is to prevent rendering anything when redirecting
          })()
        )
      }
    />
  );
};

export default PrivateRoute;
