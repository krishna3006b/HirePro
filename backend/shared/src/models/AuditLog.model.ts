import mongoose, { Schema, Document } from 'mongoose';

export interface IAuditLog extends Document {
  entityType: string;
  entityId?: mongoose.Types.ObjectId;
  action: string;
  performedBy?: mongoose.Types.ObjectId;
  details?: Record<string, any>;
  ipAddress?: string;
  createdAt: Date;
  updatedAt: Date;
}

const auditLogSchema = new Schema<IAuditLog>(
  {
    entityType: { 
      type: String, 
      required: true,
      index: true
    },
    entityId: { 
      type: Schema.Types.ObjectId,
      index: true
    },
    action: { 
      type: String, 
      required: true,
      index: true
    },
    performedBy: { 
      type: Schema.Types.ObjectId, 
      ref: 'User',
      index: true
    },
    details: { 
      type: Schema.Types.Mixed 
    },
    ipAddress: String,
  },
  { 
    timestamps: true,
    collection: 'audit_logs'
  }
);

// Compound indexes
auditLogSchema.index({ entityType: 1, createdAt: -1 });
auditLogSchema.index({ entityId: 1, createdAt: -1 });
auditLogSchema.index({ performedBy: 1, createdAt: -1 });

export default mongoose.model<IAuditLog>('AuditLog', auditLogSchema);
