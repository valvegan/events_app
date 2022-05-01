import { loadFeature, defineFeature } from "jest-cucumber";
const feature = loadFeature("./src/features/specifyNumberOfEvents.feature");
defineFeature(feature, (test) => {
  test("When user hasn’t specified a number, 32 is the default number", ({
    given,
    and,
    when,
    then,
  }) => {
    given("the main page has been opened", () => {});

    and("a list of events has been loaded", () => {});

    when("the user opens the page or scrolls down the list", () => {});

    then("they will only see 32 events by default", () => {});
  });

  test("User can change the number of events they want to see", ({
    given,
    when,
    then,
  }) => {
    given("a list of events has been loaded", () => {});

    when(
      "the user focuses on the label that specifies the number of viewable events",
      () => {}
    );

    then(
      "the number of events listed will updated based on the users specified number",
      () => {}
    );
  });
});
