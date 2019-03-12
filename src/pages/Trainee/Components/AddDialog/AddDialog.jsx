import React, { Component } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types';
import green from '@material-ui/core/colors/green';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import Person from '@material-ui/icons/Person';
import InputAdornment from '@material-ui/core/InputAdornment';
import Email from '@material-ui/icons/Email';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import * as yup from 'yup';
import { SharedSnackbarConsumer } from '../../../../Contexts/SnackBarProvider/SnackBarProvider';
import callApi from '../../../../libs/utils/api';

function getValidationSchema() {
  return yup.object().shape({
    name: yup
      .string()
      .required('Name is required field')
      .min(3),
    email: yup.string().email('E-mail is not valid!').required('email is required field'),
    password: yup.string().min(8, 'Password has to be longer than 8 characters!').required('password is required field').matches(/[a-z]/, 'at least one lowercase char')
      .matches(/[A-Z]/, 'at least one uppercase char')
      .matches(/[a-zA-Z]+[^a-zA-Z\s]+/, 'at least 1 number or special char (@,!,#, etc).'),
    passwordConfirmation: yup.string().required('Password confirmation is required!').oneOf([yup.ref('password'), null], 'Passwords are not the same!'),

  });
}
const styles = () => ({
  eye: {
    cursor: 'pointer',
  },
  error: {
    fontSize: '14px',
    color: 'red',
  },
  submit: {
    backgroundColor: '#990099', color: 'white',
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
});
const propTypes = {
  classes: PropTypes.shape().isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

class AddDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullWidth: false,
      maxWidth: 'md',
      showPassword: false,
      showConfirmPassword: false,

      error: {
        name: '', email: '', password: '', passwordConfirmation: '',
      },
      touched: {
        name: false,
        email: false,
        password: false,
        passwordConfirmation: false,
      },
      hasError: {
        name: false,
        email: false,
        password: false,
        passwordConfirmation: false,
      },
      loading: false,
      data: {
        name: '',
        email: '',
        password: '',
        passwordConfirmation: '',
      },
    };
  }

  handlerChange = field => (event) => {
    const { touched, data } = this.state;
    this.setState({
      data: { ...data, [field]: event.target.value },
      touched: { ...touched, [field]: true },
    },
    () => this.validate((field)));
  }

  validate = (value) => {
    const {
      data,
      error,
      hasError,
    } = this.state;
    const {
      name,
      email,
      password,
      passwordConfirmation,
    } = data;
    const schema = getValidationSchema();
    schema
      .validate({
        name,
        email,
        password,
        passwordConfirmation,
      }, { abortEarly: false })
      .then(() => {
        this.setState({
          error: { ...error, [value]: '' },
          hasError: { ...hasError, [value]: false },
        });
      })
      .catch((err) => {
        err.inner.forEach((errors) => {
          if (errors.path === value) {
            this.setState({
              error: { ...error, [value]: errors.message },
              hasError: { ...hasError, [value]: true },
            });
          }
        });
        if (!err.inner.some(errors => errors.path === value) && hasError[value]) {
          this.setState({
            error: { ...error, [value]: '' },
            hasError: { ...hasError, [value]: false },
          });
        }
      });
  }

  hasError = () => {
    const { hasError, touched } = this.state;
    let check = 0;
    let touchCheck = 0;
    Object.keys(hasError).forEach((element) => {
      if (hasError[element] === false) check += 1;
    });
    Object.keys(touched).forEach((element) => {
      if (touched[element] === true) touchCheck += 1;
    });
    if (check === 4 && touchCheck === 4) return true;
    return false;
  }

  isTouched = () => {
    const { touched } = this.state;
    return Object.keys(touched).length;
  }


  onBlur = (value) => {
    this.validate(value);
  }

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  handleClickShowConfirmPassword = () => {
    this.setState(state => ({ showConfirmPassword: !state.showConfirmPassword }));
  };

  handlerSubmit = async (event, openSnackbar) => {
    const { data } = this.state;
    const { email, name, password } = data;
    event.preventDefault();
    this.setState({
      loading: true,
    });
    const result = await callApi('post', '/trainee', { email, name, password });
    if (result.data.status === 'ok') {
      this.setState({
        loading: false,
      }, () => openSnackbar(result.data.message, 'success'));
    } else {
      this.setState({
        loading: false,
      }, () => openSnackbar(result.data.message, 'error'));
    }
    this.setState({
      data: '',
    });
  }

  render() {
    const {
      classes, open, onClose, onSubmit,
    } = this.props;
    const {
      showPassword, showConfirmPassword, error, data,
      fullWidth, maxWidth, loading,
    } = this.state;
    return (
      <SharedSnackbarConsumer>
        {({ openSnackbar }) => (
          <Dialog
            fullWidth={fullWidth}
            maxWidth={maxWidth}
            open={open}
            onClose={onClose}
            onSubmit={onSubmit}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">Add Trainee</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
              Enter your trainee details
                <form className={classes.container} noValidate autoComplete="off">
                  <TextField
                    error={(error.name) && error}
                    fullWidth
                    id="outlined-name"
                    label="Name"
                    onChange={this.handlerChange('name')}
                    margin="normal"
                    variant="outlined"
                    value={data.name}
                    onBlur={() => this.onBlur('name')}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Person />
                        </InputAdornment>
                      ),
                    }}

                  />
                  {(error.name) ? <p className={classes.error}>{error.name}</p> : ''}
                  <TextField
                    error={(error.email) && error}
                    fullWidth
                    id="outlined-email-input"
                    label="Email"
                    className={classes.textField}
                    onChange={this.handlerChange('email')}
                    type="email"
                    value={data.email}
                    name="email"
                    onBlur={() => this.onBlur('email')}
                    autoComplete="email"
                    margin="normal"
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Email />
                        </InputAdornment>
                      ),
                    }}

                  />
                  {(error.email) ? <aside className={classes.error}>{error.email}</aside> : ''}
                  <Grid container spacing={24}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        error={(error.password) && error}
                        id="outlined-password-input"
                        label="Password"
                        value={data.password}
                        className={classes.textField}
                        autoComplete="current-password"
                        margin="normal"
                        variant="outlined"
                        onBlur={() => this.onBlur('password')}
                        type={showPassword ? 'text' : 'password'}
                        onChange={this.handlerChange('password')}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="start">
                              <IconButton
                                aria-label="Toggle password visibility"
                                onClick={this.handleClickShowPassword}
                              >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}

                      />
                      {(error.password) ? <aside className={classes.error}>{error.password}</aside> : ''}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        error={(error.passwordConfirmation) && error}
                        id="outlined-password-input"
                        label="Confirm Password"
                        onBlur={() => this.onBlur('passwordConfirmation')}
                        autoComplete="current-password"
                        value={data.passwordConfirmation}
                        margin="normal"
                        variant="outlined"
                        type={showConfirmPassword ? 'text' : 'password'}
                        onChange={this.handlerChange('passwordConfirmation')}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="start">
                              <IconButton
                                aria-label="Toggle password visibility"
                                onClick={this.handleClickShowConfirmPassword}
                              >
                                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}

                      />

                      {(error.passwordConfirmation) ? <aside className={classes.error}>{error.passwordConfirmation}</aside> : ''}

                    </Grid>
                  </Grid>
                </form>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={onClose} color="primary">
              Cancel
              </Button>
              { this.hasError() ? (
                <Button value="Submit" onClick={(event) => { onSubmit(data.name, data.email, data.password); this.handlerSubmit(event, openSnackbar); }} className={classes.submit} color="primary">
            Submit
                  { loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                </Button>
              ) : <Button value="Submit" color="primary" disabled> Submit</Button>
              }
            </DialogActions>
          </Dialog>
        )}
      </SharedSnackbarConsumer>
    );
  }
}
AddDialog.propTypes = propTypes;

export default withStyles(styles)(AddDialog);
