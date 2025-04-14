export type City = {
    name: string;
    latitude: number;
    longitude: number;
  };
  
  export const cities: City[] = [
    { name: 'Tel Aviv', latitude: 32.0853, longitude: 34.7818 },
    { name: 'New York', latitude: 40.7128, longitude: -74.0060 },
    { name: 'London', latitude: 51.5074, longitude: -0.1278 },
    { name: 'Tokyo', latitude: 35.6895, longitude: 139.6917 },
    { name: 'Sydney', latitude: -33.8688, longitude: 151.2093 }
  ];