<<<<<<< HEAD
import React, { useState } from "react";
import "../Searchbar.css";

function SearchBar({ onSearch }) {
  const [keywords, setKeywords] = useState("");
  const [location, setLocation] = useState("");
  const [jobTitle, setJobTitle] = useState("");
=======
import React, { Component } from 'react';
import "../Searchbar.css";

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keywords: '',
      location: '',
      jobTitle: ''
    };
>>>>>>> main

    this.handleKeywordsChange = this.handleKeywordsChange.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleJobTitleChange = this.handleJobTitleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleKeywordsChange(e) {
    this.setState({ keywords: e.target.value });
  }

  handleLocationChange(e) {
    this.setState({ location: e.target.value });
  }

  handleJobTitleChange(e) {
    this.setState({ jobTitle: e.target.value });
  }

  handleSearch(e) {
    e.preventDefault();
    const { keywords, location, jobTitle } = this.state;
    this.props.onSearch({ keywords, location, jobTitle });
  }

<<<<<<< HEAD
  return (
    <form className="search-bar" onSubmit={handleSearch} id="search-container">
      <div id="main">
        <input
          type="text"
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
          placeholder="Keywords"
          className="input"
        />
        <div id="input-mask"></div>
        <div id="cosmic-glow"></div>
      </div>

      <div id="main">
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Location"
          className="input"
        />
        <div id="input-mask"></div>
        <div id="cosmic-glow"></div>
      </div>

      <div id="main">
        <input
          type="text"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
          placeholder="Job Title"
          className="input"
        />
        <div id="input-mask"></div>
        <div id="cosmic-glow"></div>
      </div>

      <button type="submit">Search</button>
    </form>
  );
=======
  render() {
    return (
      <form className="search-bar" onSubmit={this.handleSearch}>
        <input
          type="text"
          value={this.state.keywords}
          onChange={this.handleKeywordsChange}
          placeholder="Keywords"
        />
        <input
          type="text"
          value={this.state.location}
          onChange={this.handleLocationChange}
          placeholder="Location"
        />
        <input
          type="text"
          value={this.state.jobTitle}
          onChange={this.handleJobTitleChange}
          placeholder="Job Title"
        />
        <button type="submit">Search</button>
      </form>
    );
  }
>>>>>>> main
}

export default SearchBar;
