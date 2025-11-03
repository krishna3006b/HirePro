import mongoose, { Schema, Document } from 'mongoose';

export interface IApiIntegration extends Document {
  companyId: mongoose.Types.ObjectId;
  serviceName: string;
  apiKey: string;
  config?: Record<string, any>;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const apiIntegrationSchema = new Schema<IApiIntegration>(
  {
    companyId: { 
      type: Schema.Types.ObjectId, 
      ref: 'Company', 
      required: true,
      index: true
    },
    serviceName: {
      type: String,
      required: true,
      trim: true,
      index: true
    },
    apiKey: {
      type: String,
      required: true,
      select: false // Don't return API key in queries by default
    },
    config: { 
      type: Schema.Types.Mixed 
    },
    isActive: { 
      type: Boolean, 
      default: true,
      index: true
    },
  },
  { 
    timestamps: true,
    collection: 'api_integrations'
  }
);

// Compound indexes
apiIntegrationSchema.index({ companyId: 1, serviceName: 1 }, { unique: true });
apiIntegrationSchema.index({ companyId: 1, isActive: 1 });

export default mongoose.model<IApiIntegration>('ApiIntegration', apiIntegrationSchema);
