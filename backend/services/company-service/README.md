# Company Service

Microservice for managing company profiles and information in the HirePro platform.

## Features

- ✅ Create, read, update, and delete company profiles
- ✅ Company search with filters (industry, size, status)
- ✅ Company statistics and analytics
- ✅ Role-based access control (Admin, HR Manager)
- ✅ Input validation with Zod
- ✅ Rate limiting and security
- ✅ MongoDB with Mongoose ODM
- ✅ Redis caching
- ✅ Comprehensive error handling
- ✅ Swagger API documentation (coming soon)

## API Endpoints

### Public Endpoints

- `GET /api/v1/companies` - Get all companies with pagination and filters
- `GET /api/v1/companies/:id` - Get company by ID

### Protected Endpoints (Require Authentication)

- `POST /api/v1/companies` - Create new company (Admin, HR Manager)
- `PUT /api/v1/companies/:id` - Update company (Admin, HR Manager)
- `DELETE /api/v1/companies/:id` - Delete company (Admin only)
- `GET /api/v1/companies/:id/stats` - Get company statistics (Admin, HR Manager)

## Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
PORT=8001
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/hirepro-company
REDIS_HOST=localhost
REDIS_PORT=6379
JWT_SECRET=your-secret-key
CORS_ORIGIN=http://localhost:3000
```

## Installation

```bash
# Install dependencies
npm install

# Build shared package first
cd ../../shared && npm run build && cd -

# Run in development mode
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

## API Usage Examples

### Create Company

```bash
POST /api/v1/companies
Authorization: Bearer <token>

{
  "name": "TechCorp Inc",
  "industry": "Technology",
  "size": "51-200",
  "website": "https://techcorp.com",
  "description": "Leading tech company",
  "address": {
    "city": "San Francisco",
    "state": "CA",
    "country": "USA"
  }
}
```

### Get All Companies

```bash
GET /api/v1/companies?page=1&limit=10&industry=Technology&search=Tech
```

### Update Company

```bash
PUT /api/v1/companies/:id
Authorization: Bearer <token>

{
  "description": "Updated description",
  "settings": {
    "allowPublicJobs": true
  }
}
```

## Dependencies

- **express** - Web framework
- **mongoose** - MongoDB ODM
- **ioredis** - Redis client
- **zod** - Schema validation
- **helmet** - Security headers
- **cors** - CORS middleware
- **@hirepro/shared** - Shared utilities and models

## Testing

```bash
# Run all tests
npm test

# Run unit tests only
npm run test:unit

# Run integration tests only
npm run test:integration

# Watch mode
npm run test:watch
```

## Architecture

```
src/
├── config/          # Configuration files
├── controllers/     # Request handlers
├── services/        # Business logic
├── routes/          # API routes
├── validators/      # Zod validation schemas
├── middleware/      # Custom middleware
├── types/           # TypeScript types
└── index.ts         # Application entry point
```

## Security

- JWT authentication required for protected routes
- Role-based authorization (Admin, HR Manager)
- Rate limiting (100 requests per 15 minutes)
- Helmet for security headers
- Input validation with Zod
- MongoDB sanitization

## Error Handling

All errors return standardized JSON responses:

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable message"
  },
  "timestamp": "2025-11-04T00:00:00.000Z"
}
```

## License

MIT
