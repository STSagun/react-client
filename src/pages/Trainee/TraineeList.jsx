import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { AddDialog } from './Components';
import trainees from './Data/trainee';

class TraineeList extends Component {
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
        <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
          Add TraineeList
        </Button>
        <AddDialog
          open={open}
          onClose={this.handleClose}
          onSubmit={this.Submit}

        />
        <ul>
          { trainees.map(number => <li><Link to={`/trainee/${number.id}`}>{number.name}</Link></li>) }
        </ul>
      </>
    );
  }
}

export default TraineeList;
