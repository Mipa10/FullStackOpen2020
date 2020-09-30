import React from "react";

const OneCountry = (props) => {
  const { country } = props;

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
    </div>
  );
};

export default OneCountry;
