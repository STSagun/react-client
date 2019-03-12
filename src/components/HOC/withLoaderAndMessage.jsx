import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types';

const withLoaderAndMessage = (WrappedComponent) => {
  class HOC extends React.Component {
    state = {};

    render() {
      const { loading, dataLength } = this.props;
      if (!loading && dataLength) return <WrappedComponent {...this.props} />;
      if (loading) {
        return (
          <div style={{ textAlign: 'center' }}>
            <CircularProgress />
          </div>
        );
      }
      HOC.propTypes = {
        loading: PropTypes.bool.isRequired,
        dataLength: PropTypes.number.isRequired,
      };
      return <p> OOPS!, No More Data</p>;
    }
  }
  return HOC;
};

export default withLoaderAndMessage;
