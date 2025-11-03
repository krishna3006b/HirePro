# HireFlow AI - Candidate Portal Setup Guide

## 🚀 Quick Start Guide

This guide will help you set up the HireFlow AI Candidate Portal microservices on your local machine.

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** v18 or higher
- **MongoDB** v6 or higher
- **npm** or **yarn**
- **Git**

### Project Structure

```
candidate-portal/
├── services/
│   ├── auth-service/          # Authentication microservice (Port 3001)
│   ├── candidate-service/     # Candidate profile service (Port 3002)
│   └── job-service/           # Job listing & applications (Port 3003)
├── frontend/                   # React TypeScript app (Port 3000)
├── shared/                     # Shared utilities and types
└── docker-compose.yml         # Docker setup (optional)
```

---

## 📦 Installation Steps

### Step 1: Install MongoDB

**On macOS** (using Homebrew):
```bash
brew tap mongodb/brew
brew install mongodb-community@7.0
brew services start mongodb-community@7.0
```

**On Ubuntu/Linux**:
```bash
wget -qO - https://www.mongodb.org/static/pgp/server-7.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org
sudo systemctl start mongod
```

**Verify MongoDB is running**:
```bash
mongosh
# Should connect successfully
```

### Step 2: Clone or Navigate to Project

```bash
cd /Users/salescode/Desktop/hirepro/candidate-portal
```

### Step 3: Install Dependencies for All Services

#### Auth Service
```bash
cd services/auth-service
cp .env.example .env
npm install
```

Edit `.env` file with your settings:
```env
PORT=3001
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/hireflow_auth
JWT_ACCESS_SECRET=your-super-secret-access-key-CHANGE-THIS-IN-PRODUCTION
JWT_REFRESH_SECRET=your-super-secret-refresh-key-CHANGE-THIS-IN-PRODUCTION
JWT_ACCESS_EXPIRY=15m
JWT_REFRESH_EXPIRY=7d
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173
```

#### Job Service
```bash
cd ../job-service
cp .env.example .env
npm install
```

Edit `.env` file:
```env
PORT=3003
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/hireflow_jobs
JWT_ACCESS_SECRET=your-super-secret-access-key-CHANGE-THIS-IN-PRODUCTION
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173
```

**IMPORTANT**: Use the SAME `JWT_ACCESS_SECRET` in both services!

#### Frontend
```bash
cd ../../frontend
npm install
```

Create `.env` file in frontend directory:
```env
VITE_API_BASE_URL=/api
```

---

## 🏃 Running the Application

### Option 1: Run Manually (Recommended for Development)

Open 3 terminal windows:

**Terminal 1 - Auth Service**:
```bash
cd services/auth-service
npm run dev
```
Should see: `Auth service running on port 3001`

**Terminal 2 - Job Service**:
```bash
cd services/job-service
npm run dev
```
Should see: `Job service running on port 3003`

**Terminal 3 - Frontend**:
```bash
cd frontend
npm run dev
```
Should see: `Local: http://localhost:3000`

### Option 2: Using Docker Compose

```bash
docker-compose up -d
```

Check status:
```bash
docker-compose ps
```

View logs:
```bash
docker-compose logs -f
```

---

## 🧪 Testing the Application

### 1. Access the Application

Open your browser and go to: **http://localhost:3000**

### 2. Create a Test Account

1. Click "Sign up"
2. Fill in details:
   - Full Name: `John Doe`
   - Email: `john@example.com`
   - Password: `Test@1234`
3. Click "Create Account"

### 3. Create Test Jobs (Using MongoDB)

```bash
mongosh

use hireflow_jobs

db.jobs.insertMany([
  {
    companyId: ObjectId(),
    companyName: "Tech Corp",
    companyLogo: "https://via.placeholder.com/100",
    createdBy: ObjectId(),
    title: "Senior Full Stack Developer",
    description: "We are looking for an experienced full stack developer...",
    requirements: "5+ years of experience in React and Node.js",
    skillsRequired: ["react", "nodejs", "typescript", "mongodb"],
    salaryRange: {
      min: 100000,
      max: 150000,
      currency: "INR"
    },
    location: {
      city: "Bangalore",
      state: "Karnataka",
      country: "India"
    },
    workMode: "hybrid",
    employmentType: "full-time",
    experienceRequired: { min: 3, max: 7 },
    totalPositions: 2,
    filledPositions: 0,
    status: "open",
    stats: { views: 0, applications: 0 },
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    companyId: ObjectId(),
    companyName: "StartupXYZ",
    createdBy: ObjectId(),
    title: "Frontend Developer",
    description: "Join our growing team...",
    requirements: "2+ years of React experience",
    skillsRequired: ["react", "javascript", "css", "html"],
    salaryRange: {
      min: 60000,
      max: 90000,
      currency: "INR"
    },
    location: {
      city: "Mumbai",
      state: "Maharashtra",
      country: "India"
    },
    workMode: "remote",
    employmentType: "full-time",
    experienceRequired: { min: 2, max: 5 },
    totalPositions: 1,
    filledPositions: 0,
    status: "open",
    stats: { views: 0, applications: 0 },
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
])
```

### 4. Test the Features

✅ **Login/Signup** - Create account and login  
✅ **Browse Jobs** - View job listings with filters  
✅ **Search Jobs** - Search by title, skills  
✅ **Filter Jobs** - Filter by work mode, location, type  
✅ **View Job Details** - Click on a job to see full details  
✅ **Apply to Jobs** - Submit job applications  
✅ **My Applications** - View application status  
✅ **Profile** - View and edit profile  

---

## 🔧 API Endpoints

### Auth Service (http://localhost:3001)

```
POST   /api/auth/signup          - Register new candidate
POST   /api/auth/login           - Login
POST   /api/auth/refresh         - Refresh access token
POST   /api/auth/logout          - Logout
GET    /api/auth/verify          - Verify token
```

### Job Service (http://localhost:3003)

```
GET    /api/jobs                 - List jobs (with filters)
GET    /api/jobs/:id             - Get job details
GET    /api/jobs/search          - Search jobs
GET    /api/jobs/filters         - Get filter options
POST   /api/jobs/:id/apply       - Apply to job (Protected)

GET    /api/applications/my-applications  - Get my applications (Protected)
GET    /api/applications/:id              - Get application details (Protected)
PUT    /api/applications/:id/withdraw     - Withdraw application (Protected)
```

---

## 🐛 Troubleshooting

### MongoDB Connection Error

```
Error: connect ECONNREFUSED 127.0.0.1:27017
```

**Solution**: Make sure MongoDB is running
```bash
brew services start mongodb-community@7.0  # macOS
sudo systemctl start mongod                 # Linux
```

### Port Already in Use

```
Error: listen EADDRINUSE: address already in use :::3001
```

**Solution**: Kill the process using the port
```bash
lsof -ti:3001 | xargs kill -9
```

### CORS Errors

**Solution**: Make sure `ALLOWED_ORIGINS` in `.env` includes `http://localhost:3000`

### JWT Token Errors

**Solution**: Ensure both auth-service and job-service use the SAME `JWT_ACCESS_SECRET`

---

## 📊 Database Schema

The application uses 3 MongoDB databases:

1. **hireflow_auth** - Stores candidate authentication data
2. **hireflow_jobs** - Stores jobs and applications

### Key Collections:

- `candidates` - User profiles and auth data
- `jobs` - Job postings
- `applications` - Job applications

---

## 🎯 Next Steps

1. ✅ Complete user authentication flow
2. ✅ Job listing with advanced filters
3. ✅ Job application submission
4. ✅ Application tracking
5. 🔄 Resume upload (integrate with S3)
6. 🔄 AI interview scheduling
7. 🔄 Email notifications
8. 🔄 Profile editing

---

## 🤝 Integration with HR Portal

The candidate portal is designed to work seamlessly with the HR portal:

- **Shared Job Service**: Both portals use the same job-service
- **Separate Databases**: candidate data is isolated from HR data
- **JWT Authentication**: Shared authentication mechanism
- **Microservice Architecture**: Easy to scale and maintain

### For HR Portal Developer:

1. Use the same `job-service` for creating/managing jobs
2. Implement HR authentication service (separate from candidate auth)
3. Create admin dashboard to view applications
4. Implement interview scheduling APIs

---

## 📝 Development Guidelines

### Code Style
- Use **ESLint** and **Prettier**
- Follow TypeScript best practices
- Write meaningful commit messages

### Git Workflow
```bash
git checkout -b feature/your-feature-name
# Make changes
git commit -m "feat: add new feature"
git push origin feature/your-feature-name
```

### Adding New Features

1. **Backend**: Add route → controller → update model if needed
2. **Frontend**: Create service → add React Query hook → create UI component

---

## 🚀 Deployment

### Production Checklist

- [ ] Change all JWT secrets
- [ ] Set NODE_ENV=production
- [ ] Use production MongoDB (MongoDB Atlas)
- [ ] Set up proper CORS origins
- [ ] Enable rate limiting
- [ ] Set up logging (Winston)
- [ ] Configure environment variables
- [ ] Set up CI/CD pipeline
- [ ] Enable HTTPS
- [ ] Set up monitoring (DataDog/Sentry)

---

## 📞 Support

For questions or issues:
- Check the troubleshooting section
- Review API documentation
- Check MongoDB logs: `mongosh` → `use hireflow_jobs` → `db.jobs.find()`

---

**Last Updated**: November 3, 2025  
**Version**: 1.0.0  
**Status**: Development Ready ✅
