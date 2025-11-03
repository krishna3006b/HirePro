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
const applicationSchema = new mongoose_1.Schema({
    jobId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Job',
        required: true,
        index: true
    },
    candidateId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Candidate',
        required: true,
        index: true
    },
    status: {
        type: String,
        enum: ['applied', 'shortlisted', 'interview_scheduled', 'rejected', 'hired'],
        default: 'applied',
        index: true
    },
    resumeScore: {
        type: Number,
        min: 0,
        max: 100
    },
    notes: String,
    currentStage: {
        type: String,
        default: 'resume_round',
        index: true
    },
    isActive: {
        type: Boolean,
        default: true,
        index: true
    },
}, {
    timestamps: {
        createdAt: 'appliedAt',
        updatedAt: true
    },
    collection: 'applications'
});
// Compound indexes
applicationSchema.index({ jobId: 1, status: 1 });
applicationSchema.index({ candidateId: 1, jobId: 1 }, { unique: true }); // Prevent duplicate applications
applicationSchema.index({ jobId: 1, candidateId: 1, status: 1 });
applicationSchema.index({ status: 1, appliedAt: -1 });
exports.default = mongoose_1.default.model('Application', applicationSchema);
//# sourceMappingURL=Application.model.js.map