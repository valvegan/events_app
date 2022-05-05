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
    this.setState({ showWelcomeScreen: !(code || isTokenValid) });
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
    if (!navigator.onLine) {
      this.setState({
        offlineText:
          "Oops! Check your internet connection, you are currently visiting the app offline (some events may not be loaded)",
      });
    } else if(navigator.onLine){
      this.setState({
        offlineText: null,
      });
    }
  }

  //setting state of the warning message (when offline) so that it can be removed
  componentDidUpdate(){
    setTimeout(() => this.setState({offlineText: null}), 6000);
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

      this.setState({
        events: locationEvents.slice(0, number),
        eventsLength: number,
        savedLocation: location,
        totalResNumber: totalsByLocation,
      });
    });
    if (!navigator.onLine) {
      this.setState({
        offlineText:
          "Oops! Check your internet connection, you are currently visiting the app offline (some events may not be loaded)",
      });
    } else {
      this.setState({
        offlineText: null,
      });
    }
  };

  render() {
    
    return (
      //same as welcome page 
      <div className="App">
        {this.state.offlineText && (
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

        {this.state.WelcomeScreen && 
        <WelcomeScreen
          showWelcomeScreen={this.state.showWelcomeScreen}
          getAccessToken={() => {
            getAccessToken();
          }}
        />}

        

        {/**end of same as welcome screen */}
        {this.state.WelcomeScreen === undefined && 
        <div>
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
        }
       
      </div>
    );
  }
}

export default App;
