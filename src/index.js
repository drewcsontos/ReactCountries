import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
const Country = ({ country }) => {
  return (
    <>
      <h1>{country.name}</h1>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h1>languages</h1>
      <ul>
        {country.languages.map((language) => (
          <li>{language.name}</li>
        ))}
      </ul>
      <img src={country.flag} alt="flag" width={95} height={50} />
    </>
  );
};
const CountryButton = ({ country }) => {
  const [showCountry, setShowCountry] = useState(false);
  if (showCountry) {
    return (
      <>
        <button onClick={() => setShowCountry(!showCountry)}>hide</button>
        <Country country={country} />
      </>
    );
  } else {
    return <button onClick={() => setShowCountry(!showCountry)}>show</button>;
  }
};
const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    console.log("effect");
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      console.log("promise fulfilled");
      setCountries(response.data);
    });
  }, []);

  const handleFilterChange = (event) => {
    console.log(event.target.value);
    setFilter(event.target.value);
  };

  const filterCountries = () => {
    let countriesList = countries.filter((country) =>
      country.name.toLowerCase().includes(filter.toLowerCase())
    );
    if (countriesList.length <= 10) {
      if (countriesList.length === 1) {
        return countriesList.map((country) => <Country country={country} />);
      } else {
        return countriesList.map((country) => (
          <>
            <li>{country.name}</li> <CountryButton country={country} />
          </>
        ));
      }
    } else {
      return <li>Too many matches, specify another filter</li>;
    }
  };

  return (
    <div>
      <div>
        find countries <input value={filter} onChange={handleFilterChange} />
      </div>
      <ul>{filterCountries()}</ul>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
