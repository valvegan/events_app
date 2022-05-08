Feature: specify number of events

Scenario: When user hasn’t specified a number, 32 is the default number
Given the main page has been opened 
And a list of events has been loaded
When the user opens the page or scrolls down the list
Then they will only see 32 events by default

Scenario: User can change the number of events they want to see
Given a list of events has been loaded
When the user focuses on the label that specifies the number of viewable events
Then the number of events listed will updated based on the users specified number 