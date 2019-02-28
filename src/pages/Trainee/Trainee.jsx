import React, { Component } from 'react';
import {
  Route, Switch,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import { TraineeList, TraineDetail } from './index';

class Trainee extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { match } = this.props;
    return (
      <>
        <Switch>
          <Route exact path={`${match.path}`} component={TraineeList} />
          <Route exact path={`${match.path}/:id`} component={TraineDetail} />


        </Switch>
      </>
    );
  }
}
Trainee.propTypes = {
  match: PropTypes.shape().isRequired,
};
export default Trainee;
