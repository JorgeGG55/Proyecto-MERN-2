import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_KEY = '8aa9acc3df268e90c8c4e6457d3254ab';

const CitiesComponent = () => {
  const [selectedCity, setSelectedCity] = useState('');
  const [cities, setCities] = useState([
    { name: 'New York', latitude: 40.7128, longitude: -74.006, country: 'US' },
    { name: 'Saint-Jean-de-Luz', latitude: 43.3891, longitude: -1.6581, country: 'FR' },
    { name: 'Amsterdam', latitude: 52.374, longitude: 4.8897, country: 'NL' },
    { name: 'Gotha', latitude: 50.9482, longitude: 10.7019, country: 'DE' },
    { name: 'Helsinki', latitude: 60.1695, longitude: 24.9355, country: 'FI' }
  ]);
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);

  useEffect(() => {
    if (selectedCity) {
      const { latitude, longitude } = JSON.parse(selectedCity);
      fetchWeatherAndForecast(latitude, longitude);
    }
  }, [selectedCity]);

  const fetchWeatherAndForecast = async (latitude, longitude) => {
    try {
      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
      );
      const forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
      );

      setWeatherData(weatherResponse.data);
      setForecastData(forecastResponse.data);
    } catch (error) {
      console.error(error);
    }
  };

  const groupForecastByDay = () => {
    const groupedByDay = {};
    if (forecastData && forecastData.list) {
      forecastData.list.forEach((item) => {
        const date = item.dt_txt.split(' ')[0];
        if (!groupedByDay[date]) {
          groupedByDay[date] = [];
        }
        groupedByDay[date].push(item);
      });
    }
    return groupedByDay;
  };

  return (
    <div>
      <div className="selectContainer">
        <h2>Cities</h2>
        <select onChange={(e) => setSelectedCity(e.target.value)}>
          <option value="">Select a city</option>
          {cities.map((city) => (
            <option key={city.name} value={JSON.stringify(city)}>
              {city.name}, {city.country}
            </option>
          ))}
        </select>
      </div>

      {forecastData && (
        <div className="forecastContainer">
          <h2 className="forecastTitle">
            5-Day Forecast - {weatherData.name}, {weatherData.sys.country}
          </h2>
          <div className="forecastDays">
            {Object.entries(groupForecastByDay()).map(([date, items]) => (
              <div key={date} className="dayColumn">
                <h3>{date}</h3>
                <div className="citieTempContainer">
                  {items.map((item) => (
                    <div key={item.dt_txt} className="tempCard">
                      <p className="tempTime">{item.dt_txt.split(' ')[1]}</p>
                      <div className="citieTempContainer">
                        <img
                          src={`http://openweathermap.org/img/w/${item.weather[0].icon}.png`}
                          alt="Weather Icon"
                        />
                        <p className="citieTemp">{(item.main.temp - 273).toFixed(0)}°C</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CitiesComponent;
