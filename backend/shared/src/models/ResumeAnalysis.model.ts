import mongoose, { Schema, Document } from 'mongoose';

export interface IResumeAnalysis extends Document {
  applicationId: mongoose.Types.ObjectId;
  parsedData?: Record<string, any>;
  skillMatchScore?: number;
  experienceRelevanceScore?: number;
  educationAlignmentScore?: number;
  overallScore?: number;
  autoRecommendation?: 'advance' | 'review' | 'reject';
  analysisCompletedAt: Date;
}

const resumeAnalysisSchema = new Schema<IResumeAnalysis>(
  {
    applicationId: { 
      type: Schema.Types.ObjectId, 
      ref: 'Application', 
      required: true,
      unique: true,
      index: true
    },
    parsedData: { 
      type: Schema.Types.Mixed 
    },
    skillMatchScore: {
      type: Number,
      min: 0,
      max: 100
    },
    experienceRelevanceScore: {
      type: Number,
      min: 0,
      max: 100
    },
    educationAlignmentScore: {
      type: Number,
      min: 0,
      max: 100
    },
    overallScore: {
      type: Number,
      min: 0,
      max: 100,
      index: true
    },
    autoRecommendation: { 
      type: String, 
      enum: ['advance', 'review', 'reject'],
      index: true
    },
    analysisCompletedAt: { 
      type: Date, 
      default: Date.now,
      index: true
    }
  },
  {
    collection: 'resume_analyses'
  }
);

// Indexes
resumeAnalysisSchema.index({ overallScore: -1, analysisCompletedAt: -1 });

export default mongoose.model<IResumeAnalysis>('ResumeAnalysis', resumeAnalysisSchema);
