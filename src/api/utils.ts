import { TrendsQueryParams, WeatherQueryParams } from '../types/apiTypes';

const allowedMetrics = ['temperature', 'wind_speed', 'wind_direction'];
const allowedAggregates = ['avg', 'min', 'max'];

export const validateQueryParams = (params: Partial<TrendsQueryParams>): string | null => {
  const { metric, cities, aggregate } = params;

  if (!metric || !cities) {
    return 'Missing required parameters: metric, cities';
  }

  if (!allowedMetrics.includes(metric)) {
    return `Invalid metric: ${metric}. Allowed: ${allowedMetrics.join(', ')}`;
  }

  if (aggregate && !allowedAggregates.includes(aggregate)) {
    return `Invalid aggregate type: ${aggregate}. Allowed: ${allowedAggregates.join(', ')}`;
  }

  return null;
};

export const buildTrendsQuery = (params: Partial<TrendsQueryParams>) => {
  const { metric, cities, from, to, aggregate = 'avg' } = params;

  const cityList = cities!.split(',').map((city) => city.trim());
  const queryParts = [
    `SELECT city, ${aggregate}(${metric}) AS value`,
    `FROM weather_data`,
    `WHERE city = ANY($1)`,
  ];

  const sqlParams: any[] = [cityList];
  let paramIndex = 2;

  if (from) {
    queryParts.push(`AND timestamp >= $${paramIndex}`);
    sqlParams.push(from);
    paramIndex++;
  }

  if (to) {
    queryParts.push(`AND timestamp <= $${paramIndex}`);
    sqlParams.push(to);
    paramIndex++;
  }

  queryParts.push(`GROUP BY city`);
  const query = queryParts.join(' ');

  return { query, params: sqlParams };
};

export const buildAlertQuery = (filters: {
  city?: string;
  condition?: string;
  from?: string;
  to?: string;
}) => {
  let query = 'SELECT * FROM alerts WHERE 1=1';
  const params: any[] = [];

  if (filters.city) {
    params.push(filters.city);
    query += ` AND city = $${params.length}`;
  }

  if (filters.condition) {
    params.push(filters.condition);
    query += ` AND condition = $${params.length}`;
  }

  if (filters.from) {
    params.push(filters.from);
    query += ` AND timestamp >= $${params.length}`;
  }

  if (filters.to) {
    params.push(filters.to);
    query += ` AND timestamp <= $${params.length}`;
  }

  query += ' ORDER BY timestamp DESC';

  return { query, params };
};

export const buildWeatherQuery = ({
  city,
  from,
  to,
}: WeatherQueryParams): { query: string; params: any[] } => {
  let query = 'SELECT * FROM weather_data WHERE 1=1';
  const params: any[] = [];

  if (city) {
    params.push(city);
    query += ` AND city = $${params.length}`;
  }

  if (from) {
    params.push(from);
    query += ` AND timestamp >= $${params.length}`;
  }

  if (to) {
    params.push(to);
    query += ` AND timestamp <= $${params.length}`;
  }

  query += ' ORDER BY timestamp DESC';

  return { query, params };
};
