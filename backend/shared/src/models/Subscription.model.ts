import mongoose, { Schema, Document } from 'mongoose';

export interface ISubscription extends Document {
  companyId: mongoose.Types.ObjectId;
  planName: string;
  price?: number;
  currency: string;
  startDate?: Date;
  endDate?: Date;
  autoRenew: boolean;
  paymentStatus: 'active' | 'expired' | 'pending';
  lastInvoiceId?: string;
  metadata?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

const subscriptionSchema = new Schema<ISubscription>(
  {
    companyId: { 
      type: Schema.Types.ObjectId, 
      ref: 'Company', 
      required: true,
      unique: true,
      index: true
    },
    planName: { 
      type: String, 
      default: 'starter',
      enum: ['starter', 'professional', 'enterprise'],
      index: true
    },
    price: {
      type: Number,
      min: 0
    },
    currency: { 
      type: String, 
      default: 'USD'
    },
    startDate: {
      type: Date,
      index: true
    },
    endDate: {
      type: Date,
      index: true
    },
    autoRenew: { 
      type: Boolean, 
      default: true 
    },
    paymentStatus: { 
      type: String, 
      enum: ['active', 'expired', 'pending'], 
      default: 'active',
      index: true
    },
    lastInvoiceId: String,
    metadata: { 
      type: Schema.Types.Mixed 
    }
  },
  { 
    timestamps: true,
    collection: 'subscriptions'
  }
);

// Indexes
subscriptionSchema.index({ paymentStatus: 1, endDate: 1 });

export default mongoose.model<ISubscription>('Subscription', subscriptionSchema);
