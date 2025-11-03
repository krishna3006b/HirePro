import mongoose, { Document } from 'mongoose';
export interface IInterview extends Document {
    applicationId: mongoose.Types.ObjectId;
    type: 'ai' | 'human';
    scheduledAt?: Date;
    conductedAt?: Date;
    durationMinutes?: number;
    interviewerId?: mongoose.Types.ObjectId;
    aiAgentId?: string;
    aiScore?: number;
    humanScore?: number;
    sentimentScore?: number;
    communicationScore?: number;
    confidenceScore?: number;
    status: 'pending' | 'completed' | 'failed';
    feedback?: string;
    reportUrl?: string;
    createdAt: Date;
    updatedAt: Date;
}
declare const _default: mongoose.Model<IInterview, {}, {}, {}, mongoose.Document<unknown, {}, IInterview, {}, {}> & IInterview & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default _default;
//# sourceMappingURL=Interview.model.d.ts.map