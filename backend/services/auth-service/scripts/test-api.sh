#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

BASE_URL="http://localhost:8002"

echo -e "${BLUE}==================================${NC}"
echo -e "${BLUE}   Auth Service API Test Suite${NC}"
echo -e "${BLUE}==================================${NC}\n"

# Test 1: Health Check
echo -e "${BLUE}Test 1: Health Check${NC}"
curl -s -X GET "$BASE_URL/health" | jq
echo -e "\n"

# Test 2: Candidate Signup
echo -e "${BLUE}Test 2: Candidate Signup${NC}"
CANDIDATE_SIGNUP=$(curl -s -X POST "$BASE_URL/api/v1/auth/signup" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test.candidate@example.com",
    "password": "TestPass123!",
    "fullName": "Test Candidate",
    "phone": "+1234567890",
    "location": "San Francisco, CA"
  }')
echo "$CANDIDATE_SIGNUP" | jq
CANDIDATE_TOKEN=$(echo "$CANDIDATE_SIGNUP" | jq -r '.data.accessToken')
CANDIDATE_REFRESH=$(echo "$CANDIDATE_SIGNUP" | jq -r '.data.refreshToken')
echo -e "\n"

# Test 3: HR User Signup
echo -e "${BLUE}Test 3: HR User Signup (Recruiter)${NC}"
HR_SIGNUP=$(curl -s -X POST "$BASE_URL/api/v1/auth/signup" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test.hr@techcorp.com",
    "password": "HRPass123!",
    "fullName": "Test HR User",
    "role": "recruiter",
    "companyId": "507f1f77bcf86cd799439012"
  }')
echo "$HR_SIGNUP" | jq
HR_TOKEN=$(echo "$HR_SIGNUP" | jq -r '.data.accessToken')
echo -e "\n"

# Test 4: Candidate Login
echo -e "${BLUE}Test 4: Candidate Login${NC}"
CANDIDATE_LOGIN=$(curl -s -X POST "$BASE_URL/api/v1/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test.candidate@example.com",
    "password": "TestPass123!",
    "userType": "candidate"
  }')
echo "$CANDIDATE_LOGIN" | jq
CANDIDATE_TOKEN=$(echo "$CANDIDATE_LOGIN" | jq -r '.data.accessToken')
echo -e "\n"

# Test 5: HR User Login
echo -e "${BLUE}Test 5: HR User Login${NC}"
HR_LOGIN=$(curl -s -X POST "$BASE_URL/api/v1/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test.hr@techcorp.com",
    "password": "HRPass123!",
    "userType": "hr"
  }')
echo "$HR_LOGIN" | jq
HR_TOKEN=$(echo "$HR_LOGIN" | jq -r '.data.accessToken')
echo -e "\n"

# Test 6: Get Profile (Candidate)
echo -e "${BLUE}Test 6: Get Candidate Profile${NC}"
curl -s -X GET "$BASE_URL/api/v1/auth/profile" \
  -H "Authorization: Bearer $CANDIDATE_TOKEN" | jq
echo -e "\n"

# Test 7: Get Profile (HR)
echo -e "${BLUE}Test 7: Get HR Profile${NC}"
curl -s -X GET "$BASE_URL/api/v1/auth/profile" \
  -H "Authorization: Bearer $HR_TOKEN" | jq
echo -e "\n"

# Test 8: Refresh Token
echo -e "${BLUE}Test 8: Refresh Access Token${NC}"
curl -s -X POST "$BASE_URL/api/v1/auth/refresh" \
  -H "Content-Type: application/json" \
  -d "{\"refreshToken\": \"$CANDIDATE_REFRESH\"}" | jq
echo -e "\n"

# Test 9: Verify Token
echo -e "${BLUE}Test 9: Verify Token${NC}"
curl -s -X POST "$BASE_URL/api/v1/auth/verify" \
  -H "Content-Type: application/json" \
  -d "{\"token\": \"$CANDIDATE_TOKEN\"}" | jq
echo -e "\n"

# Test 10: Change Password
echo -e "${BLUE}Test 10: Change Password${NC}"
curl -s -X POST "$BASE_URL/api/v1/auth/change-password" \
  -H "Authorization: Bearer $CANDIDATE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "currentPassword": "TestPass123!",
    "newPassword": "NewTestPass456!"
  }' | jq
echo -e "\n"

# Test 11: Login with new password
echo -e "${BLUE}Test 11: Login with New Password${NC}"
CANDIDATE_NEW_LOGIN=$(curl -s -X POST "$BASE_URL/api/v1/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test.candidate@example.com",
    "password": "NewTestPass456!",
    "userType": "candidate"
  }')
echo "$CANDIDATE_NEW_LOGIN" | jq
CANDIDATE_TOKEN=$(echo "$CANDIDATE_NEW_LOGIN" | jq -r '.data.accessToken')
CANDIDATE_REFRESH=$(echo "$CANDIDATE_NEW_LOGIN" | jq -r '.data.refreshToken')
echo -e "\n"

# Test 12: Logout
echo -e "${BLUE}Test 12: Logout${NC}"
curl -s -X POST "$BASE_URL/api/v1/auth/logout" \
  -H "Authorization: Bearer $CANDIDATE_TOKEN" \
  -H "Content-Type: application/json" \
  -d "{\"refreshToken\": \"$CANDIDATE_REFRESH\"}" | jq
echo -e "\n"

# Test 13: Try to use refresh token after logout (should fail)
echo -e "${BLUE}Test 13: Try Refresh After Logout (Should Fail)${NC}"
curl -s -X POST "$BASE_URL/api/v1/auth/refresh" \
  -H "Content-Type: application/json" \
  -d "{\"refreshToken\": \"$CANDIDATE_REFRESH\"}" | jq
echo -e "\n"

# Test 14: Invalid credentials
echo -e "${BLUE}Test 14: Login with Invalid Credentials${NC}"
curl -s -X POST "$BASE_URL/api/v1/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test.candidate@example.com",
    "password": "WrongPassword!",
    "userType": "candidate"
  }' | jq
echo -e "\n"

# Test 15: Access protected route without token
echo -e "${BLUE}Test 15: Access Protected Route Without Token${NC}"
curl -s -X GET "$BASE_URL/api/v1/auth/profile" | jq
echo -e "\n"

echo -e "${GREEN}==================================${NC}"
echo -e "${GREEN}   All Tests Completed!${NC}"
echo -e "${GREEN}==================================${NC}\n"
