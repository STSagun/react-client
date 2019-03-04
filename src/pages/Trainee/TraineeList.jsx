import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import moment from 'moment';
import { AddDialog } from './Components';
import trainees from './Data/trainee';
import TraineeTable from './Components/Table/TraineeTable';

class TraineeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  getDateFormatted = date => moment(date).format('dddd, MMMM Do YYYY, h:mm:ss a');

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

  handleSelect = (check) => {
    const { history } = this.props;
    history.push(`trainee/${check}`);
  };

  handleSort = (event, property) => {
    const { orderBy, order } = this.state;
    const orderByChange = property;
    let orderChange = 'desc';

    if (orderBy === property && order === 'desc') {
      orderChange = 'asc';
    }

    this.setState({ order: orderChange, orderBy: orderByChange });
  };

  render() {
    const { open, order, orderBy } = this.state;
    return (
      <>
        <div style={{ textAlign: 'right' }}>
          <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
          Add TraineeList
          </Button>
        </div>
        <TraineeTable
          id="id"
          data={trainees}
          columns={[
            {
              field: 'name',
              label: 'Name',
            },
            {
              field: 'email',
              label: 'Email Address',
              format: value => value && value.toUpperCase(),
            },
            {
              field: 'createdAt',
              label: 'Date',
              align: 'right',
              format: this.getDateFormatted,
            },
          ]}
          orderBy={orderBy}
          order={order}
          onSort={this.handleSort}
          onSelect={this.handleSelect}
        />
        <AddDialog
          open={open}
          onClose={this.handleClose}
          onSubmit={this.Submit}
        />
      </>
    );
  }
}
TraineeList.propTypes = {
  history: PropTypes.objectOf.isRequired,
};

export default TraineeList;
