import { cities } from './data/cities';
import fetchWeatherForCity from './etl/extract';
import transformData from './etl/transform';
import { loadWeatherData } from './etl/load';
import cron from 'node-cron';
import { executeSchema } from './db/runSchema';

executeSchema()
  .then(() => {
    console.log('Schema created successfully.');
  })
  .catch((err) => {
    console.error('Schema creation failed:', err);
  });

const etl = async () => {
  console.log('Starting ETL process...');

  await Promise.all(
    cities.map(async (city) => {
      try {
        console.log(`Fetching weather data for ${city.name}...`);
        const rawWeatherData = await fetchWeatherForCity(city);
        if (!rawWeatherData) throw new Error('rawData is null');

        const transformedData = transformData(rawWeatherData);
        await loadWeatherData(transformedData);

        console.log(`Weather data for ${city.name} processed successfully.`);
      } catch (error) {
        console.error(`Error processing data for ${city.name}:`, error);
      }
    })
  );

  console.log('ETL process completed.');
};

// Schedule the ETL process to run every hour
cron.schedule('0 * * * *', () => {
  console.log('Running ETL process every hour...');
  etl()
    .then(() => console.log('ETL process finished.'))
    .catch((err) => console.error('Error during ETL process:', err));
});

// Start the process immediately
etl().catch((err) => console.error('Error during initial ETL execution:', err));
