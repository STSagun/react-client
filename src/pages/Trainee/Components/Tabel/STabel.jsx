import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});
class STable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const {
      classes, id, columns, data,
    } = this.props;
    return (
      <>

        <Paper className={classes.root}>
          <Table className={classes.table} key={id}>
            <TableHead>
              <TableRow>
                { columns.map(opt => (
                  <TableCell key={opt.filed} align={opt.align || 'left'}>
                    {opt.label || opt.field}
                  </TableCell>
                ))}

              </TableRow>
            </TableHead>
            <TableBody>
              {data.map(row => (
                <TableRow key={row.id}>
                  {columns.map(row1 => (
                    <TableCell key={row1.filed} align={row1.align || 'left'} component="th" scope="row">
                      {row[row1.field]}
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
STable.propTypes = {
  classes: PropTypes.shape().isRequired,
  id: PropTypes.string.isRequired,
  data: PropTypes.arrayOf.isRequired,
  columns: PropTypes.arrayOf.isRequired,
};

export default withStyles(styles)(STable);
