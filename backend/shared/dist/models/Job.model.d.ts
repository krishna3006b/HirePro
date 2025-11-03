import mongoose, { Document } from 'mongoose';
export interface IJob extends Document {
    companyId: mongoose.Types.ObjectId;
    createdBy?: mongoose.Types.ObjectId;
    title: string;
    description?: string;
    requirements?: string;
    skillsRequired: string[];
    salaryRange?: {
        min?: number;
        max?: number;
        currency?: string;
    };
    location?: string;
    workMode?: 'remote' | 'onsite' | 'hybrid';
    employmentType?: 'full-time' | 'part-time' | 'intern' | 'contract';
    deadline?: Date;
    status: 'open' | 'closed' | 'paused';
    totalPositions: number;
    closedAt?: Date;
    createdAt: Date;
    updatedAt: Date;
}
declare const _default: mongoose.Model<IJob, {}, {}, {}, mongoose.Document<unknown, {}, IJob, {}, {}> & IJob & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default _default;
//# sourceMappingURL=Job.model.d.ts.map