import React, { Component } from "react";

class NumberOfEvents extends Component {
  state = {
    eventsNumber: 32,
  };

  inputChanged = (event) => {
    //if no number is set, numberValue is set to 32 by default
    const numberValue = event.target.value;
    this.setState({ eventsNumber: numberValue });
    this.props.updateNumber(numberValue);
  };

  render() {
    const { events, updateNumber } = this.props;
    return (
      <div className="eventsNumber">
        <label>Show</label>
        <input
          type="number"
          className="edit-number"
          placeholder={this.state.eventsNumber}
          onChange={this.inputChanged}
        ></input>
        <label>Events</label>
      </div>
    );
  }
}
export default NumberOfEvents;
