import React from "react";
import { shallow } from "enzyme";
import Event from "../Event";
import { mockData } from "../mock-data";

describe("<Event /> component", () => {
  let EventWrapper;
  beforeAll(() => {
    EventWrapper = shallow(<Event event={mockData[0]} />);
  });

  //render the event element (div)
  test("render one event", () => {
    expect(EventWrapper.find(".event")).toHaveLength(1);
  });

  //reder information inside the event element
  //1-h1 title mockData.summary
  test("render event title", () => {
    expect(EventWrapper.find("h1")).toHaveLength(1);
  });
  //2 h3 short description (mockData.start.dateTime and mockData.start.timeZone)
  test("render event basic info", () => {
    expect(EventWrapper.find("h2.basic-info")).toHaveLength(1);
  });
  //3 h3 location (it will be "@" mockData.summary and "|" mockData.location)
  test("render event subheading", () => {
    expect(EventWrapper.find("h3.sub-heading")).toHaveLength(1);
  });
  //4 button show-details/hide details (initial state is set to have the details collapsed, so the button with "see details" text is shown as default)
  test("render button", () => {
    expect(EventWrapper.find("button.show-more").text()).toBe("See details");
  });

  //button click - simulate click, change the state from false to true
  test("change state when show more button is clicked", () => {
    //state is set to false in the component
    EventWrapper.find("button.show-more").simulate("click");
    expect(EventWrapper.state("buttonExpanded")).toBe(true);
    //if state is true then the test finds the button with the class "show less"
    expect(EventWrapper.find("button.show-less")).toHaveLength(1);
    //test that the show less button text is "hide details"
    expect(EventWrapper.find("button.show-less").text()).toBe("Hide details");
  });

  //button click - simulate click, change the state of the button from false to true
  test("check if state is toggled correctly (reverse click)", () => {
    //set state to true
    EventWrapper.setState({
      buttonExpanded: true,
    });
    EventWrapper.find("button.show-less").simulate("click");
    expect(EventWrapper.state("buttonExpanded")).toBe(false);
    //if state is false then the test finds the button with the class "show more"
    expect(EventWrapper.find("button.show-more")).toHaveLength(1);
  });

  //h2 "About the event"
  test("check for event details when expanded (state false)", () => {
    //set state to true
    EventWrapper.setState({
      buttonExpanded: true,
    });
    //expect details div (wrapper)
    expect(EventWrapper.find("div.details")).toHaveLength(1);
    //expect h2
    expect(EventWrapper.find("h2.about").text()).toBe("About the event");
  });

  //button "See details on Google Calendar" mockData.htmlLink
  test("check for google calendar link when expanded(state false)", () => {
    EventWrapper.setState({
      buttonExpanded: true,
    });
    //expect button with class "calendar-link"
    expect(EventWrapper.find("a.calendar-link").text()).toBe(
      "See details on Google Calendar"
    );
  });

  //p mockData.description
  test("check for event description when expanded(state false)", () => {
    EventWrapper.setState({
      buttonExpanded: true
    });
    //expect button with class "calendar-link"
    expect(EventWrapper.find("p.event-summary")).toHaveLength(1);
  });
});
