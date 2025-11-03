import mongoose, { Document } from 'mongoose';
export interface ISubscription extends Document {
    companyId: mongoose.Types.ObjectId;
    planName: string;
    price?: number;
    currency: string;
    startDate?: Date;
    endDate?: Date;
    autoRenew: boolean;
    paymentStatus: 'active' | 'expired' | 'pending';
    lastInvoiceId?: string;
    metadata?: Record<string, any>;
    createdAt: Date;
    updatedAt: Date;
}
declare const _default: mongoose.Model<ISubscription, {}, {}, {}, mongoose.Document<unknown, {}, ISubscription, {}, {}> & ISubscription & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default _default;
//# sourceMappingURL=Subscription.model.d.ts.map