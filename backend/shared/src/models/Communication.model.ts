import mongoose, { Schema, Document } from 'mongoose';

export interface ICommunication extends Document {
  applicationId: mongoose.Types.ObjectId;
  type: 'email' | 'sms' | 'in_app';
  subject?: string;
  content: string;
  sentAt: Date;
  status: 'sent' | 'failed';
  channelMetadata?: Record<string, any>;
}

const communicationSchema = new Schema<ICommunication>(
  {
    applicationId: { 
      type: Schema.Types.ObjectId, 
      ref: 'Application', 
      required: true,
      index: true
    },
    type: { 
      type: String, 
      enum: ['email', 'sms', 'in_app'], 
      required: true,
      index: true
    },
    subject: String,
    content: {
      type: String,
      required: true
    },
    sentAt: { 
      type: Date, 
      default: Date.now,
      index: true
    },
    status: { 
      type: String, 
      enum: ['sent', 'failed'], 
      default: 'sent',
      index: true
    },
    channelMetadata: { 
      type: Schema.Types.Mixed 
    }
  },
  {
    collection: 'communications'
  }
);

// Indexes
communicationSchema.index({ applicationId: 1, type: 1, sentAt: -1 });
communicationSchema.index({ status: 1, sentAt: -1 });

export default mongoose.model<ICommunication>('Communication', communicationSchema);
