import { Client } from 'pg';
import config from '../config/index';
import logger from '../logger';

export const getClient = async () => {
  const client = new Client({
    host: config.postgreSQL.host || 'localhost',
    port: 5432,
    database: config.postgreSQL.dbName,
    user: config.postgreSQL.userName,
    password: config.postgreSQL.password,
  });

  try {
    await client.connect();
    return client;
  } catch (err) {
    logger.error('Failed to connect to DB:', err);
    throw err;
  }
};
