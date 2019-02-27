import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
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
});
function getValidationSchema() {
  return yup.object().shape({
    email: yup.string().email('E-mail is not valid!').required('email is required field'),
    password: yup.string().min(8, 'Password has to be longer than 8 characters!').required('Password is required field').matches(/[a-z]/, 'at least one lowercase char')
      .matches(/[A-Z]/, 'at least one uppercase char')
      .matches(/[a-zA-Z]+[^a-zA-Z\s]+/, 'at least 1 number or special char (@,!,#, etc).'),

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
    };
  }

  handlerChange = field => (event) => {
    const { touched } = this.state;
    this.setState({
      [field]: event.target.value,
      touched: { ...touched, [field]: true },
    },
    () => this.validate((field)));
  }

  validate = (value) => {
    const {
      email,
      password,
      error,
      hasError,
    } = this.state;
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

  render() {
    const {
      classes,
    } = this.props;
    const {
      showPassword, error, email, password,
    } = this.state;

    return (
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
              value={email}
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
              value={password}
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
                className={classes.submit}
              >
              SIGN IN
              </Button>
            ) : <Button type="submit" fullWidth variant="contained" className={classes.submit} color="primary" disabled>SIGN IN</Button>
            }
          </form>
        </Paper>
      </main>
    );
  }
}
Login.propTypes = {
  classes: PropTypes.shape().isRequired,
};

export default withStyles(styles)(Login);
