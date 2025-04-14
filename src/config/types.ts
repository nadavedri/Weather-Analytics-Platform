export interface AppConfig {
  environment: string;
  openMetro: OpenMetro;
  axiosData: AxiosData;
  postgreSQL: PostgreSQL;
}

interface OpenMetro {
  baseUrl: string;
  currentWeather: string;
  timezone: string;
}

interface AxiosData {
  retries: number;
}

interface PostgreSQL {
  userName: string;
  password: string;
  dbName: string;
  host: string;
}
