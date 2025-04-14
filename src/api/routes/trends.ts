import express from 'express';
import { validateQueryParams, buildTrendsQuery } from '../utils';
import { executeQuery } from '../../db/queryExecutor';
import logger from '../../logger';

const router = express.Router();

router.get('/', async (req, res, next) => {
  const queryParams = req.query;

  try {
    const validationError = validateQueryParams(queryParams);
    if (validationError) {
      res.statusCode = 400;
      return next(new Error(validationError));
    }

    logger.info('Received query:', { ...queryParams });

    const { query, params } = buildTrendsQuery(queryParams);
    const result = await executeQuery(query, params);

    res.json(result.rows);
  } catch (err) {
    logger.error('Error executing trends query:', err);
    next(err);
  }
});

export default router;
