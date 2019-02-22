import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Styling from './style';

const propTypes = {
  err: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.shape()),
  defaultText: PropTypes.string,
  cricket: PropTypes.string,
  football: PropTypes.string,
};

const defaultTypes = {
  err: '',
  options: [{}],
  defaultText: '',
  value: '',
  onChange: () => {},
  cricket: '',
  football: '',
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
      err,
      value,
      onChange,
      options,
      cricket,
      football,
      defaultText,
      ...rest
    } = this.props;

    return (
      <>
        { options.map(opt => (
          <div key={opt.label}>
            <input type="radio" name={opt} id={opt.label} {...rest} key={opt.label} value={opt.value} onChange={onChange} style={{ ...Styling.base }} />
            {opt.label}
          </div>
        ))
        }
        {err ? <aside style={{ color: 'red' }}>{err}</aside> : ''}

      </>
    );
  }
}
RadioGroup.propTypes = propTypes;
RadioGroup.defaultProps = defaultTypes;
