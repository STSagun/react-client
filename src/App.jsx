import React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import theme from './theme';
import ChildrenDemo from './pages/ChildrenDemo/ChildrenDemo';
import AlertDialog from './pages/Trainee/Components/AddDialog/Alret';
import { AddDialog } from './pages/Trainee/Components';


const App = () => (
  <MuiThemeProvider theme={theme}>
    <Typography>
      <AddDialog />
    </Typography>
  </MuiThemeProvider>

);

export default App;
