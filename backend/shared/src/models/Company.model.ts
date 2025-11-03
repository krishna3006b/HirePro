import mongoose, { Schema, Document } from 'mongoose';

export interface ICompany extends Document {
  name: string;
  domain?: string;
  website?: string;
  logoUrl?: string;
  description?: string;
  subscriptionPlan: string;
  settings: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

const companySchema = new Schema<ICompany>(
  {
    name: { 
      type: String, 
      required: true, 
      trim: true,
      index: true 
    },
    domain: { 
      type: String, 
      trim: true,
      lowercase: true 
    },
    website: { 
      type: String, 
      trim: true 
    },
    logoUrl: String,
    description: String,
    subscriptionPlan: { 
      type: String, 
      default: 'starter',
      enum: ['starter', 'professional', 'enterprise'],
      index: true
    },
    settings: { 
      type: Schema.Types.Mixed, 
      default: {} 
    },
  },
  { 
    timestamps: true,
    collection: 'companies'
  }
);

// Indexes for better query performance
companySchema.index({ name: 1 });
companySchema.index({ domain: 1 });
companySchema.index({ subscriptionPlan: 1, createdAt: -1 });

export default mongoose.model<ICompany>('Company', companySchema);
