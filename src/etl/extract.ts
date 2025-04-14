import axios from 'axios';
import axiosRetry from 'axios-retry';
import { City, RawWeatherData } from '../types/weatherTypes';
import config from '../config/index';

axiosRetry(axios, {
  retries: 3,
  retryDelay: axiosRetry.exponentialDelay,
  retryCondition: (error) =>
    axiosRetry.isNetworkError(error) || (error.response?.status ?? 0) >= 500,
});

const fetchWeatherForCity = async (city: City): Promise<RawWeatherData | null> => {
  const { latitude, longitude, name } = city;

  const url = `${config.openMetro.baseUrl}?latitude=${latitude}&longitude=${longitude}&current_weather=${config.openMetro.currentWeather}&timezone=${config.openMetro.timezone}`;

  try {
    const response = await axios.get(url);
    const currentRawData = response.data.current_weather;
    console.log(`Weather fetched for ${name}`);
    const rawWeatherData: RawWeatherData = {
      cityName: name,
      ...currentRawData,
      time: new Date(currentRawData.time),
    };

    return rawWeatherData;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error(
        `Failed to fetch weather for ${city.name}:`,
        error.response?.status
          ? `Status: ${error.response.status}, Message: ${error.message}`
          : error.message
      );
    } else {
      console.error(
        `Unexpected error fetching weather for ${city.name}:`,
        error instanceof Error ? error.message : String(error)
      );
    }
    return null;
  }
};

export default fetchWeatherForCity;
