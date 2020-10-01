import React, { useEffect, useState } from "react";
import axios from "axios";
const OneCountry = (props) => {
  const { country } = props;
  const [weather, setWeather] = useState([]);

  useEffect(() => {
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${country.capital}`
      )
      .then((response) => {
        setWeather([response.data]);
      });
  }, [country.capital]);

  if (weather.length === 0) {
    return <p>Loading..</p>;
  }

  return (
    <div>
      }<h1>{country.name}</h1>
      <h3>capital: {country.capital}</h3>
      <h3>population: {country.population}</h3>
      <h2>Languages</h2>
      <ul>
        {country.languages.map((language) => {
          return <li key={language.name}>{language.name}</li>;
        })}
      </ul>
      <img src={country.flag} alt="Country flag" style={{ width: 300 }} />
      <h2>Weather in {weather[0].location.name}</h2>
      <h4>Temperature: {weather[0].current.temperature}celsius</h4>
      <img src={weather[0].current.weather_icons[0]} alt="weather icon" />
      <h4>
        Wind: {weather[0].current.wind_speed}km/h direction:{" "}
        {weather[0].current.wind_dir}
      </h4>
    </div>
  );
};

export default OneCountry;
