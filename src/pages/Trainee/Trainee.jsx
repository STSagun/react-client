import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { AddDialog } from './Components';


class Trainee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  Submit = (...values) => {
    this.setState({ open: false });
    console.log(...values);
  };


  render() {
    const { open } = this.state;
    return (
      <>
        <Button variant="outlined" style={{ marginTop: '20px' }} color="primary" onClick={this.handleClickOpen}>
          Add Trainee
        </Button>
        <AddDialog
          open={open}
          onClose={this.handleClose}
          onSubmit={this.Submit}
        />
      </>
    );
  }
}

export default Trainee;
