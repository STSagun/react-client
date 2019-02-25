import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Styling from './style';

const propTypes = {
  err: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.shape()),
  defaultText: PropTypes.string,
};
const defaultTypes = {
  err: '',
  options: [{}],
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
      err,
      value,
      onChange,
      options,
      defaultText,
      ...rest
    } = this.props;
    return (
      <>
        <select {...rest} style={{ ...Styling.base }} onChange={onChange}>
          <option disabled selected>
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
        {(err) ? <aside style={{ color: 'red' }}>{err}</aside> : ''}
      </>
    );
  }
}
SelectField.propTypes = propTypes;
SelectField.defaultProps = defaultTypes;
