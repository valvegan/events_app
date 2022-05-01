import React, { Component } from "react";

class NumberOfEvents extends Component {
  state = {
    eventsNumber: 32,
  };

  inputChanged = (event) => {
    //if no number is set, numberValue is set to 32 by default
    const numberValue = event.target.value;
    this.setState({ eventsNumber: numberValue });
    this.props.updateEvents(null, numberValue);
  };

  render() {
    const { events, updateEvents } = this.props;
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
