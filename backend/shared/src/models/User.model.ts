import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser extends Document {
  companyId: mongoose.Types.ObjectId;
  fullName: string;
  email: string;
  passwordHash: string;
  role: 'admin' | 'recruiter' | 'interviewer';
  permissions: Record<string, any>;
  refreshTokens: Array<{ token: string; createdAt: Date }>;
  lastLogin?: Date;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>(
  {
    companyId: { 
      type: Schema.Types.ObjectId, 
      ref: 'Company', 
      required: true,
      index: true
    },
    fullName: { 
      type: String, 
      required: true,
      trim: true
    },
    email: { 
      type: String, 
      unique: true, 
      required: true, 
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
    },
    passwordHash: { 
      type: String, 
      required: true,
      select: false // Don't return password in queries by default
    },
    role: { 
      type: String, 
      enum: ['admin', 'recruiter', 'interviewer'], 
      default: 'recruiter',
      index: true
    },
    permissions: { 
      type: Schema.Types.Mixed, 
      default: {} 
    },
    refreshTokens: [{
      token: { type: String, required: true },
      createdAt: { type: Date, default: Date.now }
    }],
    lastLogin: Date,
    isActive: { 
      type: Boolean, 
      default: true,
      index: true
    },
  },
  { 
    timestamps: true,
    collection: 'users'
  }
);

// Compound indexes
userSchema.index({ companyId: 1, email: 1 }, { unique: true });
userSchema.index({ companyId: 1, role: 1, isActive: 1 });

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('passwordHash')) return next();
  
  try {
    const salt = await bcrypt.genSalt(12);
    this.passwordHash = await bcrypt.hash(this.passwordHash, salt);
    next();
  } catch (error: any) {
    next(error);
  }
});

// Method to compare passwords
userSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.passwordHash);
};

export default mongoose.model<IUser>('User', userSchema);
