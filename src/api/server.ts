import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import weatherRouter from './routes/weather';
import healthRouter from './routes/health';
import alertsRouter from './routes/alerts';
import trendsRouter from './routes/trends';
import logger from '../logger';

import { errorHandler } from './middleware/errorHandle';

const app = express();
const PORT = process.env.PORT || 8080;

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", 'data:'],
        connectSrc: ["'self'"],
        fontSrc: ["'self'", 'https:'],
        objectSrc: ["'none'"],
        upgradeInsecureRequests: [],
      },
    },
  })
);

app.use(cors());
app.use(express.json());

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
  })
);

const swaggerDocument = YAML.load('./src/docs/swagger.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/weather', weatherRouter);
app.use('/health', healthRouter);
app.use('/alerts', alertsRouter);
app.use('/trends', trendsRouter);

app.get('/', (_req, res) => {
  res.send('Weather API is running');
});

app.use(errorHandler);

app.listen(PORT, () => {
  logger.info(`Server listening on port ${PORT}`);
});
