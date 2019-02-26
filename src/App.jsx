import React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from './theme';
import Trainee from './pages/Trainee/Trainee';
import Navbar from './pages/Components/Navbar/Navbar';
import Login from './pages/Login';


const App = () => (
  <MuiThemeProvider theme={theme}>
    <Typography>
      <CssBaseline />
      <Navbar />
      {/* <Login /> */}
      <Trainee />
    </Typography>
  </MuiThemeProvider>

);

export default App;
