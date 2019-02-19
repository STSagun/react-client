import React, { Component } from 'react';
import { TextField, Slider } from '../../components';
import { PUBLIC_IMAGE_FOLDER } from '../../config/constant';


const banner = [
  `${PUBLIC_IMAGE_FOLDER}default.png`,
  `${PUBLIC_IMAGE_FOLDER}cloud.jpg`,
  `${PUBLIC_IMAGE_FOLDER}dns-server.png`,
  `${PUBLIC_IMAGE_FOLDER}full-stack-web-development.jpg`,
  `${PUBLIC_IMAGE_FOLDER}js.jpg`,
  `${PUBLIC_IMAGE_FOLDER}load-balancer.png`,
];
class TextFieldDemo extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    return (
      <>
        <Slider banners={banner} random />
        <p><b>This is a Disable Input</b></p>
        <TextField disabled value="Disabled Input" />
        <p><b>A Valid Input</b></p>
        <TextField value="Accessible" />
        <p><b>An Input with errors </b></p>
        <TextField value="101" error="Could not be greater than " />

      </>
    );
  }
}

export default TextFieldDemo;
