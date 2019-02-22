import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styling from './style';

const propTypes = {
  color: PropTypes.string,
  disabled: PropTypes.bool,
  style: PropTypes.shape(PropTypes.string),
  value: PropTypes.string,
  onClick: PropTypes.func,
};
const defaultTypes = {
  color: 'primary',
  style: {},
  disabled: false,
  value: '',
  onClick: '',
};
export default class Button extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const {
      color,
      value,
      onClick,
      style,
      disabled,
      ...rest
    } = this.props;
    return (
      <button type="button" {...rest} style={{ ...styling.base, ...style }} disabled={disabled}>{value}</button>
    );
  }
}
Button.propTypes = propTypes;
Button.defaultProps = defaultTypes;
