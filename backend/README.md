# HireFlow AI - Complete Backend Architecture

## 🏗️ Microservices Architecture

### Services Overview

1. **API Gateway** (Port 8000) - Central entry point, rate limiting, routing
2. **Company Service** (Port 8001) - Multi-tenant company management
3. **Auth Service** (Port 8002) - Authentication, authorization, RBAC
4. **HR Service** (Port 8003) - HR user management
5. **Job Service** (Port 8004) - Job posting & management
6. **Candidate Service** (Port 8005) - Candidate profiles & applications
7. **Resume Service** (Port 8006) - AI resume parsing & scoring
8. **Interview Service** (Port 8007) - Interview scheduling & management
9. **Assessment Service** (Port 8008) - Online assessments & proctoring
10. **Communication Service** (Port 8009) - Email/SMS/Notifications
11. **Analytics Service** (Port 8010) - Reporting & analytics

### Technology Stack

**Runtime:** Node.js 20+ LTS
**Framework:** Express.js
**Language:** TypeScript
**Database:** MongoDB (with Mongoose ODM)
**Cache:** Redis
**Message Queue:** Bull (Redis-based)
**Search:** MongoDB Atlas Search / Elasticsearch
**Storage:** AWS S3 / Cloudinary
**API Documentation:** Swagger/OpenAPI
**Testing:** Jest + Supertest
**Validation:** Joi / Zod
**Security:** Helmet, express-rate-limit, bcrypt, JWT

### Security Features

- JWT authentication with refresh tokens
- Role-based access control (RBAC)
- Multi-tenant data isolation
- Rate limiting per endpoint
- API key authentication for integrations
- SQL injection prevention (ORM)
- XSS protection
- CORS configuration
- Request validation with Pydantic
- Encryption at rest and in transit
- Audit logging
- GDPR compliance features

### Code Quality Standards

- Type hints throughout
- 90%+ test coverage
- Comprehensive error handling
- Async/await for I/O operations
- Database connection pooling
- Caching strategies
- Input validation
- API versioning
- Comprehensive logging
- Performance monitoring

## 📁 Project Structure

```
hireflow-backend/
├── shared/
│   ├── database/
│   │   ├── base.py
│   │   └── session.py
│   ├── security/
│   │   ├── auth.py
│   │   ├── encryption.py
│   │   └── rbac.py
│   ├── middleware/
│   │   ├── rate_limiter.py
│   │   ├── cors.py
│   │   └── error_handler.py
│   ├── models/
│   │   └── base.py
│   ├── schemas/
│   │   └── base.py
│   └── utils/
│       ├── logger.py
│       ├── validators.py
│       └── helpers.py
│
├── services/
│   ├── api-gateway/
│   ├── company-service/
│   ├── auth-service/
│   ├── hr-service/
│   ├── job-service/
│   ├── candidate-service/
│   ├── resume-service/
│   ├── interview-service/
│   ├── assessment-service/
│   ├── communication-service/
│   └── analytics-service/
│
├── docker-compose.yml
├── docker-compose.dev.yml
├── docker-compose.prod.yml
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Python 3.11+
- PostgreSQL 15+
- Redis 7+
- RabbitMQ 3.12+
- Docker & Docker Compose

### Installation

1. Clone repository
2. Set up environment variables
3. Run `docker-compose up -d`
4. Access API documentation at `http://localhost:8000/docs`

## 📊 Database Schema

See `database-schema.md` for complete schema design.

## 🔐 Authentication Flow

See `auth-flow.md` for detailed authentication and authorization flows.

## 📖 API Documentation

Each service has auto-generated Swagger/OpenAPI documentation:
- Gateway: http://localhost:8000/docs
- Company: http://localhost:8001/docs
- Auth: http://localhost:8002/docs
- etc.

## 🧪 Testing

```bash
# Run all tests
pytest

# Run with coverage
pytest --cov=services --cov-report=html

# Run specific service tests
pytest services/auth-service/tests/
```

## 📈 Monitoring

- Prometheus metrics: http://localhost:9090
- Grafana dashboards: http://localhost:3000
- Kibana logs: http://localhost:5601

## 🔄 Development Workflow

1. Create feature branch
2. Write tests first (TDD)
3. Implement feature
4. Run tests & linting
5. Create pull request
6. Code review
7. Merge to main
8. Auto-deploy to staging

## 📝 Contributing

See `CONTRIBUTING.md` for contribution guidelines.

## 📄 License

Proprietary - All rights reserved
