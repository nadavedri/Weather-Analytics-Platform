import { AppConfig } from './types';
import dotenv from 'dotenv';

dotenv.config();

const envFile = `.env.${process.env.APP_ENV || 'development'}`;
dotenv.config({ path: envFile });

const config :AppConfig  = {
    environment: process.env.NODE_ENV || 'development',
    openMetro:{
        baseUrl: process.env.OPEN_METEO_BASE_URL as string,
        currentWeather : process.env.OPEN_METEO_CURRENT_WEATHER as string || 'true',
        timezone :process.env.OPEN_METEO_TIMEZONE as string || 'auto',

    }
    
  };

export default config;




