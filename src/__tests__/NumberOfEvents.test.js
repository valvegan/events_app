import React from "react";
import { shallow } from "enzyme";
import NumberOfEvents from "../NumberOfEvents";
import { mockData } from "../mock-data";

describe("<CitySearch /> component", () => {
  let NumberOfEventsWrapper;
  beforeAll(() => {
    NumberOfEventsWrapper = shallow(
      <NumberOfEvents eNumber={mockData.length} />
    );
  });

  test("render number of events container div", () => {
    expect(NumberOfEventsWrapper.find("div.eventsNumber")).toHaveLength(1);
  });

  test("renders input labels", () => {
    expect(NumberOfEventsWrapper.find("label")).toHaveLength(2);
  });

  test("renders input box", () => {
    expect(NumberOfEventsWrapper.find("input.edit-number")).toHaveLength(1);
  });

  //input number is equal to the default state of 32
  test("renders input number correctly", () => {
    const eventsNumber = NumberOfEventsWrapper.state("eventsNumber");
    expect(NumberOfEventsWrapper.find("input.edit-number").prop("value")).toBe(
      eventsNumber
    );
  });

  //tests if the input number updates the state after being altered
  test("change state when text input changes", () => {
    NumberOfEventsWrapper.setState({
      eventsNumber: "2",
    });
    const eventObject = { target: { value: "2" } };
    NumberOfEventsWrapper.find("input.edit-number").simulate(
      "change",
      eventObject
    );
    expect(NumberOfEventsWrapper.state("eventsNumber")).toBe("2");
  });
});
