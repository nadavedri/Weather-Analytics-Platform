export interface AppConfig {
  environment: string;
  openMetro: OpenMetro;
  axiosData: AxiosData;
}

interface OpenMetro {
  baseUrl: string;
  currentWeather: string;
  timezone: string;
}

interface AxiosData {
  retries: number;
}
