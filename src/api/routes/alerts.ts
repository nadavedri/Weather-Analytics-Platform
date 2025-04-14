import express from 'express';
import { executeQuery } from '../../db/queryExecutor';
import logger from '../../logger';
import { QueryParams } from '../../types/apiTypes';
import { buildAlertQuery } from '../utils';

const router = express.Router();

const handleAlertQuery = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const { city, condition, from, to } = req.query as QueryParams;

  logger.info(
    `Received alert query with params: city=${city}, condition=${condition}, from=${from}, to=${to}`
  );

  try {
    const { query, params } = buildAlertQuery({ city, condition, from, to });
    const result = await executeQuery(query, params);
    res.json(result.rows);
  } catch (err) {
    logger.error('Error executing alert query:', err);
    next(new Error('Failed to fetch alerts from database.'));
  }
};

router.get('/', handleAlertQuery);

export default router;
