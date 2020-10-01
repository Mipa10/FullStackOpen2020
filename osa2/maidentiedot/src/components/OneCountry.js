import React, { useEffect, useState } from "react";
import axios from "axios";
const OneCountry = (props) => {
  const { country } = props;
  const [weather, setWeather] = useState();

  // const getWeather = () => {
  //   return weather.data.location.name
  // }
  
  

  // useEffect(async () => {
  //     // You can await here
  //     const response = await axios.get(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${country.capital}`
  //     );
  //     // ...
  //     setWeather(response);
     
  //   }
  //   ,[weather]); // Or [] if effect doesn't need props or state
  
  return (
    <div>
      <h1>{country.name}</h1>
      <h3>capital: {country.capital}</h3>
      <h3>population: {country.population}</h3>
      <h2>Languages</h2>
      <ul>
        {country.languages.map((language) => {
          return <li key={language.name}>{language.name}</li>;
        })}
      </ul>
      <img src={country.flag} alt="Country flag" style={{ width: 300 }} />
      <h2>Weather in {}</h2>
    </div>
  );
};

export default OneCountry;
