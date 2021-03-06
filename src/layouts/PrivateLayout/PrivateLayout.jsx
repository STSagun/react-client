import React from 'react';
import PropTypes from 'prop-types';
import { CssBaseline } from '@material-ui/core';
import Navbar from '../Components/Navbar/index';

const style = {
  padding: '30px',
};
const PrivateLayout = ({ children }) => (
  <>
    <CssBaseline />
    <Navbar />
    <div style={style}>{children}</div>
  </>
);
PrivateLayout.propTypes = {
  children: PropTypes.element.isRequired,
};


export default PrivateLayout;
