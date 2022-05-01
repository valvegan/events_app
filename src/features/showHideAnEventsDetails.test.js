import { loadFeature, defineFeature } from "jest-cucumber";
const feature = loadFeature("./src/features/showHideAnEventsDetails.feature");
defineFeature(feature, (test) => {
  test("An event element is collapsed by default", ({ given, when, then }) => {
    given("the main page has been opened", () => {});

    when("the user opens the app", () => {});

    then(
      "they will see a list of upcoming events with minimal information",
      () => {}
    );
  });

  test("User can expand an event to see its details", ({
    given,
    when,
    then,
  }) => {
    given("a list of events has been loaded", () => {});

    when("the user clicks on the see more button", () => {});

    then("they will see more information regarding a specific event", () => {});
  });

  test("User can collapse an event to hide its details", ({
    given,
    when,
    then,
  }) => {
    given("the event information has been expanded", () => {});

    when("the user clicks on the see more button", () => {});

    then(
      "they will see less information regarding an event that they expanded prior",
      () => {}
    );
  });
});
