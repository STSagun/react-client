import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import { IconButton } from '@material-ui/core';
import TablePagination from '@material-ui/core/TablePagination';
import withLoaderAndMessage from '../../../../components/HOC/withLoaderAndMessage';


const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  tableRow: {
    cursor: 'pointer',
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.grey[100],
    },
    '&:hover': {
      backgroundColor: theme.palette.grey[200],
    },
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    padding: '2px',
  },
});
class TraineeTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  iconButton = (row) => {
    const { actions, classes } = this.props;
    return (
      actions.map((action, index) => (
        <IconButton key={parseInt(index.toString(), 10)} className={classes.column} onClick={() => action.handler(row)}>
          {action.icon}
        </IconButton>
      ))

    );
  }

  createSortHandler = property => (event) => {
    const { onSort } = this.props;
    onSort(event, property);
  }


  render() {
    const {
      classes, id, columns, data, onSelect, order, orderBy, page, count, onChangePage, rowsPerPage,
    } = this.props;
    return (
      <>
        <Paper className={classes.root}>
          <Table className={classes.table} key={id}>
            <TableHead>
              <TableRow>
                { columns.map(opt => (
                  <TableCell key={opt.field} align={opt.align || 'left'}>
                    <TableSortLabel
                      active={orderBy === opt.field}
                      direction={order}
                      onClick={this.createSortHandler(opt.field)}
                      key={`${opt.filed}.${opt.filed}`}
                    >
                      {opt.label || opt.field}
                    </TableSortLabel>

                  </TableCell>
                ))}
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {data
                .map(row => (
                  <TableRow
                    className={classes.tableRow}
                    key={row.originalId}

                  >
                    {columns.map(column => (
                      <TableCell
                        key={column.field}
                        align={column.align || 'left'}
                        sortDirection={orderBy === row.id ? order : false}
                        onClick={() => onSelect(row.originalId)}

                      >

                        { (column.format) ? column.format(row[column.field]) : row[column.field]}
                      </TableCell>
                    ))
                    }

                    <TableCell key={row.field}>
                      {this.iconButton(row)}
                    </TableCell>
                  </TableRow>

                ))}
            </TableBody>
          </Table>

          <TablePagination
            component="div"
            count={count}
            rowsPerPage={rowsPerPage}
            page={page}
            rowsPerPageOptions={[]}
            backIconButtonProps={{
              'aria-label': 'Previous Page',
            }}
            nextIconButtonProps={{
              'aria-label': 'Next Page',
            }}
            onChangePage={onChangePage}
          />
        </Paper>
      </>
    );
  }
}
TraineeTable.defaultProps = {
  count: '',
  page: 0,
  rowsPerPage: '',
};
TraineeTable.propTypes = {
  classes: PropTypes.shape().isRequired,
  id: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  actions: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSelect: PropTypes.func.isRequired,
  onSort: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  page: PropTypes.number,
  count: PropTypes.number,
  onChangePage: PropTypes.func.isRequired,
  rowsPerPage: PropTypes.number,
};

export default withStyles(styles)(withLoaderAndMessage(TraineeTable));
