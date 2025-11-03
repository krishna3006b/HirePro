import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Job from '../src/models/Job.js';

dotenv.config();

// Dummy company and HR IDs for seeding
const dummyCompanyId = new mongoose.Types.ObjectId();
const dummyHRId = new mongoose.Types.ObjectId();

const sampleJobs = [
  {
    companyId: dummyCompanyId,
    companyName: 'TechCorp Solutions',
    createdBy: dummyHRId,
    title: 'Senior Frontend Developer',
    description: 'We are looking for an experienced Frontend Developer to join our dynamic team. You will be responsible for building responsive web applications using modern JavaScript frameworks.',
    requirements: '5+ years of experience in Frontend Development. Expert knowledge of React.js and TypeScript. Experience with state management (Redux, Zustand). Strong understanding of responsive design. Experience with testing frameworks (Jest, React Testing Library).',
    location: {
      city: 'San Francisco',
      state: 'CA',
      country: 'USA'
    },
    workMode: 'hybrid',
    salaryRange: {
      min: 120000,
      max: 160000,
      currency: 'USD',
    },
    employmentType: 'full-time',
    skills: ['React', 'TypeScript', 'JavaScript', 'CSS', 'HTML', 'Redux', 'Git'],
    experienceRequired: {
      min: 5,
      max: 10,
    },
    postedDate: new Date('2024-11-01'),
    applicationDeadline: new Date('2024-12-15'),
    isActive: true,
  },
  {
    title: 'Full Stack Engineer',
    company: 'StartupXYZ',
    description: 'Join our fast-growing startup as a Full Stack Engineer. Work on cutting-edge technologies and build products that impact millions of users.',
    requirements: [
      '3+ years of full-stack development experience',
      'Proficiency in Node.js and React',
      'Experience with MongoDB or PostgreSQL',
      'Understanding of RESTful APIs and microservices',
      'Strong problem-solving skills',
    ],
    location: 'New York, NY',
    workMode: 'remote',
    salaryRange: {
      min: 100000,
      max: 140000,
      currency: 'USD',
    },
    employmentType: 'full-time',
    skills: ['Node.js', 'React', 'MongoDB', 'Express', 'JavaScript', 'AWS', 'Docker'],
    experienceRequired: {
      min: 3,
      max: 7,
    },
    postedDate: new Date('2024-11-02'),
    applicationDeadline: new Date('2024-12-01'),
    isActive: true,
  },
  {
    title: 'Junior Backend Developer',
    company: 'Cloud Innovations Inc',
    description: 'Great opportunity for junior developers to grow their career. You will work with senior engineers to build scalable backend systems.',
    requirements: [
      '1-2 years of backend development experience',
      'Knowledge of Python or Node.js',
      'Understanding of databases (SQL/NoSQL)',
      'Familiarity with REST APIs',
      'Good communication skills',
    ],
    location: 'Austin, TX',
    workMode: 'on-site',
    salaryRange: {
      min: 70000,
      max: 90000,
      currency: 'USD',
    },
    employmentType: 'full-time',
    skills: ['Python', 'Node.js', 'PostgreSQL', 'REST APIs', 'Git'],
    experienceRequired: {
      min: 1,
      max: 2,
    },
    postedDate: new Date('2024-10-28'),
    applicationDeadline: new Date('2024-11-30'),
    isActive: true,
  },
  {
    title: 'DevOps Engineer',
    company: 'Enterprise Solutions Ltd',
    description: 'We are seeking a DevOps Engineer to help us build and maintain our cloud infrastructure. You will work on CI/CD pipelines, monitoring, and automation.',
    requirements: [
      '4+ years of DevOps experience',
      'Strong knowledge of AWS or Azure',
      'Experience with Docker and Kubernetes',
      'Proficiency in scripting (Bash, Python)',
      'Understanding of CI/CD tools (Jenkins, GitLab CI)',
    ],
    location: 'Seattle, WA',
    workMode: 'hybrid',
    salaryRange: {
      min: 110000,
      max: 150000,
      currency: 'USD',
    },
    employmentType: 'full-time',
    skills: ['AWS', 'Docker', 'Kubernetes', 'Jenkins', 'Python', 'Terraform', 'Linux'],
    experienceRequired: {
      min: 4,
      max: 8,
    },
    postedDate: new Date('2024-11-03'),
    applicationDeadline: new Date('2024-12-20'),
    isActive: true,
  },
  {
    title: 'Mobile App Developer (React Native)',
    company: 'AppWorks Studio',
    description: 'Build amazing mobile applications for iOS and Android using React Native. Work with a creative team to deliver exceptional user experiences.',
    requirements: [
      '2+ years of React Native development',
      'Experience with both iOS and Android platforms',
      'Knowledge of mobile app architecture',
      'Familiarity with native modules',
      'Published apps on App Store/Play Store (preferred)',
    ],
    location: 'Los Angeles, CA',
    workMode: 'remote',
    salaryRange: {
      min: 90000,
      max: 130000,
      currency: 'USD',
    },
    employmentType: 'full-time',
    skills: ['React Native', 'JavaScript', 'TypeScript', 'iOS', 'Android', 'Redux', 'REST APIs'],
    experienceRequired: {
      min: 2,
      max: 5,
    },
    postedDate: new Date('2024-10-30'),
    applicationDeadline: new Date('2024-11-25'),
    isActive: true,
  },
  {
    title: 'Data Engineer',
    company: 'DataFlow Analytics',
    description: 'Join our data team to build robust data pipelines and analytics infrastructure. Help us process and analyze large-scale datasets.',
    requirements: [
      '3+ years of data engineering experience',
      'Strong knowledge of SQL and Python',
      'Experience with ETL processes',
      'Familiarity with big data technologies (Spark, Hadoop)',
      'Understanding of data warehousing concepts',
    ],
    location: 'Boston, MA',
    workMode: 'hybrid',
    salaryRange: {
      min: 105000,
      max: 145000,
      currency: 'USD',
    },
    employmentType: 'full-time',
    skills: ['Python', 'SQL', 'Apache Spark', 'AWS', 'ETL', 'PostgreSQL', 'Airflow'],
    experienceRequired: {
      min: 3,
      max: 6,
    },
    postedDate: new Date('2024-11-01'),
    applicationDeadline: new Date('2024-12-10'),
    isActive: true,
  },
  {
    title: 'UI/UX Designer',
    company: 'Creative Minds Agency',
    description: 'We are looking for a talented UI/UX Designer to create beautiful and intuitive user interfaces. You will work closely with product and engineering teams.',
    requirements: [
      '3+ years of UI/UX design experience',
      'Proficiency in Figma and Adobe XD',
      'Strong portfolio showcasing web and mobile designs',
      'Understanding of design systems',
      'Knowledge of HTML/CSS (preferred)',
    ],
    location: 'Chicago, IL',
    workMode: 'remote',
    salaryRange: {
      min: 85000,
      max: 120000,
      currency: 'USD',
    },
    employmentType: 'full-time',
    skills: ['Figma', 'Adobe XD', 'UI Design', 'UX Design', 'Prototyping', 'User Research'],
    experienceRequired: {
      min: 3,
      max: 6,
    },
    postedDate: new Date('2024-10-29'),
    applicationDeadline: new Date('2024-11-28'),
    isActive: true,
  },
  {
    title: 'Machine Learning Engineer',
    company: 'AI Innovations Lab',
    description: 'Work on cutting-edge AI/ML projects. Build and deploy machine learning models to solve real-world problems at scale.',
    requirements: [
      '4+ years of ML engineering experience',
      'Strong knowledge of Python and ML frameworks (TensorFlow, PyTorch)',
      'Experience with model deployment and MLOps',
      'Understanding of statistics and algorithms',
      'PhD or Masters in CS/ML (preferred)',
    ],
    location: 'San Francisco, CA',
    workMode: 'hybrid',
    salaryRange: {
      min: 140000,
      max: 190000,
      currency: 'USD',
    },
    employmentType: 'full-time',
    skills: ['Python', 'TensorFlow', 'PyTorch', 'Machine Learning', 'Deep Learning', 'AWS', 'Docker'],
    experienceRequired: {
      min: 4,
      max: 10,
    },
    postedDate: new Date('2024-11-02'),
    applicationDeadline: new Date('2024-12-18'),
    isActive: true,
  },
  {
    title: 'Product Manager',
    company: 'TechVision Inc',
    description: 'Lead product development from conception to launch. Work with cross-functional teams to build products that customers love.',
    requirements: [
      '5+ years of product management experience',
      'Technical background preferred',
      'Strong analytical and communication skills',
      'Experience with agile methodologies',
      'Track record of successful product launches',
    ],
    location: 'Denver, CO',
    workMode: 'hybrid',
    salaryRange: {
      min: 125000,
      max: 165000,
      currency: 'USD',
    },
    employmentType: 'full-time',
    skills: ['Product Management', 'Agile', 'JIRA', 'Analytics', 'Roadmapping', 'Stakeholder Management'],
    experienceRequired: {
      min: 5,
      max: 10,
    },
    postedDate: new Date('2024-10-31'),
    applicationDeadline: new Date('2024-12-05'),
    isActive: true,
  },
  {
    title: 'QA Automation Engineer',
    company: 'QualityFirst Software',
    description: 'Build and maintain automated test suites to ensure product quality. Work with development teams to catch bugs early in the development cycle.',
    requirements: [
      '3+ years of QA automation experience',
      'Proficiency in Selenium, Cypress, or similar tools',
      'Knowledge of programming (JavaScript, Python)',
      'Experience with CI/CD integration',
      'Understanding of API testing',
    ],
    location: 'Portland, OR',
    workMode: 'remote',
    salaryRange: {
      min: 95000,
      max: 125000,
      currency: 'USD',
    },
    employmentType: 'full-time',
    skills: ['Selenium', 'Cypress', 'JavaScript', 'Python', 'API Testing', 'Jenkins', 'Git'],
    experienceRequired: {
      min: 3,
      max: 7,
    },
    postedDate: new Date('2024-11-03'),
    applicationDeadline: new Date('2024-12-12'),
    isActive: true,
  },
  {
    title: 'Blockchain Developer',
    company: 'CryptoTech Solutions',
    description: 'Develop decentralized applications and smart contracts. Join our team working on innovative blockchain solutions.',
    requirements: [
      '2+ years of blockchain development experience',
      'Proficiency in Solidity and Web3.js',
      'Understanding of Ethereum and other blockchain platforms',
      'Experience with smart contract security',
      'Knowledge of cryptography basics',
    ],
    location: 'Miami, FL',
    workMode: 'remote',
    salaryRange: {
      min: 110000,
      max: 155000,
      currency: 'USD',
    },
    employmentType: 'full-time',
    skills: ['Solidity', 'Web3.js', 'Ethereum', 'Blockchain', 'JavaScript', 'Smart Contracts'],
    experienceRequired: {
      min: 2,
      max: 5,
    },
    postedDate: new Date('2024-11-04'),
    applicationDeadline: new Date('2024-12-22'),
    isActive: true,
  },
  {
    title: 'Cloud Architect',
    company: 'Enterprise Cloud Services',
    description: 'Design and implement cloud infrastructure solutions for enterprise clients. Lead cloud migration projects and optimize costs.',
    requirements: [
      '6+ years of cloud architecture experience',
      'AWS/Azure/GCP certifications required',
      'Experience with infrastructure as code',
      'Strong knowledge of security best practices',
      'Excellent client-facing skills',
    ],
    location: 'Washington, DC',
    workMode: 'on-site',
    salaryRange: {
      min: 150000,
      max: 200000,
      currency: 'USD',
    },
    employmentType: 'full-time',
    skills: ['AWS', 'Azure', 'GCP', 'Terraform', 'CloudFormation', 'Kubernetes', 'Security'],
    experienceRequired: {
      min: 6,
      max: 12,
    },
    postedDate: new Date('2024-10-27'),
    applicationDeadline: new Date('2024-11-27'),
    isActive: true,
  },
];

async function seedJobs() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing jobs
    await Job.deleteMany({});
    console.log('Cleared existing jobs');

    // Insert sample jobs
    const result = await Job.insertMany(sampleJobs);
    console.log(`✅ Successfully inserted ${result.length} jobs`);

    console.log('\nJobs by category:');
    const remote = result.filter(j => j.workMode === 'remote').length;
    const hybrid = result.filter(j => j.workMode === 'hybrid').length;
    const onsite = result.filter(j => j.workMode === 'on-site').length;
    
    console.log(`  Remote: ${remote}`);
    console.log(`  Hybrid: ${hybrid}`);
    console.log(`  On-site: ${onsite}`);

    await mongoose.connection.close();
    console.log('\n✅ Database seeding completed!');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedJobs();
