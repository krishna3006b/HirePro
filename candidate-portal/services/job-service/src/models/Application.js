import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
  // References
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
    required: true,
    index: true
  },
  
  candidateId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    index: true
  },
  
  // Candidate snapshot (denormalized for performance)
  candidateInfo: {
    fullName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    phone: String,
    resumeUrl: String,
    skills: [String],
    experienceYears: Number,
    location: {
      city: String,
      state: String,
      country: String
    }
  },
  
  // Application Status
  status: {
    type: String,
    enum: [
      "applied",
      "under_review",
      "shortlisted",
      "interview_scheduled",
      "interviewed",
      "assessment_pending",
      "assessment_completed",
      "rejected",
      "hired",
      "withdrawn"
    ],
    default: "applied",
    index: true
  },
  
  // Current stage in pipeline
  currentStage: {
    type: String,
    enum: [
      "application",
      "resume_screening",
      "ai_interview",
      "technical_assessment",
      "hr_interview",
      "final_round",
      "offer",
      "closed"
    ],
    default: "application"
  },
  
  // Scores
  resumeScore: {
    type: Number,
    min: 0,
    max: 100
  },
  
  aiInterviewScore: {
    type: Number,
    min: 0,
    max: 100
  },
  
  assessmentScore: {
    type: Number,
    min: 0,
    max: 100
  },
  
  overallScore: {
    type: Number,
    min: 0,
    max: 100
  },
  
  // Additional documents
  coverLetter: String,
  
  // Custom question answers
  customAnswers: [{
    question: String,
    answer: mongoose.Schema.Types.Mixed
  }],
  
  // HR Notes
  notes: String,
  
  hrNotes: [{
    addedBy: mongoose.Schema.Types.ObjectId,
    note: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  
  // Rejection
  rejectionReason: String,
  rejectionDate: Date,
  
  // Flags
  isActive: {
    type: Boolean,
    default: true
  },
  
  isStarred: {
    type: Boolean,
    default: false
  },
  
  // Timeline tracking
  appliedAt: {
    type: Date,
    default: Date.now,
    index: true
  },
  
  reviewedAt: Date,
  shortlistedAt: Date,
  interviewedAt: Date,
  hiredAt: Date,
  
  // Source tracking
  source: {
    type: String,
    enum: ["direct", "referral", "linkedin", "indeed", "other"],
    default: "direct"
  },
  
  referralCode: String,
  
}, {
  timestamps: true,
  toJSON: { virtuals: true }
});

// Compound indexes
applicationSchema.index({ jobId: 1, candidateId: 1 }, { unique: true });
applicationSchema.index({ jobId: 1, status: 1 });
applicationSchema.index({ candidateId: 1, appliedAt: -1 });

// Virtual to check if application is in progress
applicationSchema.virtual("isInProgress").get(function() {
  return !["rejected", "hired", "withdrawn"].includes(this.status);
});

export default mongoose.model("Application", applicationSchema);
