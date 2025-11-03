import mongoose, { Document } from 'mongoose';
export interface IApiIntegration extends Document {
    companyId: mongoose.Types.ObjectId;
    serviceName: string;
    apiKey: string;
    config?: Record<string, any>;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
declare const _default: mongoose.Model<IApiIntegration, {}, {}, {}, mongoose.Document<unknown, {}, IApiIntegration, {}, {}> & IApiIntegration & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default _default;
//# sourceMappingURL=ApiIntegration.model.d.ts.map