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
const subscriptionSchema = new mongoose_1.Schema({
    companyId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Company',
        required: true,
        unique: true,
        index: true
    },
    planName: {
        type: String,
        default: 'starter',
        enum: ['starter', 'professional', 'enterprise'],
        index: true
    },
    price: {
        type: Number,
        min: 0
    },
    currency: {
        type: String,
        default: 'USD'
    },
    startDate: {
        type: Date,
        index: true
    },
    endDate: {
        type: Date,
        index: true
    },
    autoRenew: {
        type: Boolean,
        default: true
    },
    paymentStatus: {
        type: String,
        enum: ['active', 'expired', 'pending'],
        default: 'active',
        index: true
    },
    lastInvoiceId: String,
    metadata: {
        type: mongoose_1.Schema.Types.Mixed
    }
}, {
    timestamps: true,
    collection: 'subscriptions'
});
// Indexes
subscriptionSchema.index({ paymentStatus: 1, endDate: 1 });
exports.default = mongoose_1.default.model('Subscription', subscriptionSchema);
//# sourceMappingURL=Subscription.model.js.map