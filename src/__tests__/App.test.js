import React from "react";
import { shallow, mount } from "enzyme";
import App from "../App";
import EventList from "../EventList";
import CitySearch from "../CitySearch";
import NumberOfEvents from "../NumberOfEvents";
import { extractLocations, getEvents } from "../api";
import { mockData } from "../mock-data";

describe("<App /> component", () => {
  let AppWrapper;
  beforeAll(() => {
    AppWrapper = shallow(<App />);
  });

  test("render list of events", () => {
    expect(AppWrapper.find(EventList)).toHaveLength(1);
  });

  test("render CitySearch", () => {
    expect(AppWrapper.find(CitySearch)).toHaveLength(1);
  });

  test("render NumberOfEvents", () => {
    expect(AppWrapper.find(NumberOfEvents)).toHaveLength(1);
  });
});

//integration testing
describe("<App/> integration", () => {
  test('App passes "events" state as prop to EventList', () => {
    const AppWrapper = mount(<App />);
    const AppEventsState = AppWrapper.state("events");
    expect(AppEventsState).not.toEqual(undefined);
    expect(AppWrapper.find(EventList).props().events).toEqual(AppEventsState);
  });

  test('App passes "locations" state as a prop to CitySearch', () => {
    const AppWrapper = mount(<App />);
    const AppLocationsState = AppWrapper.state("locations");
    expect(AppLocationsState).not.toEqual(undefined);
    expect(AppWrapper.find(CitySearch).props().locations).toEqual(
      AppLocationsState
    );
    AppWrapper.unmount();
  });

  test("get list of events matching the city selected by the user", async () => {
    const AppWrapper = mount(<App />);
    const CitySearchWrapper = AppWrapper.find(CitySearch);
    const NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents);
    const allEvents = await getEvents();
    const locations = extractLocations(mockData);
    CitySearchWrapper.setState({ suggestions: locations });
    const suggestions = CitySearchWrapper.state("suggestions");
    const selectedIndex = Math.floor(Math.random() * suggestions.length);
    const selectedCity = suggestions[selectedIndex];
    await CitySearchWrapper.instance().handleItemClicked(selectedCity);
    const eventsToShow = allEvents
      .filter((event) => event.location === selectedCity)
      .slice(0, 32);
    NumberOfEventsWrapper.setState({ eventsNumber: 32 });
    AppWrapper.setState({ savedLocation: selectedCity, eventsLength: 32 });
    expect(AppWrapper.state("events")).toEqual(eventsToShow);
    AppWrapper.unmount();
  });

  test('get list of all events when user selects "see all cities"', async () => {
    const AppWrapper = mount(<App />);
    const suggestionItems = AppWrapper.find(CitySearch).find(".suggestions li");
    await suggestionItems.at(suggestionItems.length - 1).simulate("click");
    const allEvents = await getEvents();
    expect(AppWrapper.state("events")).toEqual(allEvents);
    expect(AppWrapper.state("events")).toHaveLength(allEvents.length);
    AppWrapper.unmount();
  });

  test("load a list of 32 events by default", async () => {
    const AppWrapper = mount(<App />);
    const allEvents = await getEvents();
    //check if the state of "eventsLength" (which returns a number) is not undefined
    expect(AppWrapper.state("eventsLength")).not.toEqual(undefined);
    const sliceNumber = AppWrapper.state("eventsLength");
    //check if the events state is updated with the appropriate length after fetching
    expect(AppWrapper.state("events")).toEqual(allEvents.slice(0, sliceNumber));
    AppWrapper.unmount();
  });

  test("input change in NumberOfEvents updates the events state in App component", async () => {
    const AppWrapper = mount(<App />);
    const NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents);
    //const allEvents = await getEvents();
    const selectedCity = "London, UK";
    //using mockdata I know there's 3 events for london and 2 for berlin, so for London I should receive 3 events
    const selectedNumber = 3;
    //numberofevents function in action
    await NumberOfEventsWrapper.instance().inputChanged({
      target: { value: selectedNumber },
    });
    const eventsToShow = mockData
      .filter((e) => e.location === selectedCity)
      .slice(0, selectedNumber);
    AppWrapper.setState({ events: eventsToShow });
    expect(AppWrapper.state("events")).toEqual(eventsToShow);
    expect(AppWrapper.state("events")).not.toEqual(undefined);
    expect(AppWrapper.state("events")).toHaveLength(selectedNumber);
    AppWrapper.unmount();
  });

  test("input change in NumberOfEvents and city change in CitySearch updates the events state in App component", async () => {
    const AppWrapper = mount(<App />);
    const NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents);
    const CitySearchWrapper = AppWrapper.find(CitySearch);
    const location = extractLocations(mockData)[0];
    await CitySearchWrapper.instance().handleItemClicked(location);
    const selectedNumber = 2;
    await NumberOfEventsWrapper.instance().inputChanged({
      target: { value: selectedNumber },
    });
    AppWrapper.setState({ savedLocation: location });
    expect(AppWrapper.state("events")).not.toEqual(undefined);
    expect(AppWrapper.state("events")).toHaveLength(selectedNumber);
    AppWrapper.unmount();
  });
});
