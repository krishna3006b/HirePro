import mongoose, { Document } from 'mongoose';
export interface IApplication extends Document {
    jobId: mongoose.Types.ObjectId;
    candidateId: mongoose.Types.ObjectId;
    status: 'applied' | 'shortlisted' | 'interview_scheduled' | 'rejected' | 'hired';
    resumeScore?: number;
    notes?: string;
    currentStage: string;
    isActive: boolean;
    appliedAt: Date;
    updatedAt: Date;
}
declare const _default: mongoose.Model<IApplication, {}, {}, {}, mongoose.Document<unknown, {}, IApplication, {}, {}> & IApplication & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default _default;
//# sourceMappingURL=Application.model.d.ts.map