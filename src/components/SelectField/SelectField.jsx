import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Styling from './style';

const propTypes = {
  error: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.string),
  defaultText: PropTypes.string,
};
const defaultTypes = {
  error: '',
  options: [],
  defaultText: 'select',
};


export default class Slider extends Component {
  constructor() {
    super();
    this.state = {
    };
  }

  componentDidMount() {
  }


  render() {
    const {
      error,
      value,
      onChange,
      options,
      defaultText,
      ...rest
    } = this.props;
    return (
      <select {...rest} style={{ ...Styling.base }} onChange={onChange}>
        <option value={defaultText}>
          {defaultText}
        </option>
        {
          options.map(opt => (
            <option key={opt.label} value={opt.value}>
              {opt.label}
            </option>
          ))
        }
      </select>
    );
  }
}
Slider.propTypes = propTypes;
Slider.defaultProps = defaultTypes;
