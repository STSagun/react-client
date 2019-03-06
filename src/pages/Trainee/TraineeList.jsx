import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import PropTypes from 'prop-types';
import moment from 'moment';
import { AddDialog } from './Components';
import trainees from './Data/trainee';
import TraineeTable from './Components/Table/TraineeTable';
import RemoveDialog from './Components/AddDialog/RemoveDialog';
import EditDialog from './Components/AddDialog/EditDialog';

class TraineeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      page: 0,
      rowsPerPage: 3,
      openRemove: false,
      openEdit: false,
      data: '',
    };
  }

  getDateFormatted = date => moment(date).format('dddd, MMMM Do YYYY, h:mm:ss a');

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false, openRemove: false, openEdit: false });
  };


  Submit = (...values) => {
    this.setState({ open: false, openRemove: false, openEdit: false });
    const value = Object.assign(values);
    console.log(value);
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

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleRemoveDialogOpen = (value) => {
    this.setState({ openRemove: true, data: value });
  }

  handleEditDialogOpen = (value) => {
    this.setState({ openEdit: true, data: value });
  }

  render() {
    const {
      open, order, orderBy, page, rowsPerPage, openRemove, openEdit, data,
    } = this.state;
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
          actions={[
            {
              icon: <EditIcon />,
              handler: this.handleEditDialogOpen,
            },
            {
              icon: <DeleteIcon />,
              handler: this.handleRemoveDialogOpen,
            },
          ]}
          orderBy={orderBy}
          order={order}
          onSort={this.handleSort}
          onSelect={this.handleSelect}
          Count={100}
          page={page}
          onChangePage={this.handleChangePage}
          rowsPerPage={rowsPerPage}
        />

        {
          (data)
            ? (
              <>
                <RemoveDialog
                  open={openRemove}
                  onClose={this.handleClose}
                  onSubmit={this.Submit}
                  data={data}
                />

                <EditDialog
                  open={openEdit}
                  onClose={this.handleClose}
                  onSubmit={this.Submit}
                  data={data}
                />
              </>
            ) : ''
        }
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
