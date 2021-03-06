import React from 'react';
import PropTypes from 'prop-types';
import { CssBaseline } from '@material-ui/core';
import Footer from '../Components/Footer';

const AuthLayout = ({ children }) => (
  <>
    <CssBaseline />
    <div>{children}</div>
    <Footer />
  </>
);
AuthLayout.propTypes = {
  children: PropTypes.element.isRequired,
};


export default AuthLayout;
