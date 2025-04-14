 export interface AppConfig {
    environment: string;
    openMetro : OpenMetro;
  }

  export interface OpenMetro {
    baseUrl : string;
    currentWeather : string;
    timezone: string;
}
