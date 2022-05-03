import React, { Component } from "react";
import { InfoAlert } from "./Alert";

class CitySearch extends Component {
  state = {
    query: "",
    suggestions: [],
    showSuggestions: undefined,
  };

  handleInputChanged = (event) => {
    const value = event.target.value;
    this.setState({ showSuggestions: true });
    const suggestions = this.props.locations.filter((location) => {
      return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
    });
    if (suggestions.length === 0) {
      this.setState({
        query: value,
        infoText:
          "We can not find the city you are looking for. Please try another city",
      });
    } else {
      return this.setState({
        query: value,
        suggestions,
        infoText: null,
      });
    }
  };

  handleItemClicked = (suggestion) => {
    this.setState({
      query: suggestion,
      suggestions: [],
      showSuggestions: false,
    });
    this.props.updateEvents(suggestion, undefined);
  };

  render() {
    const { locations, updateEvents } = this.props;
    return (
      <div className="CitySearch">
        {this.state.infoText && <InfoAlert text={this.state.infoText} />}
        <input
          type="text"
          className="city"
          onChange={this.handleInputChanged}
          value={this.state.query}
          placeholder="type in your city!"
          onFocus={() => {
            this.setState({ showSuggestions: true });
          }}
        />
        <ul
          className="suggestions"
          style={this.state.showSuggestions ? {} : { display: "none" }}
        >
          {this.state.suggestions.map((suggestion) => (
            <li
              className="list-item"
              key={suggestion}
              onClick={() => this.handleItemClicked(suggestion)}
            >
              {suggestion}
            </li>
          ))}
          <li onClick={() => this.handleItemClicked("all")}>
            <b>See all cities</b>
          </li>
        </ul>
      </div>
    );
  }
}

export default CitySearch;
