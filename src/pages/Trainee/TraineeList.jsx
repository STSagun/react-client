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
import callApi from '../../libs/utils/api';
import { SharedSnackbarConsumer } from '../../Contexts/SnackBarProvider/SnackBarProvider';

class TraineeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      order: '',
      orderBy: '',
      open: false,
      page: 0,
      rowsPerPage: 10,
      openRemove: false,
      openEdit: false,
      data: '',
      skip: 0,
      limit: 10,
      dataList: '',
      loading: true,
      totalCount: 0,
      error: '',
    };
  }

  componentDidMount() {
    const { skip, limit } = this.state;
    callApi('get', `trainee?limit=${limit}&skip=${skip}`, {}).then((res) => {
      console.log('respons', res.data.data);
      this.setState({
        dataList: res.data.data.records,
        loading: false,
        totalCount: res.data.data.count,
      });
    })
      .catch((err) => {
        this.setState({
          error: err, loading: false,
        });
      });
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({
      open: false, openRemove: false, openEdit: false, data: '',
    });
  };


  Submit = (...values) => {
    this.setState({
      open: false, openRemove: false, openEdit: false, data: '',
    });
    const value = Object.assign(values);
    console.log(value);
    this.handleCallApi();
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

  handleCallApi = () => {
    const { page } = this.state;
    const newSkip = 10 * (page);
    const newLimit = 10;
    this.setState({
      skip: newSkip, limit: newLimit, loading: true,
    });
    callApi('get', `trainee?limit=${newLimit}&skip=${newSkip}`, {}).then((res) => {
      this.setState({
        dataList: res.data.data.records,
        loading: false,
        totalCount: res.data.data.count,
      });
      if (res.data.data.records.length === 0) {
        this.setState({
          page: (page - 1),
        });
        this.handleCallApi();
      }
    });
  };

  handleChangePage = (event, pages) => {
    const newSkip = 10 * (pages);
    const newLimit = 10;
    this.setState({
      page: pages, skip: newSkip, limit: newLimit, loading: true,
    });
    callApi('get', `trainee?limit=${newLimit}&skip=${newSkip}`, {}).then((res) => {
      this.setState({
        dataList: res.data.data.records,
        loading: false,
        totalCount: res.data.data.count,
      });
    });
  };

  handleRemoveDialogOpen = (value) => {
    this.setState({ openRemove: true, data: value });
  }

  handleEditDialogOpen = (value) => {
    this.setState({ openEdit: true, data: value });
  }

  handlerSnackbar = (openSnackbar) => {
    openSnackbar('Bad Request for API', 'error');
    this.setState({
      error: '',
    });
  }

  getDateFormatted = date => moment(date).format('dddd, MMMM Do YYYY, h:mm:ss a');

  render() {
    const {
      open, order, orderBy, page, rowsPerPage, openRemove, openEdit, data, error,
      dataList, loading, totalCount,
    } = this.state;
    return (
      <SharedSnackbarConsumer>
        {({ openSnackbar }) => {
          if (!error) {
            return (
              <div>
                <div style={{ textAlign: 'right' }}>
                  <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
          Add TraineeList
                  </Button>
                </div>
                <TraineeTable
                  id="id"
                  data={dataList || trainees}
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
                  count={totalCount}
                  page={page}
                  onChangePage={this.handleChangePage}
                  rowsPerPage={rowsPerPage}
                  loading={loading}
                  dataLength={dataList.length}
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
              </div>
            );
          }
          return this.handlerSnackbar(openSnackbar);
        }}
      </SharedSnackbarConsumer>
    );
  }
}
TraineeList.propTypes = {
  history: PropTypes.objectOf(Object).isRequired,
};

export default TraineeList;
