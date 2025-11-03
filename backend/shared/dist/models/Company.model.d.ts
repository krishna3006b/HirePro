import mongoose, { Document } from 'mongoose';
export interface ICompany extends Document {
    name: string;
    domain?: string;
    website?: string;
    logoUrl?: string;
    description?: string;
    subscriptionPlan: string;
    settings: Record<string, any>;
    createdAt: Date;
    updatedAt: Date;
}
declare const _default: mongoose.Model<ICompany, {}, {}, {}, mongoose.Document<unknown, {}, ICompany, {}, {}> & ICompany & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default _default;
//# sourceMappingURL=Company.model.d.ts.map