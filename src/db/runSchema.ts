import { getClient } from './client';

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
    `;

    console.log('Executing schema...');
    await client.query(schema);
    console.log('Schema executed successfully.');
  } catch (error) {
    console.error('Error executing schema:', error);
    throw error;
  } finally {
    await client.end();
    console.log('Client connection closed.');
  }
};
