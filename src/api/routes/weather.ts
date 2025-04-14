import express from 'express';
import { executeQuery } from '../../db/queryExecutor';
import { Request, Response, NextFunction } from 'express';
import { WeatherQueryParams } from '../../types/apiTypes';
import { buildWeatherQuery } from '../utils';
import logger from '../../logger';

const router = express.Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { city, from, to } = req.query as WeatherQueryParams;

    logger.info('Received query:', { city, from, to });

    const { query, params } = buildWeatherQuery({ city, from, to });
    const result = await executeQuery(query, params);

    res.json(result.rows);
  } catch (err) {
    logger.error('Error fetching weather data:', err);
    next(err);
  }
});

export default router;
