# HireFlow AI - Candidate Portal API Documentation

## Overview

This document provides comprehensive API documentation for the HireFlow AI Candidate Portal microservices.

---

## Authentication Service

**Base URL**: `http://localhost:3001/api/auth`

### POST /signup

Register a new candidate account.

**Request Body**:
```json
{
  "email": "john@example.com",
  "password": "SecurePass123",
  "fullName": "John Doe",
  "phone": "9876543210"
}
```

**Response** (201 Created):
```json
{
  "success": true,
  "message": "Registration successful",
  "data": {
    "candidate": {
      "id": "673abc123def456...",
      "email": "john@example.com",
      "fullName": "John Doe",
      "isProfileComplete": false
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### POST /login

Login with email and password.

**Request Body**:
```json
{
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

**Response** (200 OK):
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "candidate": {
      "id": "673abc123def456...",
      "email": "john@example.com",
      "fullName": "John Doe",
      "isProfileComplete": true,
      "profileCompletionPercentage": 80
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

---

## Job Service

**Base URL**: `http://localhost:3003/api`

### GET /jobs

Get list of jobs with optional filters and pagination.

**Query Parameters**:
- `page` (number): Page number (default: 1)
- `limit` (number): Items per page (default: 10, max: 50)
- `search` (string): Search in title and description
- `workMode` (string): Filter by work mode (remote, onsite, hybrid)
- `employmentType` (string): Filter by type (full-time, part-time, contract, intern)
- `location` (string): Filter by city
- `skills` (string): Comma-separated skills
- `minSalary` (number): Minimum salary
- `maxSalary` (number): Maximum salary

**Example Request**:
```
GET /api/jobs?page=1&limit=10&workMode=remote&skills=react,nodejs
```

**Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "jobs": [
      {
        "_id": "673abc...",
        "title": "Senior Full Stack Developer",
        "companyName": "Tech Corp",
        "companyLogo": "https://...",
        "description": "We are looking for...",
        "requirements": "5+ years experience...",
        "skillsRequired": ["react", "nodejs", "typescript"],
        "salaryRange": {
          "min": 100000,
          "max": 150000,
          "currency": "INR"
        },
        "location": {
          "city": "Bangalore",
          "state": "Karnataka",
          "country": "India"
        },
        "workMode": "hybrid",
        "employmentType": "full-time",
        "experienceRequired": {
          "min": 3,
          "max": 7
        },
        "deadline": "2025-12-31T00:00:00.000Z",
        "status": "open",
        "stats": {
          "views": 150,
          "applications": 25
        },
        "createdAt": "2025-11-01T10:00:00.000Z"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 5,
      "totalJobs": 47,
      "jobsPerPage": 10,
      "hasNextPage": true,
      "hasPrevPage": false
    }
  }
}
```

### GET /jobs/:id

Get detailed information about a specific job.

**Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "job": {
      "_id": "673abc...",
      "title": "Senior Full Stack Developer",
      ...all job fields...
    }
  }
}
```

### POST /jobs/:id/apply

Apply for a job (requires authentication).

**Headers**:
```
Authorization: Bearer <accessToken>
```

**Request Body**:
```json
{
  "candidateInfo": {
    "fullName": "John Doe",
    "email": "john@example.com",
    "phone": "9876543210",
    "resumeUrl": "https://...",
    "skills": ["react", "nodejs"],
    "experienceYears": 5,
    "location": {
      "city": "Bangalore",
      "country": "India"
    }
  },
  "coverLetter": "I am excited to apply for...",
  "source": "direct"
}
```

**Response** (201 Created):
```json
{
  "success": true,
  "message": "Application submitted successfully",
  "data": {
    "application": {
      "_id": "673def...",
      "jobId": "673abc...",
      "candidateId": "673xyz...",
      "status": "applied",
      "appliedAt": "2025-11-03T12:00:00.000Z"
    }
  }
}
```

### GET /applications/my-applications

Get all applications submitted by the logged-in candidate.

**Headers**:
```
Authorization: Bearer <accessToken>
```

**Query Parameters**:
- `status` (string): Filter by application status
- `page` (number): Page number
- `limit` (number): Items per page

**Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "applications": [
      {
        "_id": "673def...",
        "jobId": {
          "_id": "673abc...",
          "title": "Senior Full Stack Developer",
          "companyName": "Tech Corp",
          "location": { "city": "Bangalore" },
          "workMode": "hybrid",
          "employmentType": "full-time"
        },
        "candidateId": "673xyz...",
        "status": "interview_scheduled",
        "currentStage": "ai_interview",
        "resumeScore": 85,
        "aiInterviewScore": 78,
        "overallScore": 82,
        "appliedAt": "2025-11-01T10:00:00.000Z"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 2,
      "totalApplications": 12,
      "applicationsPerPage": 10
    }
  }
}
```

---

## Error Responses

All endpoints may return the following error responses:

### 400 Bad Request
```json
{
  "success": false,
  "message": "Validation error message"
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "message": "Not authorized to access this route"
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Resource not found"
}
```

### 409 Conflict
```json
{
  "success": false,
  "message": "Resource already exists"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "message": "Server error"
}
```

---

## Authentication Flow

1. **Signup/Login** → Receive `accessToken` and `refreshToken`
2. **Store tokens** in localStorage/cookies
3. **Include `accessToken`** in Authorization header for protected routes:
   ```
   Authorization: Bearer <accessToken>
   ```
4. When `accessToken` expires (15 min):
   - Call `/api/auth/refresh` with `refreshToken`
   - Receive new `accessToken`
   - Retry original request

---

## Rate Limiting

- **Window**: 15 minutes
- **Max Requests**: 100 requests per window
- **Applies to**: All `/api/*` endpoints

---

## Best Practices

1. Always handle errors gracefully
2. Use HTTPS in production
3. Don't expose sensitive data in URLs
4. Implement proper token refresh logic
5. Validate user input on frontend before API calls

---

**Version**: 1.0.0  
**Last Updated**: November 3, 2025
