import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  error: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.string),
  defaultText: PropTypes.string,
};
const defaultTypes = {
  error: '',
  options: [],
  defaultText: '',
  value: '',
  onChange: '',
};


export default class RadioGroup extends Component {
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
      <>
        { options.map(opt => (
          <div>
            <input type="radio" name={opt} {...rest} key={opt.label} value={opt.value} />
            {opt.value}
          </div>
        ))}
      </>
    );
  }
}
RadioGroup.propTypes = propTypes;
RadioGroup.defaultProps = defaultTypes;