import { RawWeatherData, TransformedWeatherData } from '../types/weatherTypes';

const transformData = (rawWeatherData: RawWeatherData): TransformedWeatherData => {
  return {
    cityName: rawWeatherData.cityName,
    temperature: rawWeatherData.temperature,
    windSpeed: rawWeatherData.windspeed,
    windDirection: rawWeatherData.winddirection,
    timestamp: rawWeatherData.time,
  };
};

export default transformData;
