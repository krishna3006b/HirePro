import mongoose, { Document } from 'mongoose';
export interface IResumeAnalysis extends Document {
    applicationId: mongoose.Types.ObjectId;
    parsedData?: Record<string, any>;
    skillMatchScore?: number;
    experienceRelevanceScore?: number;
    educationAlignmentScore?: number;
    overallScore?: number;
    autoRecommendation?: 'advance' | 'review' | 'reject';
    analysisCompletedAt: Date;
}
declare const _default: mongoose.Model<IResumeAnalysis, {}, {}, {}, mongoose.Document<unknown, {}, IResumeAnalysis, {}, {}> & IResumeAnalysis & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default _default;
//# sourceMappingURL=ResumeAnalysis.model.d.ts.map