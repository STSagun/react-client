import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Person from '@material-ui/icons/Person';
import InputAdornment from '@material-ui/core/InputAdornment';
import Email from '@material-ui/icons/Email';
import * as yup from 'yup';
import { SharedSnackbarConsumer } from '../../../../Contexts/SnackBarProvider/SnackBarProvider';


function getValidationSchema() {
  return yup.object().shape({
    name: yup
      .string()
      .required('Name is required field')
      .min(3),
    email: yup.string().email('E-mail is not valid!').required('email is required field'),
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

});
const propTypes = {
  classes: PropTypes.shape().isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  data: PropTypes.objectOf(PropTypes.object).isRequired,
};

class EditDialog extends Component {
  constructor(props) {
    super(props);
    const { data } = this.props;
    const { name, email } = data;
    this.state = {
      maxWidth: 'lg',
      name,
      email,
      error: {
        name: '', email: '',
      },
      touched: {
        name: false,
        email: false,
      },
      hasError: {
        name: false,
        email: false,
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
      name,
      email,
      error,
      hasError,
    } = this.state;
    const schema = getValidationSchema();
    schema
      .validate({
        name,
        email,
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
    if (check === 2 && touchCheck >= 1) return true;
    return false;
  }

  isTouched = () => {
    const { touched } = this.state;
    return Object.keys(touched).length;
  }


  onBlur = (value) => {
    this.validate(value);
  }

  render() {
    const {
      classes, open, onClose, onSubmit,
    } = this.props;
    const {
      name, error, email, maxWidth,
    } = this.state;
    return (
      <SharedSnackbarConsumer>
        {({ openSnackbar }) => (
          <Dialog
            fullWidth
            maxWidth={maxWidth}
            open={open}
            onClose={onClose}
            onSubmit={onSubmit}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">Edit Trainee</DialogTitle>
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
                    value={name}
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
                </form>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={onClose} color="primary">
              Cancel
              </Button>
              { this.hasError() ? <Button value="Submit" onClick={() => { onSubmit(name, email); openSnackbar('Editied Successfully', 'success'); }} className={classes.submit} color="primary">Submit</Button> : <Button value="Submit" color="primary" disabled> Submit</Button>
              }
            </DialogActions>
          </Dialog>
        )}
      </SharedSnackbarConsumer>
    );
  }
}
EditDialog.propTypes = propTypes;

export default withStyles(styles)(EditDialog);
