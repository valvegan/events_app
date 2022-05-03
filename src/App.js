import React, { Component } from "react";
import "./nprogress.css";
import "./App.css";
import EventList from "./EventList";
import CitySearch from "./CitySearch";
import NumberOfEvents from "./NumberOfEvents";
import { extractLocations, getEvents } from "./api";
import illustration from "./images/4 SCENE.svg";
import { toBePartiallyChecked } from "@testing-library/jest-dom/dist/matchers";

class App extends Component {
  state = {
    events: [],
    locations: [],
    //setting default length number to 32
    eventsLength: 32,
    savedLocation: "all",
    totalResNumber: "",
  };

  componentDidMount() {
    this.mounted = true;
    getEvents().then((events) => {
      if (this.mounted) {
        let sliceNumber = this.state.eventsLength;
        let total = events.map((e) => e.id);
        this.setState({
          locations: extractLocations(events),
          //setting events array to return 32 objects
          events: events.slice(0, sliceNumber),
          totalResNumber: total.length,
        });
      }
    });
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  updateEvents = (
    location = this.state.savedLocation,
    number = this.state.eventsLength
  ) => {
    getEvents().then((events) => {
      let locationEvents =
        location === "all"
          ? events
          : events.filter((event) => event.location === location);
          let totalsByLocation = locationEvents.length

      this.setState({
        events: locationEvents.slice(0, number),
        eventsLength: number,
        savedLocation: location,
        totalResNumber: totalsByLocation
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
        <NumberOfEvents
          updateEvents={this.updateEvents}
          events={this.state.events}
          totalResNumber={this.state.totalResNumber}
          
        />
        <EventList events={this.state.events} />
      </div>
    );
  }
}

export default App;
