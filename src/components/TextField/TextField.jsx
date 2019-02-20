import PropTypes from 'prop-types';
import React from 'react';
import styling from './style';

const TextField = (props) => {
  const { error, ...rest } = props;
  const errorStyle = (error) ? styling.error : {};
  return (
    <>
      <input type="text" {...rest} style={{ ...styling.base, ...errorStyle }} />
      {(error) ? <aside style={{ color: 'red' }}>{error}</aside> : ''}
    </>
  );
};
TextField.propTypes = {
  error: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};
TextField.defaultProps = {
  value: '',
  error: '',
  onChange: () => {},
};
export default TextField;
