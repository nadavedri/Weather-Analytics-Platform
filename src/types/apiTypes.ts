export const ALLOWED_METRICS = ['temperature', 'wind_speed', 'wind_direction'] as const;
export const ALLOWED_AGGREGATES = ['avg', 'min', 'max'] as const;

export type Metric = (typeof ALLOWED_METRICS)[number];
export type Aggregate = (typeof ALLOWED_AGGREGATES)[number];

export interface TrendsQueryParams {
  metric: string;
  cities: string;
  from?: string;
  to?: string;
  aggregate?: string;
}
export interface QueryParams {
  city?: string;
  condition?: string;
  from?: string;
  to?: string;
}
export interface WeatherQueryParams {
  city?: string;
  from?: string;
  to?: string;
}
