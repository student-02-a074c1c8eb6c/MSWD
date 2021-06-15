import React from 'react'

const Country = ({ country }) => {
    if (!country) {
      return null
    }

    if (country.length === 0) {
        return (
            <div>
            not found...
            </div>
        )
    }

    const countryObj = country[0]

    return (
    <div>
        <h3>{countryObj.name} </h3>
        <div>capital {countryObj.capital} </div>
        <div>population {countryObj.population}</div>
        <img src={countryObj.flag} height='100' alt={`flag of ${countryObj.name}`}/>
    </div>
    )
  }

  export default Country
