import PropTypes from 'prop-types';
import React from 'react';
import styling from './style';

const TextField = (props) => {
  const { err, ...rest } = props;
  const errorStyle = (err) ? styling.error : {};
  return (
    <>
      <input type="text" {...rest} style={{ ...styling.base, ...errorStyle }} />
      {(err) ? <aside style={{ color: 'red' }}>{err}</aside> : ''}
    </>
  );
};
TextField.propTypes = {
  err: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};
TextField.defaultProps = {
  value: '',
  err: '',
  onChange: () => {},
};
export default TextField;
