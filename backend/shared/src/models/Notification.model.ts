import mongoose, { Schema, Document } from 'mongoose';

export interface INotification extends Document {
  userId?: mongoose.Types.ObjectId;
  candidateId?: mongoose.Types.ObjectId;
  message: string;
  category: 'job_update' | 'interview' | 'system';
  isRead: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const notificationSchema = new Schema<INotification>(
  {
    userId: { 
      type: Schema.Types.ObjectId, 
      ref: 'User',
      index: true
    },
    candidateId: { 
      type: Schema.Types.ObjectId, 
      ref: 'Candidate',
      index: true
    },
    message: { 
      type: String, 
      required: true 
    },
    category: { 
      type: String, 
      enum: ['job_update', 'interview', 'system'],
      index: true
    },
    isRead: { 
      type: Boolean, 
      default: false,
      index: true
    },
  },
  { 
    timestamps: true,
    collection: 'notifications'
  }
);

// Compound indexes
notificationSchema.index({ userId: 1, isRead: 1, createdAt: -1 });
notificationSchema.index({ candidateId: 1, isRead: 1, createdAt: -1 });

export default mongoose.model<INotification>('Notification', notificationSchema);
