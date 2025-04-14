import axios from 'axios';
import axiosRetry from 'axios-retry';
import { City, WeatherData } from '../types/weatherTypes';
import config  from '../config/index';

axiosRetry(axios, {
    retries: 3,
    retryDelay: axiosRetry.exponentialDelay,
    retryCondition: (error) =>
      axiosRetry.isNetworkError(error) || (error.response?.status ?? 0)  >= 500,
  });

const fetchWeatherForCity = async (city: City): Promise<WeatherData | null> => {
    const { latitude, longitude, name } = city;

    const url = `${config.openMetro.baseUrl}?latitude=${latitude}&longitude=${longitude}&current_weather=${config.openMetro.currentWeather}&timezone=${config.openMetro.timezone}`;
  
    try {
      const response = await axios.get(url);
      const current = response.data.current_weather;
  
      const weather: WeatherData = {
        cityName: name,
        temperature: current.temperature,
        windSpeed: current.windspeed,
        windDirection: current.winddirection,
        timestamp: current.time,
      };
  
      console.log(`Weather fetched for ${name}`);
      return weather;
    } catch (err: any) {
      console.error(`Failed to fetch weather for ${name}:`, err.message);
      return null;
    }

};

export default fetchWeatherForCity;