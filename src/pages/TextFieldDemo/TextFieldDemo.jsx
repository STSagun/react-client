import React from 'react';
import TextField from '../../components';

const TextFieldDemo = () => (
  <>
    <p><b>This is a Disable Input</b></p>
    <TextField disabled value="Disabled Input" />
    <p><b>A Valid Input</b></p>
    <TextField value="Accessible" />
    <p><b>An Input with errors </b></p>
    <TextField value="101" error="Could not be greater than " />
  </>
);

export default TextFieldDemo;
