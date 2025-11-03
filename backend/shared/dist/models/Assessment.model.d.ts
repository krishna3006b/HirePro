import mongoose, { Document } from 'mongoose';
export interface IAssessment extends Document {
    applicationId: mongoose.Types.ObjectId;
    assessmentType: 'coding' | 'mcq' | 'system_design';
    startedAt?: Date;
    completedAt?: Date;
    score?: number;
    resultStatus?: 'passed' | 'failed' | 'flagged';
    details?: Record<string, any>;
    proctoringFlags?: Record<string, any>;
    createdAt: Date;
    updatedAt: Date;
}
declare const _default: mongoose.Model<IAssessment, {}, {}, {}, mongoose.Document<unknown, {}, IAssessment, {}, {}> & IAssessment & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default _default;
//# sourceMappingURL=Assessment.model.d.ts.map