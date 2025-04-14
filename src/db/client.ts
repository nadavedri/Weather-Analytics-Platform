import { Client } from 'pg';
import config from '../config/index';

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
    console.error('Failed to connect to DB:', err);
    throw err;
  }
};
