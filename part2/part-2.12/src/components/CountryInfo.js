import React, { useState, useEffect } from "react";
import Weather from "./Weather";

const CountryInfo = ({ countries, filter }) => {
  const [countryList, setCountryList] = useState([]);
  const [capital, setCapital] = useState(null);

  useEffect(() => {
    setCountryList(
      countries.filter((country) =>
        country.name.toLowerCase().includes(filter.toLowerCase())
      )
    );
  }, [countries, filter]);

  useEffect(() => {
    if (countryList.length === 1) {
      setCapital(countryList[0].capital);
    }
  }, [countryList]);

  const country = countryList.map((country) => (
    <div key={country.numericCode}>
      <div>
        <h1>&nbsp;{country.name}</h1>
        <p>&nbsp;capital {country.capital}</p>
        <p>&nbsp;population {country.population}</p>
        <h2>&nbsp;languages</h2>
        <ul>
          {country.languages.map((lang) => (
            <li key={lang.iso639_1}>{lang.name}</li>
          ))}
        </ul>
        &nbsp;&nbsp;<img style={{ width: "10%" }} src={country.flag} alt={country.name} />
      </div>
    </div>
  ));

  return (
    <>
      {country}
      {capital ? <Weather city={capital} /> : <p>Loading</p>}
    </>
  );
};

export default CountryInfo;