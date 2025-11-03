import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';

export interface ICandidate extends Document {
  fullName: string;
  email: string;
  phone?: string;
  passwordHash?: string;
  refreshTokens: Array<{ token: string; createdAt: Date }>;
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

const candidateSchema = new Schema<ICandidate>(
  {
    fullName: { 
      type: String, 
      required: true,
      trim: true,
      index: true
    },
    email: { 
      type: String, 
      required: true, 
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
      index: true
    },
    phone: {
      type: String,
      trim: true
    },
    passwordHash: {
      type: String,
      select: false // Don't return password in queries by default
    },
    refreshTokens: [{
      token: { type: String, required: true },
      createdAt: { type: Date, default: Date.now }
    }],
    lastLogin: Date,
    resumeUrl: String,
    linkedinUrl: String,
    portfolioUrl: String,
    skills: {
      type: [String],
      default: [],
      index: true
    },
    experienceYears: {
      type: Number,
      min: 0,
      index: true
    },
    education: String,
    source: { 
      type: String, 
      enum: ['website', 'referral', 'upload_by_hr'],
      default: 'website',
      index: true
    },
  },
  { 
    timestamps: true,
    collection: 'candidates'
  }
);

// Indexes
candidateSchema.index({ email: 1 }, { unique: true });
candidateSchema.index({ fullName: 'text' });
candidateSchema.index({ skills: 1, experienceYears: 1 });

// Hash password before saving (if password is provided and modified)
candidateSchema.pre('save', async function (next) {
  if (this.passwordHash && this.isModified('passwordHash')) {
    const salt = await bcrypt.genSalt(12);
    this.passwordHash = await bcrypt.hash(this.passwordHash, salt);
  }
  next();
});

// Method to compare passwords
candidateSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  if (!this.passwordHash) {
    return false;
  }
  return bcrypt.compare(candidatePassword, this.passwordHash);
};

export default mongoose.model<ICandidate>('Candidate', candidateSchema);
