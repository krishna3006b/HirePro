import mongoose from "mongoose";

const candidateSchema = new mongoose.Schema({
  // Authentication
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, "Please provide a valid email"]
  },
  passwordHash: {
    type: String,
    required: [true, "Password is required"],
    select: false // Don't return password by default
  },
  
  // Basic Information
  fullName: {
    type: String,
    required: [true, "Full name is required"],
    trim: true
  },
  phone: {
    type: String,
    trim: true,
    match: [/^[0-9]{10}$/, "Please provide a valid 10-digit phone number"]
  },
  
  // Profile Details
  resumeUrl: String,
  linkedinUrl: String,
  portfolioUrl: String,
  githubUrl: String,
  
  skills: [{
    type: String,
    trim: true
  }],
  
  experienceYears: {
    type: Number,
    min: 0,
    default: 0
  },
  
  education: {
    type: String,
    enum: [
      "high_school",
      "associate",
      "bachelor",
      "master",
      "phd",
      "bootcamp",
      "self_taught",
      "other"
    ]
  },
  
  educationDetails: String,
  
  currentJobTitle: String,
  currentCompany: String,
  
  // Location
  location: {
    city: String,
    state: String,
    country: {
      type: String,
      default: "India"
    }
  },
  
  // Preferences
  jobPreferences: {
    workMode: [{
      type: String,
      enum: ["remote", "onsite", "hybrid"]
    }],
    employmentType: [{
      type: String,
      enum: ["full-time", "part-time", "contract", "intern"]
    }],
    expectedSalary: {
      min: Number,
      max: Number,
      currency: {
        type: String,
        default: "INR"
      }
    },
    preferredLocations: [String],
    willingToRelocate: {
      type: Boolean,
      default: false
    }
  },
  
  // Account Status
  isEmailVerified: {
    type: Boolean,
    default: false
  },
  
  isProfileComplete: {
    type: Boolean,
    default: false
  },
  
  isActive: {
    type: Boolean,
    default: true
  },
  
  // Source tracking
  source: {
    type: String,
    enum: ["website", "referral", "linkedin", "job_board", "other"],
    default: "website"
  },
  
  referralCode: String,
  
  // Metadata
  lastLogin: Date,
  
  // Tokens for password reset, email verification
  refreshTokens: [{
    token: String,
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 604800 // 7 days in seconds
    }
  }],
  
  emailVerificationToken: String,
  emailVerificationExpires: Date,
  
  passwordResetToken: String,
  passwordResetExpires: Date,
  
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: function(doc, ret) {
      delete ret.passwordHash;
      delete ret.refreshTokens;
      delete ret.emailVerificationToken;
      delete ret.passwordResetToken;
      delete ret.__v;
      return ret;
    }
  }
});

// Indexes for performance
candidateSchema.index({ email: 1 });
candidateSchema.index({ skills: 1 });
candidateSchema.index({ "location.city": 1 });
candidateSchema.index({ createdAt: -1 });

// Virtual for profile completion percentage
candidateSchema.virtual("profileCompletionPercentage").get(function() {
  let score = 0;
  const fields = [
    this.fullName,
    this.email,
    this.phone,
    this.resumeUrl,
    this.skills && this.skills.length > 0,
    this.experienceYears >= 0,
    this.education,
    this.location && this.location.city,
    this.currentJobTitle,
    this.linkedinUrl
  ];
  
  fields.forEach(field => {
    if (field) score += 10;
  });
  
  return score;
});

// Pre-save middleware to update isProfileComplete
candidateSchema.pre("save", function(next) {
  const requiredFields = [
    this.fullName,
    this.email,
    this.phone,
    this.skills && this.skills.length > 0,
    this.location && this.location.city
  ];
  
  this.isProfileComplete = requiredFields.every(field => !!field);
  next();
});

export default mongoose.model("Candidate", candidateSchema);
