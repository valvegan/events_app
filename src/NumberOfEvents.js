import React, { Component } from "react";

class NumberOfEvents extends Component {
  state = {
    eventsNumber: 32,
  };

  handleInputChanged = (event) => {
    const value = event.target.value;
    this.setState({ eventsNumber: value });
  };

  render() {
    const { events } = this.props;
    return (
      <div className="eventsNumber">
        <label>Show</label>
        <input
          type="number"
          className="edit-number"
          value={this.state.eventsNumber}
          onChange={this.handleInputChanged}
        ></input>
        <label>Events</label>
      </div>
    );
  }
}
export default NumberOfEvents;
