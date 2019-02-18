import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getRandomNumber, getNextRoundRobin } from '../../libs/utils/math';
import { DEFAULT_BANNER_IMAGE } from '../../config/constant';

const propTypes = {
  altText: PropTypes.string,
  banners: PropTypes.arr,
  defaultBanner: PropTypes.string,
  duration: PropTypes.number,
  height: PropTypes.number,
  random: PropTypes.bool,
};
const defaultTypes = {
  altText: 'Default Banner',
  banners: '',
  defaultBanner: DEFAULT_BANNER_IMAGE,
  duration: 2000,
  height: 200,
  random: false,
};


export default class Slider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
    };
  }

  componentDidMount() {
    const { random, duration } = this.props;
    this.interval = setInterval(() => {
      const { index } = this.state;
      if (random) {
        this.setState({
          index: getRandomNumber(6),
        });
        return;
      }
      const val = getNextRoundRobin(6, index);
      this.setState({
        index: val,
      });
    }, duration);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const {
      altText,
      banners,
      defaultBanner,
      random,
      height,
      ...rest
    } = this.props;
    const {
      index,
    } = this.setState;
    const source = (banners) ? banners[index] : defaultBanner;
    return (
      <>
        <div style={{ textAlign: 'center' }}>
          <img src={source} {...rest} alt={altText} height={height} />
        </div>
      </>
    );
  }
}

Slider.propTypes = propTypes;
Slider.defaultProps = defaultTypes;
