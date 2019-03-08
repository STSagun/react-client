import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const styles = {
  root: {
    flexGrow: 1,
    fontSize: '15px',
  },
  grow: {
    flexGrow: 1,
  },
  button: {
    marginLeft: '25px',
  },
  style: {
    textDecoration: 'none',
    color: 'white',
  },
};


class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  handleClick = () => {
    localStorage.removeItem('Token');
  }

  render() {
    const {
      classes,
    } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              Trainee Portal
            </Typography>
            <Button color="inherit"><Link to="/trainee" className={classes.style}>TRAINEE</Link></Button>
            <Button color="inherit"><Link to="/textfield-demo" className={classes.style}>TEXTFIELD DEMO</Link></Button>
            <Button color="inherit"><Link to="/input-demo" className={classes.style}>INPUT DEMO</Link></Button>
            <Button color="inherit"><Link to="/children-demo" className={classes.style}>CHILDREN DEMO</Link></Button>
            <Button color="inherit"><Link to="/login" onClick={() => this.handleClick()} className={classes.style}>LogOut</Link></Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}


Navbar.propTypes = {
  classes: PropTypes.shape().isRequired,
};

export default withStyles(styles)(Navbar);
