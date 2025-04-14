import { AppConfig } from './types';
import dotenv from 'dotenv';

dotenv.config();

const envFile = `.env.${process.env.APP_ENV || 'development'}`;
dotenv.config({ path: envFile });

const getEnv = (name: string): string => {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} environment variable is required`);
  }
  return value;
};

const config: AppConfig = {
  environment: process.env.NODE_ENV || 'development',
  openMetro: {
    baseUrl: getEnv('OPEN_METEO_BASE_URL'),
    currentWeather: process.env.OPEN_METEO_CURRENT_WEATHER || 'true',
    timezone: process.env.OPEN_METEO_TIMEZONE || 'auto',
  },
  axiosData: {
    retries: Number(process.env.AXIOS_RETRIES || '3'),
  },
  postgreSQL: {
    userName: getEnv('POSTGRES_USER'),
    password: getEnv('POSTGRES_PASSWORD'),
    dbName: getEnv('POSTGRES_DB'),
    host: process.env.POSTGRES_HOST || 'localhost',
  },
  alerts: {
    listOfImportentCities: ['Tel Aviv', 'New York', 'London'],
    notificationTemperature: 35,
    notificationWindSpeed: 50,
  },
};

export default config;
