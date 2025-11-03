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
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const jobSchema = new mongoose_1.Schema({
    companyId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Company',
        required: true,
        index: true
    },
    createdBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        index: true
    },
    title: {
        type: String,
        required: true,
        trim: true,
        index: 'text' // Text index for search
    },
    description: {
        type: String,
        index: 'text'
    },
    requirements: String,
    skillsRequired: {
        type: [String],
        default: [],
        index: true
    },
    salaryRange: {
        min: Number,
        max: Number,
        currency: { type: String, default: 'USD' }
    },
    location: {
        type: String,
        trim: true,
        index: true
    },
    workMode: {
        type: String,
        enum: ['remote', 'onsite', 'hybrid'],
        index: true
    },
    employmentType: {
        type: String,
        enum: ['full-time', 'part-time', 'intern', 'contract'],
        index: true
    },
    deadline: {
        type: Date,
        index: true
    },
    status: {
        type: String,
        enum: ['open', 'closed', 'paused'],
        default: 'open',
        index: true
    },
    totalPositions: {
        type: Number,
        default: 1,
        min: 1
    },
    closedAt: Date,
}, {
    timestamps: true,
    collection: 'jobs'
});
// Compound indexes for common queries
jobSchema.index({ companyId: 1, status: 1 });
jobSchema.index({ companyId: 1, status: 1, createdAt: -1 });
jobSchema.index({ status: 1, deadline: 1 });
jobSchema.index({ workMode: 1, employmentType: 1, status: 1 });
// Text index for full-text search
jobSchema.index({ title: 'text', description: 'text' });
exports.default = mongoose_1.default.model('Job', jobSchema);
//# sourceMappingURL=Job.model.js.map