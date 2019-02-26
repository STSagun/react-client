import React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import theme from './theme';
import Trainee from './pages/Trainee/Trainee';


const App = () => (
  <MuiThemeProvider theme={theme}>
    <Typography>
      <Trainee />
    </Typography>
  </MuiThemeProvider>

);

export default App;
