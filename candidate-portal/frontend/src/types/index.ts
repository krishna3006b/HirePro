export interface Candidate {
  id: string;
  email: string;
  fullName: string;
  phone?: string;
  resumeUrl?: string;
  linkedinUrl?: string;
  portfolioUrl?: string;
  githubUrl?: string;
  skills: string[];
  experienceYears: number;
  education?: string;
  currentJobTitle?: string;
  currentCompany?: string;
  location?: {
    city?: string;
    state?: string;
    country?: string;
  };
  jobPreferences?: {
    workMode?: string[];
    employmentType?: string[];
    expectedSalary?: {
      min?: number;
      max?: number;
      currency?: string;
    };
    preferredLocations?: string[];
    willingToRelocate?: boolean;
  };
  isProfileComplete: boolean;
  profileCompletionPercentage?: number;
}

export interface Job {
  _id: string;
  companyId: string;
  companyName: string;
  companyLogo?: string;
  title: string;
  description: string;
  requirements: string;
  responsibilities?: string;
  skillsRequired: string[];
  salaryRange?: {
    min?: number;
    max?: number;
    currency?: string;
    isNegotiable?: boolean;
  };
  location: {
    city?: string;
    state?: string;
    country?: string;
  };
  workMode: 'remote' | 'onsite' | 'hybrid';
  employmentType: 'full-time' | 'part-time' | 'contract' | 'intern';
  experienceRequired?: {
    min?: number;
    max?: number;
  };
  educationRequired?: string;
  totalPositions: number;
  filledPositions: number;
  deadline?: string;
  status: 'draft' | 'open' | 'paused' | 'closed' | 'cancelled';
  benefits?: string[];
  perks?: string[];
  stats: {
    views: number;
    applications: number;
  };
  createdAt: string;
  updatedAt: string;
  isExpired?: boolean;
  positionsRemaining?: number;
}

export interface Application {
  _id: string;
  jobId: Job;
  candidateId: string;
  candidateInfo: {
    fullName: string;
    email: string;
    phone?: string;
    resumeUrl?: string;
    skills: string[];
    experienceYears: number;
    location?: {
      city?: string;
      state?: string;
      country?: string;
    };
  };
  status: 'applied' | 'under_review' | 'shortlisted' | 'interview_scheduled' | 'interviewed' | 'assessment_pending' | 'assessment_completed' | 'rejected' | 'hired' | 'withdrawn';
  currentStage: string;
  resumeScore?: number;
  aiInterviewScore?: number;
  assessmentScore?: number;
  overallScore?: number;
  coverLetter?: string;
  notes?: string;
  appliedAt: string;
  isInProgress?: boolean;
}

export interface JobFilters {
  search?: string;
  workMode?: string;
  employmentType?: string;
  location?: string;
  skills?: string;
  minSalary?: number;
  maxSalary?: number;
  experienceMin?: number;
  experienceMax?: number;
  page?: number;
  limit?: number;
}

export interface FilterOptions {
  locations: string[];
  skills: string[];
  companies: string[];
  workModes: string[];
  employmentTypes: string[];
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  data?: {
    candidate: Candidate;
    accessToken: string;
    refreshToken: string;
  };
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
}

export interface PaginationData<T> {
  items: T[];
  pagination: {
    currentPage: number;
    totalPages: number;
    total: number;
    itemsPerPage: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}
