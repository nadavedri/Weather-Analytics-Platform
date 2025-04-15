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
   git clone https://github.com/nadavedri/Weather-Analytics-Platform.git
   cd Weather-Analytics-Platform

2. Install dependencies:
   npm install

3. Configure environment variables:

   - Copy `.env.example` to `.env` and update values.

4. Build the project:
   npm run build

## Running the Application

### Locally

1. Start PostgreSQL and ensure `.env` matches.
2. Run in development mode:
   npm run dev

### Docker Compose

1. Build and start containers:
   docker-compose up --build
   
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
   docker build -t <your-dockerhub-username>/weather-analytics-platform:latest .
   docker push <your-dockerhub-username>/weather-analytics-platform:latest
   

2. Apply manifests:
   kubectl apply -f k8s/

3. Access the app:
   - Cloud: Use external IP from `kubectl get svc`.
   - Minikube: Run `minikube service weather-analytics-platform`.

## Development

- Linting: `npm run lint`
- Formatting: `npm run format`
- Debugging: `npm run debug`

## Logging

Logs are stored in `logs/` in production and write to console in development.

## Future Improvements

If I had more time I would focus on the following improvements:

1. **Unit and Integration Tests**:
   - Add tests using Jest or Mocha.
   - Mock external API calls with libraries like `nock` to ensure reliable test results.

2. **Input Validation**:
   - Use a library like `zod` to validate API inputs and query parameters for better error handling and security.

3. **Advanced Caching**:
   - Implement Redis caching for frequently accessed data to improve performance.

4. **Dynamic Rate Limiting**:
   - Introduce dynamic rate limits based on user roles or API keys to enhance scalability.

5. **Database Optimization**:
   - Add more advanced indexing strategies and partitioning for large datasets.

6. **Enhanced Security**:
   - Use tools like `OWASP ZAP` to scan for vulnerabilities and tools like `Snyk` to scan for vulnerabilities in dependencies
   
7. **API Versioning**:
   - Introduce versioning for APIs to ensure backward compatibility.

8. **Monitoring and Alerts**:
   - Integrate monitoring tools like Prometheus and Grafana for real-time metrics and alerting.

These improvements would make the platform more robust, scalable, and maintainable.

