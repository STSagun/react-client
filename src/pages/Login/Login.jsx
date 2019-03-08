import React, { Component } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import green from '@material-ui/core/colors/green';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import * as yup from 'yup';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Email from '@material-ui/icons/Email';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import callApi from '../../libs/utils/api';
import { SharedSnackbarConsumer } from '../../Contexts/SnackBarProvider/SnackBarProvider';

const styles = theme => ({
  error: {
    fontSize: '14px',
    color: 'red',
  },
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  textField: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
  password: {
    padding: 0,
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
function getValidationSchema() {
  return yup.object().shape({
    email: yup.string().email('E-mail is not valid!').required('email is required field'),
    password: yup.string().min(8, 'Password has to be longer than 8 characters!').required('Password is required field').matches(/[a-z]/, 'at least one lowercase char'),
  });
}


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPassword: false,
      error: {
        email: '', password: '',
      },
      touched: {
        email: false,
        password: false,
      },
      hasError: {
        email: false,
        password: false,
      },
      dataUser: {
        email: '',
        password: '',
      },
      loading: false,
    };
  }

  handlerChange = field => (event) => {
    const { touched, dataUser } = this.state;
    this.setState({
      dataUser: { ...dataUser, [field]: event.target.value },
      touched: { ...touched, [field]: true },
    },
    () => this.validate((field)));
  }

  validate = (value) => {
    const {
      dataUser,
      error,
      hasError,
    } = this.state;
    const { email, password } = dataUser;
    const schema = getValidationSchema();
    schema
      .validate({
        email,
        password,
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
    if (check === 2 && touchCheck === 2) return true;

    return false;
  }

  isTouched = () => {
    const { touched } = this.state;
    return !!Object.keys(touched).length;
  }


  onBlur = (value) => {
    this.validate(value);
  }

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  handlerSubmit = async (openSnackbar) => {
    const { history } = this.props;
    const { dataUser } = this.state;
    const { email, password } = dataUser;
    this.setState({
      loading: true,
    });
    const result = await callApi('post', 'user/login', { email, password });
    if (result.data.status === 'ok') {
      const { data } = result.data;
      localStorage.setItem('Token', data);
      history.push('/trainee');
    } else {
      this.setState({
        loading: false,
      }, () => openSnackbar(result.data.message, 'error'));
    }
  }

  render() {
    const {
      classes,
    } = this.props;
    const {
      showPassword, error, dataUser, loading,
    } = this.state;

    return (
      <SharedSnackbarConsumer>
        {({ openSnackbar }) => (
          <main className={classes.main}>

            <Paper className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
          Login
              </Typography>
              <form className={classes.form}>
                <TextField
                  error={(error.email) && error}
                  id="outlined-email-input"
                  label="Email"
                  className={classes.textField}
                  onChange={this.handlerChange('email')}
                  type="email"
                  value={dataUser.email}
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
                <TextField
                  error={(error.password) && error}
                  className={classes.textField}
                  id="outlined-password-input"
                  label="Password"
                  value={dataUser.password}
                  autoComplete="current-password"
                  margin="normal"
                  variant="outlined"
                  onBlur={() => this.onBlur('password')}
                  type={showPassword ? 'text' : 'password'}
                  onChange={this.handlerChange('password')}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <IconButton
                          className={classes.password}
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
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                { this.hasError() ? (
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={loading}
                    className={classes.submit}
                    onClick={() => this.handlerSubmit(openSnackbar)}
                  >
                    SIGN IN
                    { loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                  </Button>
                ) : <Button type="submit" fullWidth variant="contained" className={classes.submit} color="primary" disabled>SIGN IN</Button>
                }

              </form>
            </Paper>
          </main>
        )}
      </SharedSnackbarConsumer>
    );
  }
}
Login.propTypes = {
  classes: PropTypes.shape().isRequired,
  history: PropTypes.shape().isRequired,
};

export default withStyles(styles)(Login);
