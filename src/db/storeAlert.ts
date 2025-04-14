import { getClient } from './client';
import logger from '../logger';

export const storeAlertInDB = async (city: string, alert: { condition: string; value: number }) => {
  const client = await getClient();

  try {
    const query = `
      INSERT INTO alerts (city, condition, value)
      VALUES ($1, $2, $3)
    `;
    await client.query(query, [city, alert.condition, alert.value]);
    logger.info(`Alert for ${city} stored in DB: ${alert.condition} - ${alert.value}`);
  } catch (err) {
    logger.error('Error storing alert in DB:', err);
  } finally {
    await client.end();
  }
};
