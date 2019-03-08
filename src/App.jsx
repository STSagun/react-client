import React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import {
  Route, BrowserRouter as Router, Switch, Redirect,
} from 'react-router-dom';
import theme from './theme';
import { Trainee } from './pages/Trainee/index';
import PrivateRoutes, { AuthRoutes } from './routes/index';
import TextFieldDemo from './pages/TextFieldDemo/TextFieldDemo';
import InputDemo from './pages/InputDemo/InputDemo';
import ChildrenDemo from './pages/ChildrenDemo/ChildrenDemo';
import NoMatch from './pages/NoMatch';
import Login from './pages/Login/Login';
import SharedSnackbarProvider from './Contexts/SnackBarProvider/SnackBarProvider';


const App = () => (
  <SharedSnackbarProvider>
    <MuiThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
          <AuthRoutes exact path="/login" component={Login} />
          <PrivateRoutes path="/trainee" component={Trainee} />
          <PrivateRoutes path="/textfield-demo" component={TextFieldDemo} />
          <PrivateRoutes path="/input-demo" component={InputDemo} />
          <PrivateRoutes path="/children-Demo" component={ChildrenDemo} />
          <PrivateRoutes component={NoMatch} />
        </Switch>
      </Router>
    </MuiThemeProvider>
  </SharedSnackbarProvider>
);

export default App;
