import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/core/styles';
import { SharedSnackbarConsumer } from '../../../../Contexts/SnackBarProvider/SnackBarProvider';
import callApi from '../../../../libs/utils/api';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
});


const propTypes = {
  classes: PropTypes.shape().isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  data: PropTypes.objectOf(PropTypes.object).isRequired,
};

class RemoveDialog extends React.Component {
  state = {
    loading: false,
  };

  onClickHandler = async (e, openSnackbar) => {
    const { data, onSubmit } = this.props;
    const { _id } = data;
    this.setState({
      loading: true,
    });
    const res = await callApi('delete', `trainee/${_id}`, {});
    e.preventDefault();
    if (res.status) {
      this.setState({
        loading: false,
      });
      openSnackbar('Successfully Deleted', 'success');
      onSubmit(data);
    } else {
      this.setState({
        loading: false,
      });
      onSubmit(data);
      openSnackbar('unable to delete', 'error');
    }
    console.log('response is ', res);
  }

  render() {
    const {
      open, onClose, classes, data, onSubmit,
    } = this.props;
    const { loading } = this.state;
    const traineeData = '2019-02-13T18:15:11.778Z';
    return (
      <SharedSnackbarConsumer>
        {({ openSnackbar }) => (
          <div>
            <Dialog
              open={open}
              onClose={onClose}
              onSubmit={onSubmit}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              fullWidth
            >
              <DialogTitle id="alert-dialog-title">Remove Trainee</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
              Do you really want to remove the trainee?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={onClose} color="primary">
              Cancel
                </Button>
                <Button
                  onClick={
                    (traineeData < data.createdAt) ? (e => this.onClickHandler(e, openSnackbar))
                      : openSnackbar('Trainee registerd before 14th feb cannot be deleted  ', 'error')
                  }
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  disabled={loading}
                >
                  { (loading) ? <CircularProgress size={24} /> : <b>Delete</b> }
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        )}
      </SharedSnackbarConsumer>

    );
  }
}
RemoveDialog.propTypes = propTypes;

export default withStyles(styles)(RemoveDialog);
