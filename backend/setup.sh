#!/bin/bash

# HireFlow Backend - Complete Setup Script
# This script sets up all microservices with proper structure

set -e

echo "🚀 Setting up HireFlow Backend - MERN Stack"
echo "=============================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Create root directory
ROOT_DIR="/Users/salescode/Desktop/hirepro/backend"
cd "$ROOT_DIR"

echo -e "${GREEN}✓${NC} In backend directory: $ROOT_DIR"

# Install shared dependencies
echo -e "\n${YELLOW}📦 Installing shared dependencies...${NC}"
cd shared
npm install
cd ..

# Services to create
SERVICES=(
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

# Create each service
for service_info in "${SERVICES[@]}"; do
  IFS=':' read -r service port <<< "$service_info"
  
  echo -e "\n${YELLOW}🔧 Setting up $service (Port: $port)...${NC}"
  
  SERVICE_DIR="services/$service"
  
  # Create directory structure
  mkdir -p "$SERVICE_DIR"/{src/{models,controllers,services,routes,validators,middleware,config,types},tests/{unit,integration,e2e}}
  
  # Create package.json
  cat > "$SERVICE_DIR/package.json" <<EOF
{
  "name": "@hireflow/$service",
  "version": "1.0.0",
  "description": "HireFlow $service microservice",
  "main": "dist/app.js",
  "scripts": {
    "start": "node dist/app.js",
    "dev": "nodemon --exec ts-node src/app.ts",
    "build": "tsc",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "lint": "eslint src --ext .ts",
    "format": "prettier --write \"src/**/*.ts\""
  },
  "keywords": ["hireflow", "$service", "microservice"],
  "author": "HireFlow Team",
  "license": "PROPRIETARY",
  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "^8.0.3",
    "dotenv": "^16.3.1",
    "cors": "^2.8.5",
    "helmet": "^7.1.0",
    "express-rate-limit": "^7.1.5",
    "express-mongo-sanitize": "^2.2.0",
    "zod": "^3.22.4",
    "winston": "^3.11.0",
    "redis": "^4.6.11",
    "bull": "^4.12.0"
  },
  "devDependencies": {
    "@types/express": "^4.17.21",
    "@types/cors": "^2.8.17",
    "@types/node": "^20.10.5",
    "typescript": "^5.3.3",
    "ts-node": "^10.9.2",
    "nodemon": "^3.0.2",
    "jest": "^29.7.0",
    "@types/jest": "^29.5.11",
    "ts-jest": "^29.1.1",
    "supertest": "^6.3.3",
    "@types/supertest": "^6.0.2",
    "eslint": "^8.56.0",
    "@typescript-eslint/eslint-plugin": "^6.15.0",
    "@typescript-eslint/parser": "^6.15.0",
    "prettier": "^3.1.1"
  }
}
EOF

  # Create tsconfig.json
  cat > "$SERVICE_DIR/tsconfig.json" <<EOF
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "commonjs",
    "lib": ["ES2022"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "moduleResolution": "node",
    "types": ["node", "jest"],
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@shared/*": ["../../shared/src/*"]
    }
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "**/*.spec.ts", "**/*.test.ts"]
}
EOF

  # Create .env.example
  cat > "$SERVICE_DIR/.env.example" <<EOF
NODE_ENV=development
PORT=$port
SERVICE_NAME=$service

# Database
MONGODB_URI=mongodb://localhost:27017/hireflow_${service//-/_}

# Redis
REDIS_URL=redis://localhost:6379

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_REFRESH_SECRET=your-super-secret-refresh-key-change-in-production

# API Gateway
API_GATEWAY_URL=http://localhost:8000

# Logging
LOG_LEVEL=debug
EOF

  # Create .gitignore
  cat > "$SERVICE_DIR/.gitignore" <<EOF
node_modules/
dist/
.env
*.log
logs/
coverage/
.DS_Store
EOF

  echo -e "${GREEN}✓${NC} Created $service structure"
done

# Create root package.json for workspace
cat > package.json <<EOF
{
  "name": "hireflow-backend",
  "version": "1.0.0",
  "description": "HireFlow AI - Complete Backend Microservices",
  "private": true,
  "workspaces": [
    "shared",
    "services/*"
  ],
  "scripts": {
    "install:all": "npm install && npm run install:services",
    "install:services": "for d in services/*; do (cd \\$d && npm install); done",
    "dev:gateway": "cd services/api-gateway && npm run dev",
    "dev:company": "cd services/company-service && npm run dev",
    "dev:auth": "cd services/auth-service && npm run dev",
    "test": "npm run test --workspaces",
    "lint": "npm run lint --workspaces",
    "format": "npm run format --workspaces",
    "build": "npm run build --workspaces"
  },
  "keywords": ["hireflow", "backend", "microservices", "mern"],
  "author": "HireFlow Team",
  "license": "PROPRIETARY",
  "devDependencies": {
    "concurrently": "^8.2.2"
  }
}
EOF

# Create Docker Compose for development
cat > docker-compose.dev.yml <<EOF
version: '3.8'

services:
  mongodb:
    image: mongo:7.0
    container_name: hireflow-mongodb
    ports:
      - "27017:27017"
    environment:
      MONGO_INITDB_ROOT_USERNAME: admin
      MONGO_INITDB_ROOT_PASSWORD: password123
    volumes:
      - mongodb_data:/data/db
    networks:
      - hireflow-network

  redis:
    image: redis:7-alpine
    container_name: hireflow-redis
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    networks:
      - hireflow-network

  elasticsearch:
    image: docker.elastic.co/elasticsearch/elasticsearch:8.11.0
    container_name: hireflow-elasticsearch
    environment:
      - discovery.type=single-node
      - "ES_JAVA_OPTS=-Xms512m -Xmx512m"
      - xpack.security.enabled=false
    ports:
      - "9200:9200"
    volumes:
      - elasticsearch_data:/usr/share/elasticsearch/data
    networks:
      - hireflow-network

volumes:
  mongodb_data:
  redis_data:
  elasticsearch_data:

networks:
  hireflow-network:
    driver: bridge
EOF

echo -e "\n${GREEN}✅ Setup complete!${NC}"
echo -e "\n${YELLOW}Next steps:${NC}"
echo "1. Install all dependencies: npm run install:all"
echo "2. Start infrastructure: docker-compose -f docker-compose.dev.yml up -d"
echo "3. Start services: npm run dev:gateway (in separate terminals)"
echo -e "\n${GREEN}Happy coding! 🚀${NC}"
