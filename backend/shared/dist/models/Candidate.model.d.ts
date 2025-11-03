import mongoose, { Document } from 'mongoose';
export interface ICandidate extends Document {
    fullName: string;
    email: string;
    phone?: string;
    passwordHash?: string;
    refreshTokens: Array<{
        token: string;
        createdAt: Date;
    }>;
    lastLogin?: Date;
    resumeUrl?: string;
    linkedinUrl?: string;
    portfolioUrl?: string;
    skills: string[];
    experienceYears?: number;
    education?: string;
    source: 'website' | 'referral' | 'upload_by_hr';
    createdAt: Date;
    updatedAt: Date;
    comparePassword?(candidatePassword: string): Promise<boolean>;
}
declare const _default: mongoose.Model<ICandidate, {}, {}, {}, mongoose.Document<unknown, {}, ICandidate, {}, {}> & ICandidate & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default _default;
//# sourceMappingURL=Candidate.model.d.ts.map