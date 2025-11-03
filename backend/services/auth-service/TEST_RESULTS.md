# Auth Service - Test Results ✅

## Service Status
- **Port:** 8002
- **Status:** ✅ Running
- **MongoDB:** ✅ Connected
- **Redis:** ✅ Connected

## Test Results Summary

### ✅ All Endpoints Working

| Endpoint | Method | Status | Description |
|----------|--------|--------|-------------|
| `/health` | GET | ✅ PASS | Health check |
| `/api/v1/auth/signup` | POST | ✅ PASS | User registration (Candidate & HR) |
| `/api/v1/auth/login` | POST | ✅ PASS | User authentication |
| `/api/v1/auth/refresh` | POST | ✅ PASS | Refresh access token |
| `/api/v1/auth/verify` | POST | ✅ PASS | Verify JWT token |
| `/api/v1/auth/profile` | GET | ✅ PASS | Get user profile (protected) |
| `/api/v1/auth/logout` | POST | ✅ PASS | Logout user (protected) |
| `/api/v1/auth/change-password` | POST | ✅ PASS | Change password (protected) |

## Detailed Test Results

### 1. Candidate Signup ✅
**Request:**
```bash
POST /api/v1/auth/signup
Content-Type: application/json

{
  "email": "jane.smith@gmail.com",
  "password": "SecurePass789!",
  "fullName": "Jane Smith",
  "phone": "+1987654321",
  "location": "New York, NY"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "690912543cd62651f42d6b19",
      "email": "jane.smith@gmail.com",
      "fullName": "Jane Smith",
      "role": "candidate"
    },
    "accessToken": "eyJhbGci...",
    "refreshToken": "eyJhbGci..."
  },
  "message": "Registration successful"
}
```

### 2. HR User Signup ✅
**Request:**
```bash
POST /api/v1/auth/signup
Content-Type: application/json

{
  "email": "recruiter@techcorp.com",
  "password": "Recruiter123!",
  "fullName": "Sarah Recruiter",
  "role": "recruiter",
  "companyId": "507f1f77bcf86cd799439012"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "690912a5fe69d8a4c028a171",
      "email": "recruiter@techcorp.com",
      "fullName": "Sarah Recruiter",
      "role": "recruiter",
      "companyId": "507f1f77bcf86cd799439012"
    },
    "accessToken": "eyJhbGci...",
    "refreshToken": "eyJhbGci..."
  },
  "message": "Registration successful"
}
```

### 3. Candidate Login ✅
**Request:**
```bash
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "jane.smith@gmail.com",
  "password": "SecurePass789!",
  "userType": "candidate"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "690912543cd62651f42d6b19",
      "email": "jane.smith@gmail.com",
      "fullName": "Jane Smith",
      "role": "candidate"
    },
    "accessToken": "eyJhbGci...",
    "refreshToken": "eyJhbGci..."
  },
  "message": "Login successful"
}
```

### 4. HR User Login ✅
**Request:**
```bash
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "recruiter@techcorp.com",
  "password": "Recruiter123!",
  "userType": "hr"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "690912a5fe69d8a4c028a171",
      "email": "recruiter@techcorp.com",
      "fullName": "Sarah Recruiter",
      "role": "recruiter",
      "companyId": "507f1f77bcf86cd799439012"
    },
    "accessToken": "eyJhbGci...",
    "refreshToken": "eyJhbGci..."
  },
  "message": "Login successful"
}
```

### 5. Get Profile (Protected) ✅
**Request:**
```bash
GET /api/v1/auth/profile
Authorization: Bearer eyJhbGci...
```

**Response:**
```json
{
  "success": true,
  "data": {
    "userId": "690912a5fe69d8a4c028a171",
    "email": "recruiter@techcorp.com",
    "role": "recruiter",
    "companyId": "507f1f77bcf86cd799439012",
    "iat": 1762202291,
    "exp": 1762288691
  },
  "message": "Profile retrieved successfully"
}
```

### 6. Refresh Token ✅
**Request:**
```bash
POST /api/v1/auth/refresh
Content-Type: application/json

{
  "refreshToken": "eyJhbGci..."
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "accessToken": "eyJhbGci...",
    "refreshToken": "eyJhbGci..."
  },
  "message": "Token refreshed successfully"
}
```

### 7. Logout (Protected) ✅
**Request:**
```bash
POST /api/v1/auth/logout
Authorization: Bearer eyJhbGci...
Content-Type: application/json

{
  "refreshToken": "eyJhbGci..."
}
```

**Response:**
```json
{
  "success": true,
  "data": null,
  "message": "Logout successful"
}
```

### 8. Change Password (Protected) ✅
**Request:**
```bash
POST /api/v1/auth/change-password
Authorization: Bearer eyJhbGci...
Content-Type: application/json

{
  "currentPassword": "SecurePass789!",
  "newPassword": "NewSecurePass999!"
}
```

**Response:**
```json
{
  "success": true,
  "data": null,
  "message": "Password changed successfully"
}
```

## Security Features Implemented

### ✅ Password Security
- **Bcrypt Hashing:** 12 salt rounds
- **Pre-save Hook:** Automatic password hashing on model save
- **Select False:** Password hash never returned in queries by default

### ✅ JWT Tokens
- **Access Token:** 24-hour expiry
- **Refresh Token:** 7-day expiry
- **Token Storage:** Refresh tokens stored in database
- **Token Cleanup:** All refresh tokens cleared on password change

### ✅ Rate Limiting
- **Strict Limiter:** 10 requests per 15 minutes (signup)
- **Auth Limiter:** 5 requests per 15 minutes (login)
- **API Limiter:** 100 requests per 15 minutes (general endpoints)

### ✅ Input Validation
- **Zod Schemas:** Runtime validation for all requests
- **Email Validation:** RFC-compliant email format
- **Password Strength:** Minimum 8 characters required
- **Role Validation:** Enum-based role validation

### ✅ Error Handling
- **Standardized Responses:** Consistent error format
- **Stack Traces:** Development mode only
- **HTTP Status Codes:** Proper status codes for all scenarios
- **AppError Class:** Custom error handling

## User Roles

### Candidate
- Created in `Candidate` collection
- Role: `"candidate"`
- No company association required

### HR Users
- Created in `User` collection
- Roles: `"admin"`, `"recruiter"`, `"interviewer"`
- Company ID required
- Company-scoped authentication

## Known Issues & Fixes

### ✅ Fixed: Double Password Hashing
- **Issue:** Password was being hashed both in signup function and pre-save hook
- **Fix:** Removed manual hashing in signup/change-password, let pre-save hook handle it
- **Files:** `auth.service.ts`

### ✅ Fixed: Role Validation Mismatch
- **Issue:** Validator had `hr`, `hr_manager` roles but User model had `recruiter`, `interviewer`
- **Fix:** Updated validator to match User model enum values
- **Files:** `auth.validator.ts`, `auth.controller.ts`

### ✅ Fixed: Missing Location Field
- **Issue:** Location field used in signup but not in validator
- **Fix:** Added optional location field to signup schema
- **Files:** `auth.validator.ts`

## Running the Test Suite

Execute the comprehensive test script:
```bash
cd /Users/salescode/Desktop/hirepro/backend/services/auth-service
./scripts/test-api.sh
```

## Next Steps

1. ✅ Auth Service - COMPLETE
2. ⏳ HR Service (Port 8003) - NEXT
3. ⏳ Job Service (Port 8004)
4. ⏳ Candidate Service (Port 8005)
5. ⏳ Resume Service (Port 8006)
6. ⏳ Interview Service (Port 8007)
7. ⏳ Assessment Service (Port 8008)
8. ⏳ Communication Service (Port 8009)
9. ⏳ Analytics Service (Port 8010)
10. ⏳ API Gateway (Port 8000)

---

**Auth Service Status:** ✅ Production Ready
**Last Updated:** November 4, 2025
