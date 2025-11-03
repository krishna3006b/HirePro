import mongoose, { Document } from 'mongoose';
export interface IReport extends Document {
    companyId: mongoose.Types.ObjectId;
    type: 'hiring_trend' | 'bias_detection' | 'time_to_hire';
    data: Record<string, any>;
    generatedAt: Date;
    updatedAt: Date;
}
declare const _default: mongoose.Model<IReport, {}, {}, {}, mongoose.Document<unknown, {}, IReport, {}, {}> & IReport & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default _default;
//# sourceMappingURL=Report.model.d.ts.map