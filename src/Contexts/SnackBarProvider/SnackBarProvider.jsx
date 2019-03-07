import React, { Component } from 'react';
import { IconButton, Snackbar } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import CloseIcon from '@material-ui/icons/Close';
import green from '@material-ui/core/colors/green';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import amber from '@material-ui/core/colors/amber';
import WarningIcon from '@material-ui/icons/Warning';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import PropTypes from 'prop-types';

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};
const styles = theme => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.dark,
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
});


const SharedSnackbarContext = React.createContext();
class SharedSnackbarProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      message: '',
      status: '',
    };
  }

  openSnackbar = (message, status) => {
    this.setState({
      message,
      isOpen: true,
      status,
    });
  };

  closeSnackbar = () => {
    this.setState({
      isOpen: false,
    });
  };

  render() {
    const {
      classes, children,
    } = this.props;
    const {
      message, status, isOpen,
    } = this.state;
    const Icon = variantIcon[status];

    return (
      <SharedSnackbarContext.Provider
        value={{
          openSnackbar: this.openSnackbar,
          closeSnackbar: this.closeSnackbar,
          snackbarIsOpen: isOpen,
          message,
          status,
        }}
      >
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={isOpen}
          autoHideDuration={6000}
          onClose={this.closeSnackbar}
          action={[
            <IconButton key="close" color="inherit" onClick={this.closeSnackbar}>
              <Close />
            </IconButton>,
          ]}

        >
          <SnackbarContent
            className={classNames(classes[status])}
            aria-describedby="client-snackbar"
            message={(
              <span id="client-snackbar" className={classes.message}>
                <Icon className={classNames(classes.icon, classes.iconVariant)} />
                {message}
              </span>
            )}
            action={[
              <IconButton
                key="close"
                aria-label="Close"
                color="inherit"
                className={classes.close}
                onClick={this.closeSnackbar}
              >
                <CloseIcon className={classes.icon} />
              </IconButton>,
            ]}
          />
        </Snackbar>
        {children}
      </SharedSnackbarContext.Provider>
    );
  }
}
SharedSnackbarProvider.propTypes = {
  classes: PropTypes.shape().isRequired,
  children: PropTypes.element.isRequired,
};
export const SharedSnackbarConsumer = SharedSnackbarContext.Consumer;
export default withStyles(styles)(SharedSnackbarProvider);
