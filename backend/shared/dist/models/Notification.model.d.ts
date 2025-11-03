import mongoose, { Document } from 'mongoose';
export interface INotification extends Document {
    userId?: mongoose.Types.ObjectId;
    candidateId?: mongoose.Types.ObjectId;
    message: string;
    category: 'job_update' | 'interview' | 'system';
    isRead: boolean;
    createdAt: Date;
    updatedAt: Date;
}
declare const _default: mongoose.Model<INotification, {}, {}, {}, mongoose.Document<unknown, {}, INotification, {}, {}> & INotification & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default _default;
//# sourceMappingURL=Notification.model.d.ts.map