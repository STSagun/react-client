import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Styling from './style';

const propTypes = {
  error: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  options: PropTypes.arr,
  defaultText: PropTypes.string,
};
const defaultTypes = {
  error: '',
  options: [],
  defaultText: 'select',
  value: '',
  onChange: () => {},
};


export default class SelectField extends Component {
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
SelectField.propTypes = propTypes;
SelectField.defaultProps = defaultTypes;
