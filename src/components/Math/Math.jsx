import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  first: PropTypes.number.isRequired,
  second: PropTypes.number.isRequired,
  operator: PropTypes.string.isRequired,
  children: PropTypes.func,
};
const defaultTypes = {
  children: () => {},
};
export default class Math extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  calculateFunction = (first, second, operator) => {
    if (operator === '+') return first + second;
    if (operator === '-') return first - second;
    if (operator === '/') return (second === 0) ? 'infinity' : (first / second);
    return 'Invalid Operation';
  }

  render() {
    const {
      first,
      second,
      operator,
      children,
    } = this.props;
    const result = this.calculateFunction(first, second, operator);
    return (
      <div>
        { children(first, second, operator, result) }
      </div>
    );
  }
}
Math.propTypes = propTypes;
Math.defaultProps = defaultTypes;
