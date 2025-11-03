import mongoose, { Schema, Document } from 'mongoose';

export interface IJob extends Document {
  companyId: mongoose.Types.ObjectId;
  createdBy?: mongoose.Types.ObjectId;
  title: string;
  description?: string;
  requirements?: string;
  skillsRequired: string[];
  salaryRange?: {
    min?: number;
    max?: number;
    currency?: string;
  };
  location?: string;
  workMode?: 'remote' | 'onsite' | 'hybrid';
  employmentType?: 'full-time' | 'part-time' | 'intern' | 'contract';
  deadline?: Date;
  status: 'open' | 'closed' | 'paused';
  totalPositions: number;
  closedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const jobSchema = new Schema<IJob>(
  {
    companyId: { 
      type: Schema.Types.ObjectId, 
      ref: 'Company', 
      required: true,
      index: true
    },
    createdBy: { 
      type: Schema.Types.ObjectId, 
      ref: 'User',
      index: true
    },
    title: { 
      type: String, 
      required: true,
      trim: true,
      index: 'text' // Text index for search
    },
    description: {
      type: String,
      index: 'text'
    },
    requirements: String,
    skillsRequired: {
      type: [String],
      default: [],
      index: true
    },
    salaryRange: {
      min: Number,
      max: Number,
      currency: { type: String, default: 'USD' }
    },
    location: {
      type: String,
      trim: true,
      index: true
    },
    workMode: { 
      type: String, 
      enum: ['remote', 'onsite', 'hybrid'],
      index: true
    },
    employmentType: { 
      type: String, 
      enum: ['full-time', 'part-time', 'intern', 'contract'],
      index: true
    },
    deadline: {
      type: Date,
      index: true
    },
    status: { 
      type: String, 
      enum: ['open', 'closed', 'paused'], 
      default: 'open',
      index: true
    },
    totalPositions: { 
      type: Number, 
      default: 1,
      min: 1
    },
    closedAt: Date,
  },
  { 
    timestamps: true,
    collection: 'jobs'
  }
);

// Compound indexes for common queries
jobSchema.index({ companyId: 1, status: 1 });
jobSchema.index({ companyId: 1, status: 1, createdAt: -1 });
jobSchema.index({ status: 1, deadline: 1 });
jobSchema.index({ workMode: 1, employmentType: 1, status: 1 });

// Text index for full-text search
jobSchema.index({ title: 'text', description: 'text' });

export default mongoose.model<IJob>('Job', jobSchema);
