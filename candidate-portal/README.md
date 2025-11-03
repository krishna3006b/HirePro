# HireFlow AI - Candidate Portal Microservice

## 🏗️ Architecture Overview

This is the **Candidate Portal** microservice for HireFlow AI, built using MERN stack with microservice architecture.

### Microservices Structure
```
/candidate-portal (This Service)
  /services
    /auth-service      - Authentication & Authorization
    /candidate-service - Candidate Profile Management
    /job-service       - Job Listing & Application
  /frontend            - React + TypeScript UI
  /shared              - Shared utilities, types, and middleware
```

## 🚀 Tech Stack

### Backend
- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT + bcrypt
- **Validation**: Joi
- **API Documentation**: Swagger/OpenAPI

### Frontend
- **Framework**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Query + Context API
- **Routing**: React Router v6
- **Forms**: React Hook Form + Zod validation
- **HTTP Client**: Axios

## 📁 Project Structure

```
candidate-portal/
├── services/
│   ├── auth-service/
│   │   ├── src/
│   │   │   ├── controllers/
│   │   │   ├── models/
│   │   │   ├── routes/
│   │   │   ├── middleware/
│   │   │   ├── utils/
│   │   │   └── app.js
│   │   ├── package.json
│   │   └── .env.example
│   ├── candidate-service/
│   │   ├── src/
│   │   │   ├── controllers/
│   │   │   ├── models/
│   │   │   ├── routes/
│   │   │   ├── middleware/
│   │   │   └── app.js
│   │   ├── package.json
│   │   └── .env.example
│   └── job-service/
│       ├── src/
│       │   ├── controllers/
│       │   ├── models/
│       │   ├── routes/
│       │   ├── middleware/
│       │   └── app.js
│       ├── package.json
│       └── .env.example
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── hooks/
│   │   ├── context/
│   │   ├── types/
│   │   └── utils/
│   ├── package.json
│   └── tsconfig.json
├── shared/
│   ├── types/
│   ├── constants/
│   └── utils/
├── docker-compose.yml
└── README.md
```

## 🔧 Setup Instructions

### Prerequisites
- Node.js 18+
- MongoDB 6+
- npm or yarn

### Installation

1. **Install dependencies for all services**
```bash
# Auth Service
cd services/auth-service
npm install

# Candidate Service
cd ../candidate-service
npm install

# Job Service
cd ../job-service
npm install

# Frontend
cd ../../frontend
npm install
```

2. **Configure Environment Variables**
Create `.env` files in each service directory (see `.env.example`)

3. **Start Services**
```bash
# Using Docker Compose (recommended)
docker-compose up -d

# Or manually
cd services/auth-service && npm run dev &
cd services/candidate-service && npm run dev &
cd services/job-service && npm run dev &
cd frontend && npm start
```

## 🌐 API Endpoints

### Auth Service (Port: 3001)
- `POST /api/auth/signup` - Candidate registration
- `POST /api/auth/login` - Candidate login
- `POST /api/auth/refresh` - Refresh access token
- `POST /api/auth/logout` - Logout
- `GET /api/auth/verify` - Verify token

### Candidate Service (Port: 3002)
- `GET /api/candidate/profile` - Get candidate profile
- `PUT /api/candidate/profile` - Update candidate profile
- `POST /api/candidate/resume` - Upload resume
- `GET /api/candidate/applications` - Get my applications

### Job Service (Port: 3003)
- `GET /api/jobs` - List all jobs (with filters)
- `GET /api/jobs/:id` - Get job details
- `POST /api/jobs/:id/apply` - Apply to a job
- `GET /api/jobs/search` - Search jobs

## 🔐 Authentication Flow

1. Candidate signs up → Auth Service creates account
2. Login → Returns JWT access token + refresh token
3. All subsequent requests include JWT in Authorization header
4. Services validate JWT using shared secret

## 🎨 Features

### ✅ Phase 1 (Current)
- [x] Candidate signup/login
- [x] Profile management
- [x] Job listing with pagination
- [x] Advanced filtering (location, skills, work mode, etc.)
- [x] Job search
- [x] Job application submission

### 🔄 Phase 2 (Upcoming)
- [ ] Resume upload to S3
- [ ] Application tracking
- [ ] Interview scheduling
- [ ] Notifications
- [ ] Email verification

## 🧪 Testing

```bash
# Run tests for each service
cd services/auth-service && npm test
cd services/candidate-service && npm test
cd services/job-service && npm test

# Frontend tests
cd frontend && npm test
```

## 📊 Database Schema

See `schema.md` in the root directory for complete Mongoose models.

## 🔗 Integration with HR Portal

- HR Portal runs on separate microservices
- Shared Job Service for consistency
- Event-driven architecture using message queues (future)
- Separate databases with data synchronization

## 📝 Development Guidelines

1. **Code Style**: ESLint + Prettier
2. **Commits**: Conventional commits
3. **Branching**: Git Flow
4. **API**: RESTful conventions
5. **Error Handling**: Centralized error handler
6. **Logging**: Winston for production logs

## 🚀 Deployment

- **Development**: Docker Compose
- **Production**: Kubernetes + AWS/GCP
- **CI/CD**: GitHub Actions
- **Monitoring**: PM2, DataDog

---

**Last Updated**: November 3, 2025
