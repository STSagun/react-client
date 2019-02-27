import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import PrivateLayout from '../layouts/PrivateLayout/PrivateLayout';

const PrivateRoutes = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={matchProps => (
      <PrivateLayout>
        <Component {...matchProps} />
      </PrivateLayout>
    )}
  />
);
PrivateRoutes.propTypes = {
  component: PropTypes.element.isRequired,
};


export default PrivateRoutes;
