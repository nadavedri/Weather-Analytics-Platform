import { cities } from './data/cities';
import fetchWeatherForCity from './etl/extract';

(async () => {
  for (const city of cities) {
    const weather = await fetchWeatherForCity(city);
    console.log(weather);
  }
})();