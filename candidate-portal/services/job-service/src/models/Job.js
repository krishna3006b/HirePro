import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  // Company reference (from HR service)
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    index: true
  },
  
  companyName: {
    type: String,
    required: true
  },
  
  companyLogo: String,
  
  // Created by (HR user)
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  
  // Basic Information
  title: {
    type: String,
    required: [true, "Job title is required"],
    trim: true,
    index: true
  },
  
  description: {
    type: String,
    required: [true, "Job description is required"]
  },
  
  requirements: {
    type: String,
    required: [true, "Job requirements are required"]
  },
  
  responsibilities: String,
  
  // Skills
  skillsRequired: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  
  // Salary
  salaryRange: {
    min: {
      type: Number,
      min: 0
    },
    max: {
      type: Number,
      min: 0
    },
    currency: {
      type: String,
      default: "INR",
      enum: ["INR", "USD", "EUR", "GBP"]
    },
    isNegotiable: {
      type: Boolean,
      default: false
    }
  },
  
  // Location
  location: {
    city: String,
    state: String,
    country: {
      type: String,
      default: "India"
    }
  },
  
  // Work arrangement
  workMode: {
    type: String,
    enum: ["remote", "onsite", "hybrid"],
    required: true,
    index: true
  },
  
  employmentType: {
    type: String,
    enum: ["full-time", "part-time", "contract", "intern"],
    required: true,
    index: true
  },
  
  // Additional details
  experienceRequired: {
    min: {
      type: Number,
      min: 0,
      default: 0
    },
    max: {
      type: Number,
      min: 0
    }
  },
  
  educationRequired: {
    type: String,
    enum: ["high_school", "associate", "bachelor", "master", "phd", "any"]
  },
  
  // Positions
  totalPositions: {
    type: Number,
    default: 1,
    min: 1
  },
  
  filledPositions: {
    type: Number,
    default: 0,
    min: 0
  },
  
  // Deadlines
  deadline: {
    type: Date,
    index: true
  },
  
  // Status
  status: {
    type: String,
    enum: ["draft", "open", "paused", "closed", "cancelled"],
    default: "open",
    index: true
  },
  
  closedAt: Date,
  closedReason: String,
  
  // Benefits & Perks
  benefits: [String],
  perks: [String],
  
  // Application settings
  applicationSettings: {
    requireResume: {
      type: Boolean,
      default: true
    },
    requireCoverLetter: {
      type: Boolean,
      default: false
    },
    customQuestions: [{
      question: String,
      required: Boolean,
      type: {
        type: String,
        enum: ["text", "textarea", "radio", "checkbox"]
      }
    }]
  },
  
  // Statistics
  stats: {
    views: {
      type: Number,
      default: 0
    },
    applications: {
      type: Number,
      default: 0
    },
    shortlisted: {
      type: Number,
      default: 0
    },
    interviewed: {
      type: Number,
      default: 0
    },
    hired: {
      type: Number,
      default: 0
    }
  },
  
  // SEO & Visibility
  tags: [String],
  
  isActive: {
    type: Boolean,
    default: true
  },
  
  isFeatured: {
    type: Boolean,
    default: false
  },
  
  // Metadata
  publishedAt: Date,
  
}, {
  timestamps: true,
  toJSON: { virtuals: true }
});

// Indexes for filtering and searching
jobSchema.index({ title: "text", description: "text" });
jobSchema.index({ skillsRequired: 1 });
jobSchema.index({ "location.city": 1 });
jobSchema.index({ workMode: 1, employmentType: 1 });
jobSchema.index({ status: 1, deadline: 1 });
jobSchema.index({ createdAt: -1 });

// Virtual for whether deadline has passed
jobSchema.virtual("isExpired").get(function() {
  if (!this.deadline) return false;
  return this.deadline < new Date();
});

// Virtual for positions remaining
jobSchema.virtual("positionsRemaining").get(function() {
  return this.totalPositions - this.filledPositions;
});

// Pre-save middleware
jobSchema.pre("save", function(next) {
  // Set publishedAt when status changes to open
  if (this.isModified("status") && this.status === "open" && !this.publishedAt) {
    this.publishedAt = new Date();
  }
  
  // Set closedAt when status changes to closed
  if (this.isModified("status") && this.status === "closed" && !this.closedAt) {
    this.closedAt = new Date();
  }
  
  next();
});

export default mongoose.model("Job", jobSchema);
