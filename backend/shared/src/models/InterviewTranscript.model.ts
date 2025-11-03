import mongoose, { Schema, Document } from 'mongoose';

export interface IInterviewTranscript extends Document {
  interviewId: mongoose.Types.ObjectId;
  timestamp: Date;
  speaker: 'ai' | 'candidate';
  content: string;
  sentimentScore?: number;
  keywords: string[];
  durationSeconds?: number;
}

const interviewTranscriptSchema = new Schema<IInterviewTranscript>(
  {
    interviewId: { 
      type: Schema.Types.ObjectId, 
      ref: 'Interview', 
      required: true,
      index: true
    },
    timestamp: { 
      type: Date, 
      default: Date.now,
      index: true
    },
    speaker: { 
      type: String, 
      enum: ['ai', 'candidate'],
      required: true
    },
    content: {
      type: String,
      required: true
    },
    sentimentScore: {
      type: Number,
      min: -1,
      max: 1
    },
    keywords: {
      type: [String],
      default: []
    },
    durationSeconds: {
      type: Number,
      min: 0
    }
  },
  {
    collection: 'interview_transcripts'
  }
);

// Indexes
interviewTranscriptSchema.index({ interviewId: 1, timestamp: 1 });

export default mongoose.model<IInterviewTranscript>('InterviewTranscript', interviewTranscriptSchema);
