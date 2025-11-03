import mongoose, { Schema, Document } from 'mongoose';

export interface IAssessment extends Document {
  applicationId: mongoose.Types.ObjectId;
  assessmentType: 'coding' | 'mcq' | 'system_design';
  startedAt?: Date;
  completedAt?: Date;
  score?: number;
  resultStatus?: 'passed' | 'failed' | 'flagged';
  details?: Record<string, any>;
  proctoringFlags?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

const assessmentSchema = new Schema<IAssessment>(
  {
    applicationId: { 
      type: Schema.Types.ObjectId, 
      ref: 'Application', 
      required: true,
      index: true
    },
    assessmentType: { 
      type: String, 
      enum: ['coding', 'mcq', 'system_design'],
      required: true,
      index: true
    },
    startedAt: {
      type: Date,
      index: true
    },
    completedAt: Date,
    score: {
      type: Number,
      min: 0,
      max: 100
    },
    resultStatus: { 
      type: String, 
      enum: ['passed', 'failed', 'flagged'],
      index: true
    },
    details: { 
      type: Schema.Types.Mixed 
    },
    proctoringFlags: { 
      type: Schema.Types.Mixed 
    },
  },
  { 
    timestamps: true,
    collection: 'assessments'
  }
);

// Compound indexes
assessmentSchema.index({ applicationId: 1, assessmentType: 1 });
assessmentSchema.index({ resultStatus: 1, score: -1 });

export default mongoose.model<IAssessment>('Assessment', assessmentSchema);
