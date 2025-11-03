import mongoose, { Document } from 'mongoose';
export interface IInterviewTranscript extends Document {
    interviewId: mongoose.Types.ObjectId;
    timestamp: Date;
    speaker: 'ai' | 'candidate';
    content: string;
    sentimentScore?: number;
    keywords: string[];
    durationSeconds?: number;
}
declare const _default: mongoose.Model<IInterviewTranscript, {}, {}, {}, mongoose.Document<unknown, {}, IInterviewTranscript, {}, {}> & IInterviewTranscript & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default _default;
//# sourceMappingURL=InterviewTranscript.model.d.ts.map