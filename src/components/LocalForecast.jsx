import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_KEY = '8aa9acc3df268e90c8c4e6457d3254ab';

const LocalForecast = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [dailyForecast, setDailyForecast] = useState([]);
  const [locationInfo, setLocationInfo] = useState({});
  const [error, setError] = useState(null);

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

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
        );

        const filteredForecast = response.data.list.reduce((acc, item) => {
          const date = item.dt_txt.split(' ')[0];
          if (!acc[date]) {
            acc[date] = item;
          }
          return acc;
        }, {});

        setDailyForecast(Object.values(filteredForecast));
        setLocationInfo({
          name: response.data.city.name,
          country: response.data.city.country
        });
      } catch (error) {
        console.error(error);
        setError('Error fetching forecast data.');
      }
    };

    if (latitude && longitude) {
      fetchForecast();
    }
  }, [latitude, longitude]);

  return (
    <div>
      {error ? (
        <p>{error}</p>
      ) : (
        <>
          {dailyForecast.length > 0 && (
            <div>
              <h2 className="forecastTitle">
                5-Day Local Forecast - {locationInfo.name}, {locationInfo.country}
              </h2>
              <div className="cardContainer">
                {dailyForecast.map((item) => (
                  <div key={item.dt} className="card">
                    <p className="date">{new Date(item.dt * 1000).toLocaleDateString()}</p>
                    <img
                      src={`http://openweathermap.org/img/w/${item.weather[0].icon}.png`}
                      alt="Weather Icon"
                      className="icon"
                    />
                    <p className="temperature">{(item.main.temp - 273).toFixed(0)}°C</p>
                    <p className="weatherDescription">{item.weather[0].description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default LocalForecast;
