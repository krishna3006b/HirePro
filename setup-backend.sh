#!/bin/bash

# HireFlow AI - Complete Backend Setup Script
# This script creates all 11 microservices with proper structure

set -e

echo "🚀 Creating HireFlow AI Complete Backend..."

# Create root structure
mkdir -p backend/{shared,services,scripts,docs}

# Shared utilities
echo "📦 Setting up shared utilities..."
mkdir -p backend/shared/{src/{config,middleware,utils,types,models},tests}

# Create all 11 services
services=(
  "api-gateway:8000"
  "company-service:8001"
  "auth-service:8002"
  "hr-service:8003"
  "job-service:8004"
  "candidate-service:8005"
  "resume-service:8006"
  "interview-service:8007"
  "assessment-service:8008"
  "communication-service:8009"
  "analytics-service:8010"
)

for service_info in "${services[@]}"; do
  IFS=':' read -r service port <<< "$service_info"
  echo "📁 Creating $service..."
  
  mkdir -p "backend/services/$service/src"/{models,controllers,services,routes,validators,config,middleware}
  mkdir -p "backend/services/$service"/{tests/{unit,integration,e2e},scripts}
  
  # Create .env.example
  cat > "backend/services/$service/.env.example" << EOF
NODE_ENV=development
PORT=$port
MONGODB_URI=mongodb://localhost:27017/hireflow_${service/-/_}
REDIS_URL=redis://localhost:6379
JWT_SECRET=your-jwt-secret-change-in-production
JWT_REFRESH_SECRET=your-refresh-secret-change-in-production
CORS_ORIGIN=http://localhost:3000
LOG_LEVEL=info
EOF

done

echo "✅ Backend structure created successfully!"
echo ""
echo "Next steps:"
echo "1. cd backend"
echo "2. Review the created structure"
echo "3. Install dependencies for each service"
echo ""
