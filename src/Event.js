import React, { Component } from "react";

class Event extends Component {
  state = {
    buttonExpanded: false,
  };

  showDetailsToggle() {
    //if there is a click, the state goes from false to true, then true to false
    this.setState({ buttonExpanded: !this.state.buttonExpanded });
  }
  render() {
    return (
      <div className="event">
        <h1>{this.props.summary}</h1>
        <h2 className="basic-info">{this.props.start}</h2>
        <h3 className="sub-heading">{this.props.summary}</h3>

        {/*if buttonexpanded is true, then add class of"show less", else add class of "show -more" */}
        <button
          onClick={() => this.showDetailsToggle()}
          className={this.state.buttonExpanded ? "show-less" : "show-more"}
        >
          {/**button text is hide details if state is true, otherwise it's "see details" */}
          {this.state.buttonExpanded ? "Hide details" : "See details"}
        </button>

        {this.state.buttonExpanded && (
          <div className="details">
            <h2 className="about">About the event</h2>
            <a href={this.props.htmlLink} className="calendar-link">
              See details on Google Calendar
            </a>
            <p className="event-summary">{this.props.description}</p>
          </div>
        )}
      </div>
    );
  }
}
export default Event;
