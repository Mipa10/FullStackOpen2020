import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import OneCountry from "./components/OneCountry";

const Results = (props) => {
  const { filter, results, onClick } = props;

  if (filter === "") {
    return "";
  } else if (results.length > 10) {
    return "Too many matches, specify another filter";
  } else if (results.length <= 10 && results.length > 1) {
    return results.map((country) => {
      return (
        <div key={country.name}>
          {country.name}
          <button onClick={() => onClick(country)}>Show</button>
        </div>
      );
    });
  } else {
    return <OneCountry country={results[0]} />;
  }
};

function App() {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    const listOfCountries = countries.filter((country) =>
      country.name.toUpperCase().includes(filter.toUpperCase())
    );
    setResults(listOfCountries);
  };

  const handleShowClick = (country) => {
    setResults([country]);
  };

  
  return (
    <div>
      <p>
        Find countries
        <input onChange={handleFilterChange} value={filter} />
      </p>
      <Results
        onClick={handleShowClick}
        countries={countries}
        results={results}
        filter={filter}
      />
    </div>
  );
}

export default App;
