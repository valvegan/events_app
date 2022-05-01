Feature: show/hide an events details

Scenario: An event element is collapsed by default
Given the main page has been opened 
When the user opens the app 
Then they will see a list of upcoming events with minimal information (extra information is collapsed)

Scenario: User can expand an event to see its details
Given a list of events has been loaded 
When the user clicks on the see more button
Then they will see more information regarding a specific event

Scenario: User can collapse an event to hide its details
Given the event information has been expanded
When the user clicks on the see less button
Then they will see less information regarding an event that they expanded prior