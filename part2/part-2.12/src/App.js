import React, { useState, useEffect } from "react";
import axios from "axios";
import List from "./components/List";
import CountryInfo from "./components/CountryInfo";


const App = () => {
  const [countries, setCountries] = useState([]);
  const [NewcountriesShow, setNewCountriesShow] = useState([]);
  const [filter, setNewFilter] = useState("");
  const [Show, setShow] = useState("");
  const [toClick, settoClick] = useState(false);

  useEffect(() => {
    axios.get("http://restcountries.eu/rest/v2/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  useEffect(() => {
    const handletoClick = (e) => {
      setNewCountriesShow(
        countries.filter((country) =>
          country.name.toLowerCase().includes(e.target.value.toLowerCase())
        )
      );
      settoClick(true);
    };

    filter
      ? setShow(
          countries
            .filter((country) =>
              country.name.toLowerCase().includes(filter.toLowerCase())
            )
            .map((country) => (
              <div key={country.numericCode}>
                {country.name}
                
              </div>
            ))
        )
      : setShow(<p></p>);
  }, [countries, filter]);

  const hmChange = (e) => {
    setNewFilter(e.target.value);
    settoClick(false);
  };

  return (
    <div>
      <div>
        <br></br>&nbsp;&nbsp;find countries: <input onChange={hmChange} value={filter} />
      </div>
      <div>
        {toClick || Show.length === 1 ? (
          <CountryInfo
            countries={Show.length > 1 ? NewcountriesShow : countries}
            filter={filter}
          />
        ) : (
          <List Show={Show} filter={filter} />
        )}
      </div>
    </div>
  );
};

export default App;