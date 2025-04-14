import { cities } from './data/cities';
import fetchWeatherForCity from './etl/extract';
import transformData from './etl/transform';
import { loadWeatherData } from './etl/load';
import cron from 'node-cron';
import { executeSchema } from './db/runSchema';
import logger from './logger';
import pLimit from 'p-limit';
import { checkForWeatherAlerts } from './alerts/alertLogic';
import { storeAlertInDB } from './db/storeAlert';
const limit = pLimit(2);

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
    cities.map((city) =>
      limit(async () => {
        try {
          logger.info(`Fetching weather data for ${city.name}...`);
          const rawWeatherData = await fetchWeatherForCity(city);
          if (!rawWeatherData) throw new Error('rawData is null');

          const transformedData = transformData(rawWeatherData);
          await loadWeatherData(transformedData);

          const alert = checkForWeatherAlerts(transformedData);
          if (alert) {
            logger.info(`Alert triggered for ${city.name}: ${alert.condition} (${alert.value})`);
            await storeAlertInDB(city.name, alert);
          }
          logger.info(`Weather data for ${city.name} processed successfully.`);
        } catch (error) {
          logger.error(`Error processing data for ${city.name}:`, error);
        }
      })
    )
  );

  logger.info('ETL process completed.');
};

cron.schedule('0 * * * *', () => {
  logger.info('Running ETL process every hour...');
  etl()
    .then(() => logger.info('ETL process finished.'))
    .catch((err) => logger.error('Error during ETL process:', err));
});

etl().catch((err) => logger.error('Error during initial ETL execution:', err));
