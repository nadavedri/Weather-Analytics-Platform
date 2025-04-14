import { getClient } from './client';
import logger from '../logger';

export const executeSchema = async () => {
  const client = await getClient(); // Get a connected client

  try {
    const schema = `
      CREATE TABLE IF NOT EXISTS weather_data (
        id SERIAL PRIMARY KEY,
        city VARCHAR(100),
        temperature REAL,
        wind_speed REAL,
        wind_direction REAL,
        timestamp TIMESTAMPTZ
      );
      
       CREATE TABLE IF NOT EXISTS alerts (
        id SERIAL PRIMARY KEY,
        city VARCHAR(100),
        condition VARCHAR(100),
        value REAL,
        timestamp TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
      );
    `;

    logger.info('Executing schema...');
    await client.query(schema);
    logger.info('Schema executed successfully.');
  } catch (error) {
    logger.error('Error executing schema:', error);
    throw error;
  } finally {
    await client.end();
    logger.info('Client connection closed.');
  }
};
