import { getClient } from './client';
import logger from '../logger';

//todo: add types
export const executeQuery = async (query: string, params: any[] = []) => {
  const client = await getClient();

  try {
    return await client.query(query, params);
  } catch (err) {
    logger.error('Query execution failed:', err);
    throw err;
  } finally {
    await client.end();
  }
};