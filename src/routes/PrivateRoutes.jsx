import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import PrivateLayout from '../layouts/PrivateLayout/PrivateLayout';

const PrivateRoutes = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={matchProps => (
      localStorage.Token
        ? (
          <PrivateLayout>
            <Component {...matchProps} />
          </PrivateLayout>
        )
        : <Redirect to="/login" />
    )}
  />
);
PrivateRoutes.propTypes = {
  component: PropTypes.func.isRequired,
};


export default PrivateRoutes;
