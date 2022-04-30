import React, { Component } from "react";
import "./nprogress.css";
import "./App.css";
import EventList from "./EventList";
import CitySearch from "./CitySearch";
import NumberOfEvents from "./NumberOfEvents";
import { extractLocations, getEvents } from "./api";
import illustration from "./images/4 SCENE.svg";

class App extends Component {
  state = {
    events: [],
    locations: [],
    //setting default length number to 32
    eventsLength: 32,
  };

  componentDidMount() {
    this.mounted = true;
    getEvents().then((events) => {
      if (this.mounted) {
        let sliceNumber = this.state.eventsLength;
        this.setState({
          locations: extractLocations(events),
          //setting events array to return 32 objects
          events: events.slice(0, sliceNumber),
        });
      }
    });
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  updateEvents = (location) => {
    getEvents().then((events) => {
      const locationEvents =
        location === "all"
          ? events
          : events.filter((event) => event.location === location);
      this.setState({
        events: locationEvents,
      });
    });
  };

  //update number will interact with NumberOfEvents component to update the eventsLength state, which in return updates the events state
  updateNumber = (number) => {
    getEvents().then((events) => {
      const numberEvents =
        number === 0
          ? //if no number is entered, 32 events get displayed
            events
          : //if number is entered, set number of events gets displayed
            events.slice(0, number);
      this.setState({
        //events length set to number specified
        eventsLength: number,
        //events state set to const numberEvents variable
        events: numberEvents,
      });
  
    });
  };

  render() {
    return (
      //title and intro information (not tested)
      <div className="App">
        <h1 className="app-title title">Welcome to the Events App!</h1>
        <div className="img-container">
          <img src={illustration} alt="basic illustration"></img>
        </div>
        <h3 className="app-description">
          A serverless, progressive web application made with React.
          <br></br>It works offline, too!
        </h3>
        <h2 className="sub-heading">
          To browse through events, start by typing a city!
        </h2>
        {/**end of intro information and image (not tested) */}
        <CitySearch
          locations={this.state.locations}
          updateEvents={this.updateEvents}
        />
        <NumberOfEvents updateNumber={this.updateNumber} />
        <EventList events={this.state.events} />
      </div>
    );
  }
}

export default App;
