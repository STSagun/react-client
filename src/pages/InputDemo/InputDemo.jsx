import React, { Component } from 'react';
import { SelectField, TextField } from '../../components';
import { RadioGroup } from '../../components/RadioGroup';

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
class InputDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
    };
  }

  handleNameChange = (event) => {
    this.setState({
      name: event.target.value,
    });
  }

  handleSportChange = (event) => {
    this.setState({
      sport: event.target.value,
    });
  }

  handelSportOptionsChange = (event) => {
    const { sport } = this.state;
    this.setState({
      cricket: (sport === 'cricket') ? event.target.value : '',
      football: (sport === 'football') ? event.target.value : '',
    });
  }

  render() {
    const { name, sport } = this.state;
    let radio;
    if (sport === 'cricket') {
      radio = cricketArr;
    } else if (sport === 'football') {
      radio = footBallArr;
    }
    console.log(this.state);
    return (
      <div>
        <p><b>Name</b></p>
        <TextField value={name} onChange={this.handleNameChange} />
        <p><b>Select the game you play</b></p>
        <SelectField options={dropDownArr} onChange={this.handleSportChange} />
        { sport && sport !== 'select'
          ? (
            <div>
              <h4>What you do?</h4>
              <RadioGroup options={radio} onChange={this.handelSportOptionsChange} />
            </div>
          )
          : '' }

      </div>
    );
  }
}

export default InputDemo;
