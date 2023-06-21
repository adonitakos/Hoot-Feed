import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { Auth } from 'aws-amplify';

const PrivateRoute = ({ element: Component, ...rest }) => {
  const isAuthenticated = async () => {
    try {
      await Auth.currentAuthenticatedUser();
      return true;
    } catch (error) {
      return false;
    }
  };

  return (
    <Route
      {...rest}
      element={isAuthenticated() ? <Component /> : <Navigate to="/" replace />}
    />
  );
};

export default PrivateRoute;
