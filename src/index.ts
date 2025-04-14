import { cities } from './data/cities';
import fetchWeatherForCity from './etl/extract';
import transformData from './etl/transform';
import { loadWeatherData } from './etl/load';
import cron from 'node-cron';
import { executeSchema } from './db/runSchema';
import logger from './logger';

executeSchema()
  .then(() => {
    logger.info('Schema created successfully.');
  })
  .catch((err) => {
    logger.error('Schema creation failed:', err);
  });

const etl = async () => {
    logger.info('Starting ETL process...');

  await Promise.all(
    cities.map(async (city) => {
      try {
        logger.info(`Fetching weather data for ${city.name}...`);
        const rawWeatherData = await fetchWeatherForCity(city);
        if (!rawWeatherData) throw new Error('rawData is null');

        const transformedData = transformData(rawWeatherData);
        await loadWeatherData(transformedData);

        logger.info(`Weather data for ${city.name} processed successfully.`);
      } catch (error) {
        logger.error(`Error processing data for ${city.name}:`, error);
      }
    })
  );

  logger.info('ETL process completed.');
};

// Schedule the ETL process to run every hour
cron.schedule('0 * * * *', () => {
    logger.info('Running ETL process every hour...');
  etl()
    .then(() => logger.info('ETL process finished.'))
    .catch((err) => logger.error('Error during ETL process:', err));
});

// Start the process immediately
etl().catch((err) => logger.error('Error during initial ETL execution:', err));
