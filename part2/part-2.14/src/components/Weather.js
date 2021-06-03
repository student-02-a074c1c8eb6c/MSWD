import React,{useEffect,useState} from "react";
import axios from 'axios'
const Weather = ({country}) => {
  const [weather, setWeather] = useState([])
  const api_key = 'ec23ce2a92fcbf3d7214086083e384d7'
  useEffect(() => {
    axios.get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`)
      .then(response => {
        setWeather(response.data)
        console.log(response.data)
      })
  }, [country.capital, api_key])
  if (weather.location === undefined) {
    return null; 
  }

  return (
       <>
    <div>
      <h3>Weather in {weather.location.name}</h3>
      <p>
        <strong>Temperature: </strong>
        {weather.current.temperature}
      </p>
      <img src={weather.current.weather_icons[0]} alt="icon"/>
  <p><strong>wind: </strong>{weather.current.wind_speed}mph direction {weather.current.wind_dir}</p>
    </div>
    </>
  )
}
export default Weather;