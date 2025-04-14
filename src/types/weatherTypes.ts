type City = {
  name: string;
  latitude: number;
  longitude: number;
};

 type WeatherData = {
    cityName: string;
    temperature: number;
    windSpeed: number;
    windDirection: number;
    timestamp: string;
  };

  export type { City, WeatherData };
