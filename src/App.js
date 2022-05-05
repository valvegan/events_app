import React, { Component } from "react";
import "./nprogress.css";
import "./App.css";
import EventList from "./EventList";
import CitySearch from "./CitySearch";
import NumberOfEvents from "./NumberOfEvents";
import { extractLocations, getEvents, checkToken, getAccessToken } from "./api";
import illustration from "./images/4 SCENE.svg";
import WelcomeScreen from "./WelcomeScreen";
import { WarningAlert } from "./Alert";

class App extends Component {
  state = {
    events: [],
    locations: [],
    //setting default length number to 32
    eventsLength: 32,
    savedLocation: "all",
    totalResNumber: "",
    showWelcomeScreen: undefined,
  };

  async componentDidMount() {
    this.mounted = true;
    const accessToken = localStorage.getItem("access_token");
    const isTokenValid = (await checkToken(accessToken)).error ? false : true;
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("code");
    const onlineCheck = navigator.onLine ? true : false
    this.setState({ showWelcomeScreen: !(code || isTokenValid),
    offlineText: onlineCheck ? "Oops! Check your internet connection, you are currently visiting the app offline (some events may not be loaded)"
  : null });
    if ((code || isTokenValid) && this.mounted) {
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
  }

  //setting state of the warning message (when offline) so that it can be removed
  componentDidUpdate() {
    if (this.state.offlineText) {
      setTimeout(() => this.setState({ offlineText: null }), 6000);
    }
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
      let totalsByLocation = locationEvents.length;
      const onlineCheck = navigator.onLine ? true : false

      this.setState({
        events: locationEvents.slice(0, number),
        eventsLength: number,
        savedLocation: location,
        totalResNumber: totalsByLocation,
        offlineText: onlineCheck ? "Oops! Check your internet connection, you are currently visiting the app offline (some events may not be loaded)"
  : null
      });
    });
  };

  render() {
    if (this.state.showWelcomeScreen === undefined)
      return <div className="App" />;
    return (
      //same as welcome page

      <div className="App">
        {!this.state.offlineText && (
          <WarningAlert text={this.state.offlineText} />
        )}
        <h1 className="app-title title">Welcome to the Events App!</h1>
        <div className="img-container">
          <img src={illustration} alt="basic illustration"></img>
        </div>
        <h3 className="app-description">
          A serverless, progressive web application made with React.
          <br></br>It works offline, too!
        </h3>
        {!this.state.showWelcomeScreen && (
          <div>
            <h2 className="sub-heading">
              To browse through events, start by typing a city!
            </h2>

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
        )}
        {/**show welcome screen */}

        <WelcomeScreen
          showWelcomeScreen={this.state.showWelcomeScreen}
          getAccessToken={() => {
            getAccessToken();
          }}
        />
      </div>
    );
  }
}

export default App;
