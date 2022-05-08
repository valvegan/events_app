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
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import EventGenre from "./EventGenre";
import EventGenreByCity from "./EventGenreByCity";

class App extends Component {
  state = {
    events: [],
    locations: [],
    //setting default length number to 32
    eventsLength: 32,
    savedLocation: "all",
    totalResNumber: "",
    showWelcomeScreen: undefined,
    fullEvents: [],
    buttonExpanded: false,
  };

  async componentDidMount() {
    this.mounted = true;
    const accessToken = localStorage.getItem("access_token");
    const isTokenValid = (await checkToken(accessToken)).error ? false : true;
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("code");
    const isOffline = navigator.onLine ? false : true;
    this.setState({
      showWelcomeScreen: !(code || isTokenValid),
      offlineText: isOffline
        ? "Oops! Check your internet connection, you are currently visiting the app offline (some events may not be loaded)"
        : null,
    });
    if (
      (code || isTokenValid) &&
      this.mounted
    ) {
      getEvents().then((events) => {
        let sliceNumber = this.state.eventsLength;
        let total = events.map((e) => e.id);
        this.setState({
          locations: extractLocations(events),
          fullEvents: events,
          //setting events array to return 32 objects
          events: events.slice(0, sliceNumber),
          totalResNumber: total.length,
        });
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
      const isOffline = navigator.onLine ? false : true;

      this.setState({
        events: locationEvents.slice(0, number),
        eventsLength: number,
        savedLocation: location,
        totalResNumber: totalsByLocation,

        offlineText: isOffline
          ? "Oops! Check your internet connection, you are currently visiting the app offline (some events may not be loaded)"
          : null,
      });
    });
  };

  getData = (events) => {
    const { locations, fullEvents } = this.state;
    const data = locations.map((location) => {
      const number = fullEvents.filter(
        (event) => event.location === location
      ).length;
      const city = location.split(", ").shift();

      return { city, number };
    });

    console.log(data);
    return data;
  };

  showDetailsToggle() {
    //if there is a click, the state goes from false to true, then true to false
    this.setState({ buttonExpanded: !this.state.buttonExpanded });
  }

  render() {
    if (this.state.showWelcomeScreen === undefined)
      return <div className="App" />;
    console.log(this.state.showWelcomeScreen);
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

        {
          <WelcomeScreen
            showWelcomeScreen={this.state.showWelcomeScreen}
            getAccessToken={() => {
              getAccessToken();
            }}
          />
        }

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

            <div
              className={
                this.state.buttonExpanded
                  ? "charts-container charts-container-hide"
                  : "charts-container"
              }
            >
              <button
                onClick={() => this.showDetailsToggle()}
                className={
                  this.state.buttonExpanded ? "show-less" : "show-more"
                }
              >
                {/**button text is hide details if state is true, otherwise it's "see details" */}
                {this.state.buttonExpanded
                  ? "Hide data charts"
                  : "View Data Charts"}
              </button>

              {this.state.buttonExpanded && (
                <div className="data-vis-wrapper">
                  <EventGenre events={this.state.fullEvents} />
                  <EventGenreByCity events={this.state.events} />
                  <div className="scatter-chart">
                    <h2>Number of total events by city</h2>
                    <ResponsiveContainer height={300}>
                      <ScatterChart
                        margin={{
                          top: 20,
                          right: 20,
                          bottom: 20,
                          left: 0,
                        }}
                      >
                        <CartesianGrid />
                        <XAxis
                          type="category"
                          dataKey="city"
                          name="city"
                          allowDecimals={false}
                        />
                        <YAxis
                          type="number"
                          dataKey="number"
                          name="number of events"
                        />

                        <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                        <Scatter data={this.getData()} fill="#8884d8" />
                      </ScatterChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}
            </div>
            <EventList events={this.state.events} />
          </div>
        )}
      </div>
    );
  }
}

export default App;
