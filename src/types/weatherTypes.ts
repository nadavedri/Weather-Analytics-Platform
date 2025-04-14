type City = {
  name: string;
  latitude: number;
  longitude: number;
};

type TransformedWeatherData = {
  cityName: string;
  temperature: number;
  windSpeed: number;
  windDirection: number;
  timestamp: Date;
};

type RawWeatherData = {
  cityName: string;
  interval: number;
  is_day: number;
  temperature: number;
  time: Date;
  weathercode: number;
  winddirection: number;
  windspeed: number;
};

export type { City, TransformedWeatherData, RawWeatherData };
