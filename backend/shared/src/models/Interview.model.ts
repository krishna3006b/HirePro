import mongoose, { Schema, Document } from 'mongoose';

export interface IInterview extends Document {
  applicationId: mongoose.Types.ObjectId;
  type: 'ai' | 'human';
  scheduledAt?: Date;
  conductedAt?: Date;
  durationMinutes?: number;
  interviewerId?: mongoose.Types.ObjectId;
  aiAgentId?: string;
  aiScore?: number;
  humanScore?: number;
  sentimentScore?: number;
  communicationScore?: number;
  confidenceScore?: number;
  status: 'pending' | 'completed' | 'failed';
  feedback?: string;
  reportUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

const interviewSchema = new Schema<IInterview>(
  {
    applicationId: { 
      type: Schema.Types.ObjectId, 
      ref: 'Application', 
      required: true,
      index: true
    },
    type: { 
      type: String, 
      enum: ['ai', 'human'], 
      required: true,
      index: true
    },
    scheduledAt: {
      type: Date,
      index: true
    },
    conductedAt: Date,
    durationMinutes: {
      type: Number,
      min: 0
    },
    interviewerId: { 
      type: Schema.Types.ObjectId, 
      ref: 'User',
      index: true
    },
    aiAgentId: String,
    aiScore: {
      type: Number,
      min: 0,
      max: 100
    },
    humanScore: {
      type: Number,
      min: 0,
      max: 100
    },
    sentimentScore: {
      type: Number,
      min: -1,
      max: 1
    },
    communicationScore: {
      type: Number,
      min: 0,
      max: 100
    },
    confidenceScore: {
      type: Number,
      min: 0,
      max: 100
    },
    status: { 
      type: String, 
      enum: ['pending', 'completed', 'failed'], 
      default: 'pending',
      index: true
    },
    feedback: String,
    reportUrl: String
  },
  { 
    timestamps: true,
    collection: 'interviews'
  }
);

// Compound indexes
interviewSchema.index({ applicationId: 1, type: 1 });
interviewSchema.index({ status: 1, scheduledAt: 1 });
interviewSchema.index({ interviewerId: 1, scheduledAt: 1 });

export default mongoose.model<IInterview>('Interview', interviewSchema);
