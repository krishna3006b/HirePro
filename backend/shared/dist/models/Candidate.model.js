"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const candidateSchema = new mongoose_1.Schema({
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
}, {
    timestamps: true,
    collection: 'candidates'
});
// Indexes
candidateSchema.index({ email: 1 }, { unique: true });
candidateSchema.index({ fullName: 'text' });
candidateSchema.index({ skills: 1, experienceYears: 1 });
// Hash password before saving (if password is provided and modified)
candidateSchema.pre('save', async function (next) {
    if (this.passwordHash && this.isModified('passwordHash')) {
        const salt = await bcrypt_1.default.genSalt(12);
        this.passwordHash = await bcrypt_1.default.hash(this.passwordHash, salt);
    }
    next();
});
// Method to compare passwords
candidateSchema.methods.comparePassword = async function (candidatePassword) {
    if (!this.passwordHash) {
        return false;
    }
    return bcrypt_1.default.compare(candidatePassword, this.passwordHash);
};
exports.default = mongoose_1.default.model('Candidate', candidateSchema);
//# sourceMappingURL=Candidate.model.js.map