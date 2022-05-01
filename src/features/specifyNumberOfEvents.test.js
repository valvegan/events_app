import { loadFeature, defineFeature } from "jest-cucumber";
import React from "react";
import { mount, shallow } from "enzyme";
import App from "../App";
import { mockData } from "../mock-data";
import CitySearch from "../CitySearch";
import { extractLocations, getEvents } from "../api";

const feature = loadFeature("./src/features/specifyNumberOfEvents.feature");
defineFeature(feature, (test) => {
  test("When user hasn’t specified a number, 32 is the default number", ({
    given,
    and,
    when,
    then,
  }) => {
    let AppWrapper;
    given("the main page has been opened", () => {
      AppWrapper = mount(<App />);
    });

    and("a list of events has been loaded", () => {
      AppWrapper.update();
    });

    when("the user opens the page or scrolls down the list", () => {
      //
    });

    then("they will only see 32 events by default", () => {
      expect(AppWrapper.find(".event")).toHaveLength(mockData.length);
    });
  });

  test("User can change the number of events they want to see", ({
    given,
    when,
    then,
  }) => {
    let AppWrapper;
    given("a list of events has been loaded", async () => {
      AppWrapper = await mount(<App />);
    });

    when(
      "the user focuses on the label that specifies the number of viewable events",
      () => {
        AppWrapper.update();
        AppWrapper.find(".edit-number").simulate('change', {target: {value: 2}})
      }
    );

    then(
      "the number of events listed will updated based on the users specified number",
      () => {
        AppWrapper.update();
        expect(AppWrapper.find(".event")).toHaveLength(2);
      }
    );
  });
});
