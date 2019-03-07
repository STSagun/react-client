import React from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/core/styles';
import { SharedSnackbarConsumer } from '../../../../Contexts/SnackBarProvider/SnackBarProvider';

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
  };

  render() {
    const {
      open, onClose, onSubmit, classes, data,
    } = this.props;
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
                  onClick={() => {
                    onSubmit(data);
                    if (traineeData < data.createdAt) return openSnackbar('Successfully Deleted ', 'success');
                    return openSnackbar('Trainee registerd before 14th feb cannot be deleted  ', 'error');
                  }}
                  variant="contained"
                  color="primary"
                  className={classes.button}
                >
              Delete
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
