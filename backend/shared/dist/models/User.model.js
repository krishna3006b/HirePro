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
const userSchema = new mongoose_1.Schema({
    companyId: {
        type: mongoose_1.Schema.Types.ObjectId,
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
        type: mongoose_1.Schema.Types.Mixed,
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
}, {
    timestamps: true,
    collection: 'users'
});
// Compound indexes
userSchema.index({ companyId: 1, email: 1 }, { unique: true });
userSchema.index({ companyId: 1, role: 1, isActive: 1 });
// Hash password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('passwordHash'))
        return next();
    try {
        const salt = await bcrypt_1.default.genSalt(12);
        this.passwordHash = await bcrypt_1.default.hash(this.passwordHash, salt);
        next();
    }
    catch (error) {
        next(error);
    }
});
// Method to compare passwords
userSchema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt_1.default.compare(candidatePassword, this.passwordHash);
};
exports.default = mongoose_1.default.model('User', userSchema);
//# sourceMappingURL=User.model.js.map