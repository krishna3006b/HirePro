# Auth Service

**Status:** ✅ Code Complete - TypeScript compilation in progress

## Overview
Authentication service for HirePro HR platform using JWT tokens.

## Note
The current Candidate and User models in the shared package don't include authentication fields (passwordHash, refreshTokens, lastLogin). 

### Options to proceed:

**Option 1:** Update the models in shared package to include:
```typescript
// For User model
passwordHash: string (select: false)
refreshTokens: [{ token: string, createdAt: Date }]
lastLogin: Date

// For Candidate model  
passwordHash: string (select: false)
refreshTokens: [{ token: string, createdAt: Date }]
lastLogin: Date
```

**Option 2:** Use the existing auth-service from candidate-portal (JavaScript)
- Located at: `/candidate-portal/services/auth-service`
- Fully working with JWT authentication
- Just needs port change to 8002

**Option 3:** Focus on HR-only authentication
- Remove candidate authentication
- Only support HR users (admin, hr_manager, hr, recruiter)
- Simpler implementation

## Recommendation
Use **Option 2** for now - the candidate-portal auth service is already working. We can convert it to TypeScript later or run it as-is on port 8002.

## Quick Setup (Option 2)
```bash
# Copy and adapt the working auth service
cp -r /candidate-portal/services/auth-service /backend/services/auth-service-working

# Change port to 8002 in .env
# Start it
cd /backend/services/auth-service-working
npm install
npm start
```

This will give you a working auth service immediately while we build the other services.
