import React, { Component } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormHelperText from '@material-ui/core/FormHelperText';
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
      touched: false,
      hasError: {
        name: false,
        email: false,
        password: false,
        passwordConfirmation: false,
      },
      loading: false,
      name: '',
      email: '',
      password: '',
      passwordConfirmation: '',
    };
  }

  handlerChange = field => (event) => {
    this.setState({
      [field]: event.target.value,
    }, () => this.validate((field)));
  };

  validate = (value) => {
    const {
      name,
      email,
      password,
      passwordConfirmation,
      error,
      hasError,
    } = this.state;
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
          touched: true,
        });
      })
      .catch((err) => {
        if (!err.inner.some(errors => errors.path === value) && hasError) {
          this.setState({
            error: { ...error, [value]: '' },
            hasError: { ...hasError, [value]: false },
            touched: false,
          });
        }
      });
  }

  getError=field => () => {
    const {
      name,
      email,
      password,
      passwordConfirmation,
      hasError,
      error,
    } = this.state;
    const schema = getValidationSchema();
    schema.validate({
      name,
      email,
      password,
      passwordConfirmation,
    }, { abortEarly: false }).catch((err) => {
      err.inner.forEach((errors) => {
        if (errors.path === field) {
          this.setState({
            error: { ...error, [field]: errors.message },
            hasError: { ...hasError, [field]: true },
            touched: false,
          });
        }
      });
    });
  }

  checkDisabled = () => {
    const { touched, hasError } = this.state;
    let result = false;
    Object.keys(hasError).forEach((error) => {
      if (hasError[error] === false) {
        result = true;
      }
    });
    if (touched && result) {
      return false;
    }
    return true;
  }

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  handleClickShowConfirmPassword = () => {
    this.setState(state => ({ showConfirmPassword: !state.showConfirmPassword }));
  };

  handlerSubmit = async (event, openSnackbar) => {
    const { email, name, password } = this.state;
    const { onSubmit } = this.props;
    event.preventDefault();
    this.setState({
      loading: true,
    });
    const result = await callApi('post', '/trainee', { email, name, password });
    if (result.data.status === 'ok') {
      this.setState({
        loading: false,
      });
      onSubmit({ email, name, password });
      openSnackbar(result.data.message, 'success');
    } else {
      this.setState({
        loading: false,
      });
      onSubmit({ email, name, password });
      openSnackbar(result.data.message, 'error');
    }
    this.setState({
      name: '',
      email: '',
      password: '',
      passwordConfirmation: '',
    });
  }

  render() {
    const {
      classes, open, onClose, onSubmit,
    } = this.props;
    const {
      showPassword, showConfirmPassword, error, hasError,
      fullWidth, maxWidth, loading,
      name,
      email,
      password,
      passwordConfirmation,
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
                    error={hasError.name}
                    fullWidth
                    id="outlined-name"
                    label="Name"
                    onChange={this.handlerChange('name')}
                    margin="normal"
                    variant="outlined"
                    value={name}
                    onBlur={this.getError('name')}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <IconButton>
                            <Person />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}

                  />
                  <FormHelperText className={classes.error}>{error.name}</FormHelperText>
                  <TextField
                    error={hasError.email}
                    fullWidth
                    id="outlined-email-input"
                    label="Email"
                    className={classes.textField}
                    onChange={this.handlerChange('email')}
                    type="email"
                    value={email}
                    name="email"
                    onBlur={this.getError('email')}
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
                  <FormHelperText className={classes.error}>{error.email}</FormHelperText>
                  <Grid container spacing={24}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        error={hasError.password}
                        id="outlined-password-input"
                        label="Password"
                        value={password}
                        className={classes.textField}
                        autoComplete="current-password"
                        margin="normal"
                        variant="outlined"
                        onBlur={this.getError('password')}
                        type={showPassword ? 'text' : 'password'}
                        onChange={this.handlerChange('password')}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="start">
                              <IconButton
                                aria-label="Toggle password visibility"
                                onClick={this.handleClickShowPassword}
                              >
                                {showPassword ? <Visibility /> : <VisibilityOff />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}

                      />
                      <FormHelperText className={classes.error}>{error.password}</FormHelperText>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        error={hasError.passwordConfirmation}
                        id="outlined-password-input"
                        label="Confirm Password"
                        onBlur={this.getError('passwordConfirmation')}
                        autoComplete="current-password"
                        value={passwordConfirmation}
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
                                {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}

                      />
                      <FormHelperText className={classes.error}>
                        {error.passwordConfirmation}
                      </FormHelperText>

                    </Grid>
                  </Grid>
                </form>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={onClose} color="primary">
              Cancel
              </Button>
              { !this.checkDisabled() ? (
                <Button value="Submit" onClick={(event) => { onSubmit(); this.handlerSubmit(event, openSnackbar); }} className={classes.submit} color="primary">
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
