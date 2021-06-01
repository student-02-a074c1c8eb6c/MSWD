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

  const count = countryList.map((count) => (
    <div key={count.numericCode}>
      <div>
        <h1>&nbsp;{count.name}</h1>
        <p>&nbsp;capital {count.capital}</p>
        <p>&nbsp;population {count.population}</p>
        <h2>&nbsp;languages</h2>
        <ul>
          {count.languages.map((lang) => (
            <li key={lang.iso639_1}>{lang.name}</li>
          ))}
        </ul>
        &nbsp;&nbsp;<img style={{ width: "10%" }} src={count.flag} alt={count.name} />
      </div>
    </div>
  ));

  return (
    <>
      {count}
      {capital ? <Weather city={capital} /> : <p>Loading</p>}
    </>
  );
};

export default CountryInfo;