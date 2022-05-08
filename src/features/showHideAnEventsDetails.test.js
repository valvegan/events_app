import { loadFeature, defineFeature } from "jest-cucumber";
import React from "react";
import { mount } from "enzyme";
import App from "../App";


const feature = loadFeature("./src/features/showHideAnEventsDetails.feature");
defineFeature(feature, (test) => {
  let AppWrapper;
  test("An event element is collapsed by default", ({ given, when, then }) => {
    given("the main page has been opened", () => {});
    AppWrapper = mount(<App />);
    when("the user opens the app", () => {
      //
    });

    then(
      "they will see a list of upcoming events with minimal information (extra information is collapsed)",
      () => {
        AppWrapper.update();
        expect(AppWrapper.find(".event .details")).toHaveLength(0);
      }
    );
  });

  test("User can expand an event to see its details", ({
    given,
    when,
    then,
  }) => {
    given("a list of events has been loaded", () => {
      AppWrapper = mount(<App />);
    });

    when("the user clicks on the see more button", () => {
      AppWrapper.update();
      AppWrapper.find(".event .show-more").at(0).simulate("click");
    });

    then("they will see more information regarding a specific event", () => {
      AppWrapper.update();
      expect(AppWrapper.find(".event .details")).toHaveLength(1);
      expect(AppWrapper.find(".event .show-less")).toHaveLength(1);
    });
  });

  test("User can collapse an event to hide its details", ({
    given,
    when,
    then,
  }) => {
    given("the event information has been expanded", async () => {
      AppWrapper = await mount(<App />);
      AppWrapper.update();
      AppWrapper.find(".event .show-more").at(0).simulate("click");
    });

    when("the user clicks on the see less button", () => {
      AppWrapper.update();
      AppWrapper.find(".event .show-less").at(0).simulate("click");
    });

    then(
      "they will see less information regarding an event that they expanded prior",
      () => {
        expect(AppWrapper.find(".event .show-less")).toHaveLength(0);
        expect(AppWrapper.find(".event .details")).toHaveLength(0);
      }
    );
  });
});
