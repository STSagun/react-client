import React from 'react';
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
const calculateFunction = (first, second, operator) => {
  if (operator === '+') return first + second;
  if (operator === '-') return first - second;
  if (operator === '/') return (second === 0) ? 'infinity' : (first / second);
  return 'Invalid Operation';
};
export default function Math(props) {
  const {
    first,
    second,
    operator,
    children,
  } = props;
  const result = calculateFunction(first, second, operator);
  return (
    <div>
      { children(first, second, operator, result) }
    </div>
  );
}
Math.propTypes = propTypes;
Math.defaultProps = defaultTypes;
