import './WeatherCard.css';
import WeatherIcon from './WeatherIcon';
import LocationBox from './LocationBox';
import WeatherInfoList from './WeatherInfoList';
import SearchBox from './SearchBox';
import axios from 'axios';
import { useState, useEffect } from 'react';

const BASE_URL = "https://weather-report-server.onrender.com"

const WeatheCard = () => {
    const [location, setLocation] = useState("Katy")
    const [isLoading, setIsLoading] = useState(true);
    const [weatherData, setWeatherData] =
        useState({
            city: "",
            temp: "",
            icon: "",
            description: "",
            wind: "",
            humidity: ""
        });

    useEffect(
        function fetchWeatherDataOnCityChange() {
            const getCurrentCityWeather = async () => {
                const url = `${BASE_URL}/weather?q=${location}`;
                const response = await axios.get(url);
                const weatherData = response.data;
                setWeatherData({
                    city: weatherData['name'],
                    temp: Math.round((weatherData['main']['temp']) - 273.15) * 9 / 5 + 32,
                    icon: weatherData['weather'][0]['icon'],
                    description: weatherData['weather'][0]['description'],
                    wind: weatherData['wind']['speed'],
                    humidity: weatherData['main']['humidity'],
                });
                setIsLoading(false);

            }
            getCurrentCityWeather();
        },
        [location]
    );

    const search = (city) => {
        setLocation(city);
    };

    return (
        <div className="WeatherCard">
            {isLoading && <h1 id='loading'>Loading...</h1>}
            <SearchBox search={search} id='city-input' placeholder='search your city!' />
            <LocationBox city={weatherData.city} />
            <WeatherIcon icon={weatherData.icon} description={weatherData.description} className="weather-icon" />
            <WeatherInfoList temp={weatherData.temp} humidity={weatherData.humidity} wind={weatherData.wind} />
        </div >
    );

};

export default WeatheCard;


