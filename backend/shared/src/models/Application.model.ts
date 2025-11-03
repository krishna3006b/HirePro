import mongoose, { Schema, Document } from 'mongoose';

export interface IApplication extends Document {
  jobId: mongoose.Types.ObjectId;
  candidateId: mongoose.Types.ObjectId;
  status: 'applied' | 'shortlisted' | 'interview_scheduled' | 'rejected' | 'hired';
  resumeScore?: number;
  notes?: string;
  currentStage: string;
  isActive: boolean;
  appliedAt: Date;
  updatedAt: Date;
}

const applicationSchema = new Schema<IApplication>(
  {
    jobId: { 
      type: Schema.Types.ObjectId, 
      ref: 'Job', 
      required: true,
      index: true
    },
    candidateId: { 
      type: Schema.Types.ObjectId, 
      ref: 'Candidate', 
      required: true,
      index: true
    },
    status: { 
      type: String, 
      enum: ['applied', 'shortlisted', 'interview_scheduled', 'rejected', 'hired'],
      default: 'applied',
      index: true
    },
    resumeScore: {
      type: Number,
      min: 0,
      max: 100
    },
    notes: String,
    currentStage: { 
      type: String, 
      default: 'resume_round',
      index: true
    },
    isActive: { 
      type: Boolean, 
      default: true,
      index: true
    },
  },
  { 
    timestamps: { 
      createdAt: 'appliedAt', 
      updatedAt: true 
    },
    collection: 'applications'
  }
);

// Compound indexes
applicationSchema.index({ jobId: 1, status: 1 });
applicationSchema.index({ candidateId: 1, jobId: 1 }, { unique: true }); // Prevent duplicate applications
applicationSchema.index({ jobId: 1, candidateId: 1, status: 1 });
applicationSchema.index({ status: 1, appliedAt: -1 });

export default mongoose.model<IApplication>('Application', applicationSchema);
