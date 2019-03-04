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
  },
});
class TraineeTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  getStripedStyle = index => (
    { background: index % 2 ? '#f2f2f2' : 'white' }
  )

  createSortHandler = property => (event) => {
    const { onSort } = this.props;
    onSort(event, property);
  }


  render() {
    const {
      classes, id, columns, data, onSelect, order, orderBy,
    } = this.props;
    return (
      <>

        <Paper className={classes.root}>
          <Table className={classes.table} key={id} onRowSelection={onSelect}>
            <TableHead>
              <TableRow>
                { columns.map(opt => (
                  <TableCell key={opt.filed} align={opt.align || 'left'}>
                    <TableSortLabel
                      active={orderBy === opt.field}
                      direction={order}
                      onClick={this.createSortHandler(opt.field)}
                    >
                      {opt.label || opt.field}
                    </TableSortLabel>

                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, index) => (
                <TableRow
                  className={classes.tableRow}
                  style={{ ...this.getStripedStyle(index) }}
                  hover
                  key={row.id}
                  onClick={() => onSelect(row.id)}
                >
                  {columns.map(column => (
                    <TableCell
                      key={column.field}
                      align={column.align || 'left'}
                      sortDirection={orderBy === row.id ? order : false}
                      component="th"
                      scope="row"
                    >
                      { (column.format) ? column.format(row[column.field]) : row[column.field]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </>
    );
  }
}
TraineeTable.propTypes = {
  classes: PropTypes.shape().isRequired,
  id: PropTypes.string.isRequired,
  data: PropTypes.arrayOf.isRequired,
  columns: PropTypes.objectOf.isRequired,
  onSelect: PropTypes.func.isRequired,
  onSort: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
};

export default withStyles(styles)(TraineeTable);
