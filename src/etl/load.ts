import { getClient } from '../db/client';
import { TransformedWeatherData } from '../types/weatherTypes';
import logger from '../logger';

export const loadWeatherData = async (data: TransformedWeatherData) => {
  const query = `
    INSERT INTO weather_data (city, temperature, wind_speed, wind_direction, timestamp)
    VALUES ($1, $2, $3, $4, $5)
  `;
  const values = [
    data.cityName,
    data.temperature,
    data.windSpeed,
    data.windDirection,
    data.timestamp,
  ];

  logger.info(`Inserting weather data for ${data.cityName}...`);
  const client = await getClient();

  try {
    await client.query(query, values);
    logger.info(`Weather data for ${data.cityName} inserted successfully.`);
  } catch (error) {
    logger.error('Error inserting data into PostgreSQL:', error);
  }
};
