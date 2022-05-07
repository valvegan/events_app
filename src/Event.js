import React, { Component } from "react";
import locationSvg from "./images/location.svg";

class Event extends Component {
  state = {
    buttonExpanded: false,
    date: "",
  };

  showDetailsToggle() {
    //if there is a click, the state goes from false to true, then true to false
    this.setState({ buttonExpanded: !this.state.buttonExpanded });
  }

  render() {
    const { event } = this.props;

      const eventDate = event.start.dateTime;
      let months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      let splitDate = eventDate.split(/[-T]+/);
      let exactTime = splitDate[3].split("+")[0];
      let extraTime = splitDate[3].split("+")[1].slice(1,2)
      let yearDate = splitDate[0];
      let yearMonth = splitDate[1].includes("0")
        ? splitDate[1].slice(1, 2)
        : splitDate[1];
      let yearDay = splitDate[2];
      var yearMonthInt = parseInt(yearMonth);
      let monthStr = months.slice(yearMonthInt, yearMonthInt + 1);
      let dateToConvert = `${monthStr} ${yearDay}, ${yearDate} ${exactTime}`;
      let converD = new Date(dateToConvert);
      let weekdays = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ];
      let dayInt = converD.getDay();
      //this is the exact weekday (name)
      let actualDay = weekdays[dayInt];
      let convertedDate =
        `${actualDay} ${yearDay}/${splitDate[1]}/${yearDate}, at ${exactTime}`
      
      
      
    return (
      <div className="event">
        <h1>{event.summary}</h1>
        <h2 className="basic-info">
          {convertedDate} <span>Timezone: {event.start.timeZone} + {extraTime} hours</span>
        </h2>
        <div className="location-container">
          <img src={locationSvg} alt="location icon"></img>
          <h2> {event.location}</h2>
        </div>

        <h3 className="sub-heading">@{event.summary}</h3>

        {/*if buttonexpanded is true, then add class of"show less", else add class of "show -more" */}
        <div className="details-container">
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
      </div>
    );
  }
}
export default Event;
