import React, { Component } from 'react';
import * as yup from 'yup';
import { SelectField, TextField } from '../../components';
import { RadioGroup } from '../../components/RadioGroup';
import { Button } from '../../components/button';

const dropDownArr = [
  { label: 'Cricket', value: 'cricket' },
  { label: 'Football', value: 'football' },
];
const cricketArr = [
  { label: 'Wicket Keeper', value: 'wicket Keeper' },
  { label: 'Bastman', value: 'bastman' },
  { label: 'Bowler', value: 'bowler' },
  { label: 'All Rounder', value: 'all Rounder' },
];
const footBallArr = [
  { label: 'Defender', value: 'defender' },
  { label: 'Striker', value: 'striker' },
];
const schema = yup.object().shape({
  name: yup
    .string()
    .required('Name is required field')
    .min(3),
  sport: yup.string().required('Sport is required field'),
  radio: yup.string().required('what you do is required field'),
});
class InputDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      error: { name: '', sport: '', radio: '' },
      touched: {
        name: false,
        sport: false,
        radio: false,
      },
      hasError: {
        name: false,
        sport: false,
        radio: false,
      },
    };
  }

  handlerChange = field => (event) => {
    const { touched } = this.state;
    this.setState({
      [field]: event.target.value,
      touched: { ...touched, [field]: true },
    },
    () => this.validate((field)));
  }

  validate = (value) => {
    const {
      name,
      sport,
      radio,
      error,
      hasError,
    } = this.state;
    schema
      .validate({
        name,
        sport,
        radio,
      }, { abortEarly: false })
      .then(() => {
        this.setState({
          error: { ...error, [value]: '' },
          hasError: { ...hasError, [value]: false },
        });
      })
      .catch((err) => {
        err.inner.forEach((errors) => {
          if (errors.path === value) {
            this.setState({
              error: { ...error, [value]: errors.message },
              hasError: { ...hasError, [value]: true },
            });
          }
        });
        if (!err.inner.some(errors => errors.path === value) && hasError[value]) {
          this.setState({
            error: { ...error, [value]: '' },
            hasError: { ...hasError, [value]: false },
          });
        }
      });
  }

  hasError = () => {
    const { hasError, touched } = this.state;
    let check = 0;
    let touchCheck = 0;
    Object.keys(hasError).forEach((element) => {
      if (!hasError[element]) check += 1;
    });
    Object.keys(touched).forEach((element) => {
      if (touched[element]) touchCheck += 1;
    });
    return (check === 3 && touchCheck === 3);
  }

  isTouched = () => {
    const { touched } = this.state;
    return Object.keys(touched).length;
  }


  onBlur = (value) => {
    this.validate(value);
  }

  render() {
    const {
      name,
      sport, error,
    } = this.state;
    let radio;
    if (sport === 'cricket') {
      radio = cricketArr;
    } else if (sport === 'football') {
      radio = footBallArr;
    }
    console.log(this.state);
    return (
      <>
        <p>
          <b>Name</b>
        </p>
        <TextField
          value={name}
          onChange={this.handlerChange('name')}
          onBlur={() => this.onBlur('name')}
          err={error.name || ''}
        />

        <p>
          <b>Select the game you play</b>
        </p>
        <SelectField
          options={dropDownArr}
          onChange={this.handlerChange('sport')}
          onBlur={() => this.onBlur('sport')}
          err={error.sport || ''}
        />
        {sport && sport !== 'select' ? (
          <div>
            <h4>What you do?</h4>
            <RadioGroup
              options={radio}
              onChange={this.handlerChange('radio')}
              err={error.radio || ''}
              onBlur={() => this.onBlur('radio')}
            />
          </div>
        ) : ''
        }
        <div style={{ textAlign: 'right', marginRight: '75px', padding: '20px' }}>
          <Button value="Cancel" />
          { this.hasError() ? <Button value="Submit" style={{ backgroundColor: '#00CA57', color: 'white' }} /> : <Button value="Submit" disabled />
          }
        </div>
      </>
    );
  }
}

export default InputDemo;
