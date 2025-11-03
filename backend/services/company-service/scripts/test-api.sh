#!/bin/bash

# Company Service API Testing Script
# This script tests all available endpoints

BASE_URL="http://localhost:8001"
API_PREFIX="/api/v1"

# Pre-generated JWT token for testing (valid for 24h from generation)
# Payload: {userId: '507f1f77bcf86cd799439011', email: 'admin@hirepro.com', role: 'admin'}
# Secret: 'your-super-secret-jwt-key-change-in-production'
TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1MDdmMWY3N2JjZjg2Y2Q3OTk0MzkwMTEiLCJlbWFpbCI6ImFkbWluQGhpcmVwcm8uY29tIiwicm9sZSI6ImFkbWluIiwiY29tcGFueUlkIjoiNTA3ZjFmNzdiY2Y4NmNkNzk5NDM5MDEyIiwiaWF0IjoxNzMwNjY1OTM0LCJleHAiOjE3MzA3NTIzMzR9.HnvOTbxQDKCVqRLbOCH_RrEPjN8qRYp3jPflGKPPNMA"

echo "======================================"
echo "Company Service API Testing"
echo "======================================"
echo ""

# Test 1: Health Check
echo "1. Testing Health Check..."
curl -s -X GET "$BASE_URL/health" | jq
echo -e "\n"

# Test 2: Get All Companies (Empty list expected)
echo "2. Testing GET /companies (no auth required)..."
curl -s -X GET "$BASE_URL$API_PREFIX/companies?page=1&limit=10" | jq
echo -e "\n"

# Test 3: Create Company (with auth)
echo "3. Testing POST /companies (with auth)..."
COMPANY_ID=$(curl -s -X POST "$BASE_URL$API_PREFIX/companies" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "TechCorp Inc",
    "industry": "Technology",
    "size": "51-200",
    "website": "https://techcorp.com",
    "description": "Leading tech company specializing in AI and cloud solutions",
    "address": {
      "street": "123 Tech Street",
      "city": "San Francisco",
      "state": "CA",
      "country": "USA",
      "zipCode": "94105"
    },
    "socialLinks": {
      "linkedin": "https://linkedin.com/company/techcorp",
      "twitter": "https://twitter.com/techcorp"
    }
  }' | jq -r '.data._id')

echo "Created Company ID: $COMPANY_ID"
echo -e "\n"

# Test 4: Get Company by ID
if [ ! -z "$COMPANY_ID" ] && [ "$COMPANY_ID" != "null" ]; then
  echo "4. Testing GET /companies/:id..."
  curl -s -X GET "$BASE_URL$API_PREFIX/companies/$COMPANY_ID" | jq
  echo -e "\n"

  # Test 5: Update Company
  echo "5. Testing PUT /companies/:id (with auth)..."
  curl -s -X PUT "$BASE_URL$API_PREFIX/companies/$COMPANY_ID" \
    -H "Authorization: Bearer $TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
      "description": "Updated: Leading tech company with global presence",
      "settings": {
        "allowPublicJobs": true,
        "requireApproval": false,
        "emailNotifications": true
      }
    }' | jq
  echo -e "\n"

  # Test 6: Get Company Stats
  echo "6. Testing GET /companies/:id/stats (with auth)..."
  curl -s -X GET "$BASE_URL$API_PREFIX/companies/$COMPANY_ID/stats" \
    -H "Authorization: Bearer $TOKEN" | jq
  echo -e "\n"
fi

# Test 7: Get All Companies (should have 1 now)
echo "7. Testing GET /companies again (should show created company)..."
curl -s -X GET "$BASE_URL$API_PREFIX/companies?page=1&limit=10" | jq
echo -e "\n"

# Test 8: Search Companies
echo "8. Testing GET /companies with search filter..."
curl -s -X GET "$BASE_URL$API_PREFIX/companies?search=Tech&industry=Technology" | jq
echo -e "\n"

# Test 9: Try to create without auth (should fail)
echo "9. Testing POST /companies without auth (should fail)..."
curl -s -X POST "$BASE_URL$API_PREFIX/companies" \
  -H "Content-Type: application/json" \
  -d '{"name": "Test", "industry": "Test", "size": "1-10"}' | jq '.error.message'
echo -e "\n"

# Test 10: Delete Company (optional - uncomment to test)
# if [ ! -z "$COMPANY_ID" ] && [ "$COMPANY_ID" != "null" ]; then
#   echo "10. Testing DELETE /companies/:id (with auth)..."
#   curl -s -X DELETE "$BASE_URL$API_PREFIX/companies/$COMPANY_ID" \
#     -H "Authorization: Bearer $TOKEN" | jq
#   echo -e "\n"
# fi

echo "======================================"
echo "Testing Complete!"
echo "======================================"
