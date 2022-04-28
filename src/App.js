import React, {Component} from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import Event from './Event';
import NumberOfEvents from './NumberOfEvents';

class App extends Component {
  render(){
  return (
    <div className="App">
      <EventList />
      <CitySearch />
      <Event/>
      <NumberOfEvents/>
    </div>
  );
}
}

export default App;
