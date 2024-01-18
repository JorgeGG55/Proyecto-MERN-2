import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_KEY = '8aa9acc3df268e90c8c4e6457d3254ab';

const PersonalWeather = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
        );
        setWeatherData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    if (latitude && longitude) {
      fetchWeather();
    }
  }, [latitude, longitude]);

  useEffect(() => {
    const getLocation = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLatitude(latitude);
          setLongitude(longitude);
        },
        (error) => {
          console.error(error);
          setError(
            'Geolocation permission denied. Please enable geolocation to use the application.'
          );
        }
      );
    };

    getLocation();
  }, []);

  return (
    <div>
      {error ? (
        <p>{error}</p>
      ) : (
        <>
          {weatherData && (
            <div className="personalTempContainer">
              <h2>
                {weatherData.name}, {weatherData.sys.country}
              </h2>
              <div className="tempContainer">
                <img
                  src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}
                  alt="Weather Icon"
                />
                <p className="localTemp">{(weatherData.main.temp - 273).toFixed(0)}°C</p>
              </div>
              <div>
                <table className="weatherTable">
                  <tbody>
                    <tr>
                      <td className="tableLabel">Feels like:</td>
                      <td>{(weatherData.main.feels_like - 273).toFixed(2)}°C</td>
                    </tr>
                    <tr>
                      <td className="tableLabel">Humidity:</td>
                      <td>{weatherData.main.humidity}%</td>
                    </tr>
                    <tr>
                      <td className="tableLabel">Pressure:</td>
                      <td>{weatherData.main.pressure} hPa</td>
                    </tr>
                    <tr>
                      <td className="tableLabel">Max Temperature:</td>
                      <td>{(weatherData.main.temp_max - 273).toFixed(2)}°C</td>
                    </tr>
                    <tr>
                      <td className="tableLabel">Min Temperature:</td>
                      <td>{(weatherData.main.temp_min - 273).toFixed(2)}°C</td>
                    </tr>
                    <tr>
                      <td className="tableLabel">Wind Speed:</td>
                      <td>{weatherData.wind.speed} m/s</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PersonalWeather;
