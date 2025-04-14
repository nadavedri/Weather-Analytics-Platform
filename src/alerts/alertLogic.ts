import { TransformedWeatherData } from '../types/weatherTypes';
import config from '../config';

const checkForWeatherAlerts = (weatherData: TransformedWeatherData) => {
  if (config.alerts.listOfImportentCities.includes(weatherData.cityName)) {
    if (config.alerts.notificationTemperature > 35) {
      return { alert: true, condition: 'high_temperature', value: weatherData.temperature };
    }
    if (config.alerts.notificationWindSpeed > 50) {
      return { alert: true, condition: 'high_wind_speed', value: weatherData.windSpeed };
    }
    return null;
  }
};

export { checkForWeatherAlerts };
