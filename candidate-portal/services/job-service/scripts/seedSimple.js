import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Job from '../src/models/Job.js';

dotenv.config();

// Dummy IDs for seeding
const companyId = new mongoose.Types.ObjectId();
const hrId = new mongoose.Types.ObjectId();

const jobs = [
  {
    companyId,
    companyName: 'TechCorp Solutions',
    createdBy: hrId,
    title: 'Senior Frontend Developer',
    description: 'We are looking for an experienced Frontend Developer to join our dynamic team. Build responsive web applications using modern JavaScript frameworks.',
    requirements: '5+ years Frontend Development. Expert in React.js and TypeScript. Experience with state management, responsive design, and testing frameworks.',
    skillsRequired: ['react', 'typescript', 'javascript', 'css', 'html'],
    location: { city: 'San Francisco', state: 'CA', country: 'USA' },
    workMode: 'hybrid',
    employmentType: 'full-time',
    salaryRange: { min: 120000, max: 160000, currency: 'USD' },
    experienceRequired: { min: 5, max: 10 },
    deadline: new Date('2025-12-15'),
    status: 'open',
  },
  {
    companyId,
    companyName: 'StartupXYZ',
    createdBy: hrId,
    title: 'Full Stack Engineer',
    description: 'Join our fast-growing startup as a Full Stack Engineer. Work on cutting-edge technologies and build products that impact millions.',
    requirements: '3+ years full-stack development. Proficiency in Node.js and React. Experience with MongoDB or PostgreSQL. Understanding of RESTful APIs.',
    skillsRequired: ['node.js', 'react', 'mongodb', 'express', 'javascript'],
    location: { city: 'New York', state: 'NY', country: 'USA' },
    workMode: 'remote',
    employmentType: 'full-time',
    salaryRange: { min: 100000, max: 140000, currency: 'USD' },
    experienceRequired: { min: 3, max: 7 },
    deadline: new Date('2025-12-01'),
    status: 'open',
  },
  {
    companyId,
    companyName: 'Cloud Innovations Inc',
    createdBy: hrId,
    title: 'Junior Backend Developer',
    description: 'Great opportunity for junior developers to grow their career. Work with senior engineers to build scalable backend systems.',
    requirements: '1-2 years backend development. Knowledge of Python or Node.js. Understanding of databases (SQL/NoSQL). Familiarity with REST APIs.',
    skillsRequired: ['python', 'node.js', 'postgresql', 'rest'],
    location: { city: 'Austin', state: 'TX', country: 'USA' },
    workMode: 'onsite',
    employmentType: 'full-time',
    salaryRange: { min: 70000, max: 90000, currency: 'USD' },
    experienceRequired: { min: 1, max: 2 },
    deadline: new Date('2025-11-30'),
    status: 'open',
  },
  {
    companyId,
    companyName: 'Enterprise Solutions Ltd',
    createdBy: hrId,
    title: 'DevOps Engineer',
    description: 'Build and maintain our cloud infrastructure. Work on CI/CD pipelines, monitoring, and automation.',
    requirements: '4+ years DevOps experience. Strong AWS or Azure knowledge. Experience with Docker and Kubernetes. Proficiency in scripting (Bash, Python).',
    skillsRequired: ['aws', 'docker', 'kubernetes', 'jenkins', 'python'],
    location: { city: 'Seattle', state: 'WA', country: 'USA' },
    workMode: 'hybrid',
    employmentType: 'full-time',
    salaryRange: { min: 110000, max: 150000, currency: 'USD' },
    experienceRequired: { min: 4, max: 8 },
    deadline: new Date('2025-12-20'),
    status: 'open',
  },
  {
    companyId,
    companyName: 'AppWorks Studio',
    createdBy: hrId,
    title: 'Mobile App Developer (React Native)',
    description: 'Build amazing mobile applications for iOS and Android using React Native. Work with a creative team to deliver exceptional UX.',
    requirements: '2+ years React Native development. Experience with iOS and Android. Knowledge of mobile app architecture. Familiarity with native modules.',
    skillsRequired: ['react native', 'javascript', 'typescript', 'ios', 'android'],
    location: { city: 'Los Angeles', state: 'CA', country: 'USA' },
    workMode: 'remote',
    employmentType: 'full-time',
    salaryRange: { min: 90000, max: 130000, currency: 'USD' },
    experienceRequired: { min: 2, max: 5 },
    deadline: new Date('2025-11-25'),
    status: 'open',
  },
  {
    companyId,
    companyName: 'DataFlow Analytics',
    createdBy: hrId,
    title: 'Data Engineer',
    description: 'Join our data team to build robust data pipelines and analytics infrastructure. Process and analyze large-scale datasets.',
    requirements: '3+ years data engineering. Strong SQL and Python. Experience with ETL processes. Familiarity with big data technologies (Spark, Hadoop).',
    skillsRequired: ['python', 'sql', 'spark', 'aws', 'etl'],
    location: { city: 'Boston', state: 'MA', country: 'USA' },
    workMode: 'hybrid',
    employmentType: 'full-time',
    salaryRange: { min: 105000, max: 145000, currency: 'USD' },
    experienceRequired: { min: 3, max: 6 },
    deadline: new Date('2025-12-10'),
    status: 'open',
  },
  {
    companyId,
    companyName: 'Creative Minds Agency',
    createdBy: hrId,
    title: 'UI/UX Designer',
    description: 'Create beautiful and intuitive user interfaces. Work closely with product and engineering teams.',
    requirements: '3+ years UI/UX design. Proficiency in Figma and Adobe XD. Strong portfolio showcasing web and mobile designs. Understanding of design systems.',
    skillsRequired: ['figma', 'adobe xd', 'ui design', 'ux design', 'prototyping'],
    location: { city: 'Chicago', state: 'IL', country: 'USA' },
    workMode: 'remote',
    employmentType: 'full-time',
    salaryRange: { min: 85000, max: 120000, currency: 'USD' },
    experienceRequired: { min: 3, max: 6 },
    deadline: new Date('2025-11-28'),
    status: 'open',
  },
  {
    companyId,
    companyName: 'AI Innovations Lab',
    createdBy: hrId,
    title: 'Machine Learning Engineer',
    description: 'Work on cutting-edge AI/ML projects. Build and deploy machine learning models to solve real-world problems at scale.',
    requirements: '4+ years ML engineering. Strong Python and ML frameworks (TensorFlow, PyTorch). Experience with model deployment and MLOps.',
    skillsRequired: ['python', 'tensorflow', 'pytorch', 'machine learning', 'aws'],
    location: { city: 'San Francisco', state: 'CA', country: 'USA' },
    workMode: 'hybrid',
    employmentType: 'full-time',
    salaryRange: { min: 140000, max: 190000, currency: 'USD' },
    experienceRequired: { min: 4, max: 10 },
    deadline: new Date('2025-12-18'),
    status: 'open',
  },
  {
    companyId,
    companyName: 'TechVision Inc',
    createdBy: hrId,
    title: 'Product Manager',
    description: 'Lead product development from conception to launch. Work with cross-functional teams to build products that customers love.',
    requirements: '5+ years product management. Technical background preferred. Strong analytical and communication skills. Experience with agile methodologies.',
    skillsRequired: ['product management', 'agile', 'jira', 'analytics'],
    location: { city: 'Denver', state: 'CO', country: 'USA' },
    workMode: 'hybrid',
    employmentType: 'full-time',
    salaryRange: { min: 125000, max: 165000, currency: 'USD' },
    experienceRequired: { min: 5, max: 10 },
    deadline: new Date('2025-12-05'),
    status: 'open',
  },
  {
    companyId,
    companyName: 'QualityFirst Software',
    createdBy: hrId,
    title: 'QA Automation Engineer',
    description: 'Build and maintain automated test suites. Work with development teams to catch bugs early in the development cycle.',
    requirements: '3+ years QA automation. Proficiency in Selenium, Cypress, or similar. Knowledge of JavaScript/Python. Experience with CI/CD integration.',
    skillsRequired: ['selenium', 'cypress', 'javascript', 'python', 'api testing'],
    location: { city: 'Portland', state: 'OR', country: 'USA' },
    workMode: 'remote',
    employmentType: 'full-time',
    salaryRange: { min: 95000, max: 125000, currency: 'USD' },
    experienceRequired: { min: 3, max: 7 },
    deadline: new Date('2025-12-12'),
    status: 'open',
  },
  {
    companyId,
    companyName: 'CryptoTech Solutions',
    createdBy: hrId,
    title: 'Blockchain Developer',
    description: 'Develop decentralized applications and smart contracts. Work on innovative blockchain solutions.',
    requirements: '2+ years blockchain development. Proficiency in Solidity and Web3.js. Understanding of Ethereum. Experience with smart contract security.',
    skillsRequired: ['solidity', 'web3.js', 'ethereum', 'blockchain', 'javascript'],
    location: { city: 'Miami', state: 'FL', country: 'USA' },
    workMode: 'remote',
    employmentType: 'full-time',
    salaryRange: { min: 110000, max: 155000, currency: 'USD' },
    experienceRequired: { min: 2, max: 5 },
    deadline: new Date('2025-12-22'),
    status: 'open',
  },
  {
    companyId,
    companyName: 'Enterprise Cloud Services',
    createdBy: hrId,
    title: 'Cloud Architect',
    description: 'Design and implement cloud infrastructure solutions for enterprise clients. Lead cloud migration projects and optimize costs.',
    requirements: '6+ years cloud architecture. AWS/Azure/GCP certifications required. Experience with infrastructure as code. Strong security knowledge.',
    skillsRequired: ['aws', 'azure', 'gcp', 'terraform', 'kubernetes'],
    location: { city: 'Washington', state: 'DC', country: 'USA' },
    workMode: 'onsite',
    employmentType: 'full-time',
    salaryRange: { min: 150000, max: 200000, currency: 'USD' },
    experienceRequired: { min: 6, max: 12 },
    deadline: new Date('2025-11-27'),
    status: 'open',
  },
];

async function seedJobs() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing jobs
    await Job.deleteMany({});
    console.log('✅ Cleared existing jobs');

    // Insert sample jobs
    const result = await Job.insertMany(jobs);
    console.log(`\n✅ Successfully inserted ${result.length} jobs!\n`);

    console.log('Jobs by work mode:');
    const remote = result.filter(j => j.workMode === 'remote').length;
    const hybrid = result.filter(j => j.workMode === 'hybrid').length;
    const onsite = result.filter(j => j.workMode === 'onsite').length;
    
    console.log(`  📍 Remote: ${remote}`);
    console.log(`  🏢 Hybrid: ${hybrid}`);
    console.log(`  🏛️  On-site: ${onsite}`);

    console.log('\nSalary ranges:');
    const avgSalary = result.reduce((sum, j) => sum + ((j.salaryRange.min + j.salaryRange.max) / 2), 0) / result.length;
    console.log(`  💰 Average: $${Math.round(avgSalary).toLocaleString()}`);

    await mongoose.connection.close();
    console.log('\n🎉 Database seeding completed successfully!\n');
  } catch (error) {
    console.error('❌ Error seeding database:', error.message);
    process.exit(1);
  }
}

seedJobs();
