import mongoose, { Document } from 'mongoose';
export interface ICommunication extends Document {
    applicationId: mongoose.Types.ObjectId;
    type: 'email' | 'sms' | 'in_app';
    subject?: string;
    content: string;
    sentAt: Date;
    status: 'sent' | 'failed';
    channelMetadata?: Record<string, any>;
}
declare const _default: mongoose.Model<ICommunication, {}, {}, {}, mongoose.Document<unknown, {}, ICommunication, {}, {}> & ICommunication & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default _default;
//# sourceMappingURL=Communication.model.d.ts.map