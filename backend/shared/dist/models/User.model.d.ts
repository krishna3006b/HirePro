import mongoose, { Document } from 'mongoose';
export interface IUser extends Document {
    companyId: mongoose.Types.ObjectId;
    fullName: string;
    email: string;
    passwordHash: string;
    role: 'admin' | 'recruiter' | 'interviewer';
    permissions: Record<string, any>;
    refreshTokens: Array<{
        token: string;
        createdAt: Date;
    }>;
    lastLogin?: Date;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    comparePassword(candidatePassword: string): Promise<boolean>;
}
declare const _default: mongoose.Model<IUser, {}, {}, {}, mongoose.Document<unknown, {}, IUser, {}, {}> & IUser & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default _default;
//# sourceMappingURL=User.model.d.ts.map