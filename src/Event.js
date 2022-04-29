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
    const { event } = this.props
    return (
      <div className="event">
        <h1>{event.summary}</h1>
        <h2 className="basic-info">{event.start.dateTime} | {event.location}</h2>
        <h3 className="sub-heading">@{event.summary}</h3>

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
            <a href={event.htmlLink} className="calendar-link">
              See details on Google Calendar
            </a>
            <p className="event-summary">{event.description}</p>
          </div>
        )}
      </div>
    );
  }
}
export default Event;
