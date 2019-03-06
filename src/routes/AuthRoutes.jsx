import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout/index';

const AuthRoutes = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={matchProps => (
      <AuthLayout>
        <Component {...matchProps} />
      </AuthLayout>
    )}
  />
);
AuthRoutes.propTypes = {
  component: PropTypes.func.isRequired,
};
export default AuthRoutes;
