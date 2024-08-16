import React, { useState } from "react";
import "../Searchbar.css";

function SearchBar({ onSearch }) {
  const [keywords, setKeywords] = useState("");
  const [location, setLocation] = useState("");
  const [jobTitle, setJobTitle] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch({ keywords, location, jobTitle });
  };

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
}

export default SearchBar;
