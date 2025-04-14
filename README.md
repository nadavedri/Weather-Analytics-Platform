# Weather Analytics Platform

A Node.js application for collecting, processing, and analyzing weather data with PostgreSQL storage and RESTful APIs.

## Features

- ETL process for weather data ingestion.
- Weather alerts based on configurable thresholds.
- RESTful APIs with Swagger documentation.
- Docker and Kubernetes deployment support.
- Centralized logging and error handling.

## Prerequisites

- Node.js (v20+), PostgreSQL, Docker (optional).

## Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/nadavedri/Weather-Analytics-Platform.git
   cd Weather-Analytics-Platform
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure environment variables:

   - Copy `.env.example` to `.env` and update values.

4. Build the project:
   ```bash
   npm run build
   ```

## Running the Application

### Locally

1. Start PostgreSQL and ensure `.env` matches.
2. Run in development mode:
   ```bash
   npm run dev
   ```

### Docker Compose

1. Build and start containers:
   ```bash
   docker-compose up --build
   ```
2. Access the app at `http://localhost:8080`.

## API Documentation

Swagger UI is available at:

- `http://localhost:8080/api-docs`

### Key Endpoints

- `/health`: Health check.
- `/weather`: Weather data.
- `/alerts`: Weather alerts.
- `/trends`: Weather trends.

## Deployment

### Kubernetes

1. Build and push Docker image:

   ```bash
   docker build -t <your-dockerhub-username>/weather-analytics-platform:latest .
   docker push <your-dockerhub-username>/weather-analytics-platform:latest
   ```

2. Apply manifests:

   ```bash
   kubectl apply -f k8s/
   ```

3. Access the app:
   - Cloud: Use external IP from `kubectl get svc`.
   - Minikube: Run `minikube service weather-analytics-platform`.

## System Design

Below is a high-level system design:

```plaintext
+-------------------+       +-------------------+       +-------------------+
|                   |       |                   |       |                   |
|   Open-Meteo API  +------>+   ETL Process     +------>+   PostgreSQL DB   |
|                   |       |                   |       |                   |
+-------------------+       +-------------------+       +-------------------+
                                    |
                                    v
                          +-------------------+
                          |                   |
                          |   RESTful API     |
                          |                   |
                          +-------------------+
                                    |
                                    v
                          +-------------------+
                          |                   |
                          |   Swagger UI      |
                          |                   |
                          +-------------------+
```

## Development

- Linting: `npm run lint`
- Formatting: `npm run format`
- Debugging: `npm run debug`

## Logging

Logs are stored in `logs/`:

- `error.log`: Errors.
- `combined.log`: All events.

## Acknowledgments

- [Open-Meteo API](https://open-meteo.com/) for weather data.
- [Winston](https://github.com/winstonjs/winston) for logging.
- [Swagger](https://swagger.io/) for API documentation.
