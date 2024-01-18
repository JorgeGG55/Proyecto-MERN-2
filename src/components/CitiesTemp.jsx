import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_KEY = '8aa9acc3df268e90c8c4e6457d3254ab';

const CitiesTemp = () => {
  const [citiesData, setCitiesData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCitiesWeather = async () => {
      const cities = [
        { name: 'New York', lat: 40.7128, lon: -74.006 },
        { name: 'Los Angeles', lat: 34.0522, lon: -118.2437 },
        { name: 'London', lat: 51.5074, lon: -0.1278 },
        { name: 'Chicago', lat: 41.8781, lon: -87.6298 },
        { name: 'Sydney', lat: -33.8688, lon: 151.2093 }
      ];

      try {
        const promises = cities.map(async (city) => {
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&appid=${API_KEY}`
          );
          return {
            name: city.name,
            data: response.data
          };
        });

        const citiesWeatherData = await Promise.all(promises);
        setCitiesData(citiesWeatherData);
      } catch (error) {
        console.error(error);
        setError('Error fetching cities weather data.');
      }
    };

    fetchCitiesWeather();
  }, []);

  return (
    <div>
      {error ? (
        <p>{error}</p>
      ) : (
        <>
          <h2 className="forecastTitle">Weather in 5 Cities</h2>
          <div className="citiesContainer">
            {citiesData.map((city) => (
              <div key={city.name} className="cityCard">
                <h3>{city.name}</h3>
                <img
                  src={`http://openweathermap.org/img/w/${city.data.weather[0].icon}.png`}
                  alt="Weather Icon"
                  className="icon"
                />
                <p className="temperature">{(city.data.main.temp - 273).toFixed(0)}°C</p>
                <p className="weatherDescription">Weather: {city.data.weather[0].description}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CitiesTemp;
