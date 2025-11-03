import mongoose, { Document } from 'mongoose';
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
declare const _default: mongoose.Model<IAuditLog, {}, {}, {}, mongoose.Document<unknown, {}, IAuditLog, {}, {}> & IAuditLog & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default _default;
//# sourceMappingURL=AuditLog.model.d.ts.map