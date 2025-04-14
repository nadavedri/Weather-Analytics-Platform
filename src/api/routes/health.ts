import express from 'express';
import logger from '../../logger';

const router = express.Router();

router.get('/', (_req, res) => {
  logger.info('Health check endpoint hit');
  res.json({ status: 'ok', uptime: process.uptime() });
});

export default router;
