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
    AppWrapper.unmount();
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
    const locations = extractLocations(mockData);
    CitySearchWrapper.setState({ suggestions: locations });
    const suggestions = CitySearchWrapper.state("suggestions");
    const selectedIndex = Math.floor(Math.random() * suggestions.length);
    const selectedCity = suggestions[selectedIndex];
    await CitySearchWrapper.instance().handleItemClicked(selectedCity);
    const allEvents = await getEvents();
    const eventsToShow = allEvents.filter(
      (event) => event.location === selectedCity
    );
    expect(AppWrapper.state("events")).toEqual(eventsToShow);
    AppWrapper.unmount();
  });

  test('get list of all events when user selects "see all cities"', async () => {
    const AppWrapper = mount(<App />);
    const suggestionItems = AppWrapper.find(CitySearch).find(".suggestions li");
    await suggestionItems.at(suggestionItems.length - 1).simulate("click");
    const allEvents = await getEvents();
    expect(AppWrapper.state("events")).toEqual(allEvents);
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

  test("input change in NumberOfEvents updates the eventLength state in App component", async () => {
    const AppWrapper = mount(<App />);
    const NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents);
    //generates random number 1-100
    const selectedNumber = Math.floor(Math.random() * (100 - 1 + 1) + 1);
    NumberOfEventsWrapper.setState({ eventsNumber: selectedNumber });
    expect(NumberOfEventsWrapper.state('eventsNumber')).not.toEqual(0);
    //can't use instance() like for citysearch?
    NumberOfEventsWrapper.find('input.edit-number').simulate('change', { target: { value: selectedNumber } });
    const allEvents = await getEvents();
    const eventsToShow = allEvents.slice(0, selectedNumber);
    expect(AppWrapper.state("events")).toEqual(eventsToShow);
    expect(AppWrapper.state("eventsLength")).toEqual(selectedNumber);
    AppWrapper.unmount();
  });


});
