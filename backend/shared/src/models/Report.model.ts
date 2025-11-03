import mongoose, { Schema, Document } from 'mongoose';

export interface IReport extends Document {
  companyId: mongoose.Types.ObjectId;
  type: 'hiring_trend' | 'bias_detection' | 'time_to_hire';
  data: Record<string, any>;
  generatedAt: Date;
  updatedAt: Date;
}

const reportSchema = new Schema<IReport>(
  {
    companyId: { 
      type: Schema.Types.ObjectId, 
      ref: 'Company', 
      required: true,
      index: true
    },
    type: { 
      type: String, 
      enum: ['hiring_trend', 'bias_detection', 'time_to_hire'],
      required: true,
      index: true
    },
    data: { 
      type: Schema.Types.Mixed,
      required: true
    },
  },
  { 
    timestamps: { 
      createdAt: 'generatedAt', 
      updatedAt: true 
    },
    collection: 'reports'
  }
);

// Compound indexes
reportSchema.index({ companyId: 1, type: 1, generatedAt: -1 });

export default mongoose.model<IReport>('Report', reportSchema);
