Perfect 🔥 — Let’s convert your **HireFlow AI database schema** into **production-ready Node.js Mongoose models**, designed for scalability, clarity, and modularity.

We’ll use **Mongoose 7+**, follow **best schema practices (timestamps, indexing, enums, refs)**, and ensure it’s **ready for AI integrations** later.

---

# 🧠 HireFlow AI – Mongoose Schema Setup

Let’s assume you’re using:

```bash
npm install mongoose
```

And your project structure:

```
/models
  company.model.js
  user.model.js
  job.model.js
  candidate.model.js
  application.model.js
  resumeAnalysis.model.js
  interview.model.js
  interviewTranscript.model.js
  assessment.model.js
  communication.model.js
  notification.model.js
  report.model.js
  subscription.model.js
  apiIntegration.model.js
  auditLog.model.js
```

---

## 1. **Company Schema**

```js
import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  domain: String,
  website: String,
  logoUrl: String,
  description: String,
  subscriptionPlan: { type: String, default: "starter" },
  settings: { type: mongoose.Schema.Types.Mixed, default: {} },
}, { timestamps: true });

export default mongoose.model("Company", companySchema);
```

---

## 2. **User (HR) Schema**

```js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: "Company", required: true },
  fullName: { type: String, required: true },
  email: { type: String, unique: true, required: true, lowercase: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ["admin", "recruiter", "interviewer"], default: "recruiter" },
  permissions: { type: mongoose.Schema.Types.Mixed, default: {} },
  lastLogin: Date,
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

userSchema.index({ companyId: 1, email: 1 });

export default mongoose.model("User", userSchema);
```

---

## 3. **Job Schema**

```js
import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: "Company", required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: { type: String, required: true },
  description: String,
  requirements: String,
  skillsRequired: [String],
  salaryRange: { type: Object },
  location: String,
  workMode: { type: String, enum: ["remote", "onsite", "hybrid"] },
  employmentType: { type: String, enum: ["full-time", "part-time", "intern"] },
  deadline: Date,
  status: { type: String, enum: ["open", "closed", "paused"], default: "open" },
  totalPositions: { type: Number, default: 1 },
  closedAt: Date,
}, { timestamps: true });

jobSchema.index({ companyId: 1, status: 1 });

export default mongoose.model("Job", jobSchema);
```

---

## 4. **Candidate Schema**

```js
import mongoose from "mongoose";

const candidateSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, lowercase: true },
  phone: String,
  resumeUrl: String,
  linkedinUrl: String,
  portfolioUrl: String,
  skills: [String],
  experienceYears: Number,
  education: String,
  source: { type: String, enum: ["website", "referral", "upload_by_hr"] },
}, { timestamps: true });

candidateSchema.index({ email: 1 });

export default mongoose.model("Candidate", candidateSchema);
```

---

## 5. **Application Schema**

```js
import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
  candidateId: { type: mongoose.Schema.Types.ObjectId, ref: "Candidate", required: true },
  status: { 
    type: String, 
    enum: ["applied", "shortlisted", "interview_scheduled", "rejected", "hired"],
    default: "applied"
  },
  resumeScore: Number,
  notes: String,
  currentStage: { type: String, default: "resume_round" },
  isActive: { type: Boolean, default: true },
}, { timestamps: { createdAt: "appliedAt", updatedAt: true } });

applicationSchema.index({ jobId: 1, status: 1 });

export default mongoose.model("Application", applicationSchema);
```

---

## 6. **Resume Analysis Schema**

```js
import mongoose from "mongoose";

const resumeAnalysisSchema = new mongoose.Schema({
  applicationId: { type: mongoose.Schema.Types.ObjectId, ref: "Application", required: true },
  parsedData: { type: mongoose.Schema.Types.Mixed },
  skillMatchScore: Number,
  experienceRelevanceScore: Number,
  educationAlignmentScore: Number,
  overallScore: Number,
  autoRecommendation: { type: String, enum: ["advance", "review", "reject"] },
  analysisCompletedAt: { type: Date, default: Date.now }
});

export default mongoose.model("ResumeAnalysis", resumeAnalysisSchema);
```

---

## 7. **Interview Schema**

```js
import mongoose from "mongoose";

const interviewSchema = new mongoose.Schema({
  applicationId: { type: mongoose.Schema.Types.ObjectId, ref: "Application", required: true },
  type: { type: String, enum: ["ai", "human"], required: true },
  scheduledAt: Date,
  conductedAt: Date,
  durationMinutes: Number,
  interviewerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  aiAgentId: String,
  aiScore: Number,
  humanScore: Number,
  sentimentScore: Number,
  communicationScore: Number,
  confidenceScore: Number,
  status: { type: String, enum: ["pending", "completed", "failed"], default: "pending" },
  feedback: String,
  reportUrl: String
}, { timestamps: true });

export default mongoose.model("Interview", interviewSchema);
```

---

## 8. **Interview Transcript Schema**

```js
import mongoose from "mongoose";

const interviewTranscriptSchema = new mongoose.Schema({
  interviewId: { type: mongoose.Schema.Types.ObjectId, ref: "Interview", required: true },
  timestamp: { type: Date, default: Date.now },
  speaker: { type: String, enum: ["ai", "candidate"] },
  content: String,
  sentimentScore: Number,
  keywords: [String],
  durationSeconds: Number
});

export default mongoose.model("InterviewTranscript", interviewTranscriptSchema);
```

---

## 9. **Assessment Schema**

```js
import mongoose from "mongoose";

const assessmentSchema = new mongoose.Schema({
  applicationId: { type: mongoose.Schema.Types.ObjectId, ref: "Application", required: true },
  assessmentType: { type: String, enum: ["coding", "mcq", "system_design"] },
  startedAt: Date,
  completedAt: Date,
  score: Number,
  resultStatus: { type: String, enum: ["passed", "failed", "flagged"] },
  details: { type: mongoose.Schema.Types.Mixed },
  proctoringFlags: { type: mongoose.Schema.Types.Mixed },
}, { timestamps: true });

export default mongoose.model("Assessment", assessmentSchema);
```

---

## 10. **Communication Schema**

```js
import mongoose from "mongoose";

const communicationSchema = new mongoose.Schema({
  applicationId: { type: mongoose.Schema.Types.ObjectId, ref: "Application", required: true },
  type: { type: String, enum: ["email", "sms", "in_app"], required: true },
  subject: String,
  content: String,
  sentAt: { type: Date, default: Date.now },
  status: { type: String, enum: ["sent", "failed"], default: "sent" },
  channelMetadata: { type: mongoose.Schema.Types.Mixed }
});

export default mongoose.model("Communication", communicationSchema);
```

---

## 11. **Notification Schema**

```js
import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  candidateId: { type: mongoose.Schema.Types.ObjectId, ref: "Candidate" },
  message: { type: String, required: true },
  category: { type: String, enum: ["job_update", "interview", "system"] },
  isRead: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model("Notification", notificationSchema);
```

---

## 12. **Report Schema**

```js
import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: "Company", required: true },
  type: { type: String, enum: ["hiring_trend", "bias_detection", "time_to_hire"] },
  data: { type: mongoose.Schema.Types.Mixed },
}, { timestamps: { createdAt: "generatedAt", updatedAt: true } });

export default mongoose.model("Report", reportSchema);
```

---

## 13. **Subscription Schema**

```js
import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: "Company", required: true },
  planName: { type: String, default: "starter" },
  price: Number,
  currency: { type: String, default: "USD" },
  startDate: Date,
  endDate: Date,
  autoRenew: { type: Boolean, default: true },
  paymentStatus: { type: String, enum: ["active", "expired", "pending"], default: "active" },
  lastInvoiceId: String,
  metadata: { type: mongoose.Schema.Types.Mixed }
}, { timestamps: true });

export default mongoose.model("Subscription", subscriptionSchema);
```

---

## 14. **API Integration Schema**

```js
import mongoose from "mongoose";

const apiIntegrationSchema = new mongoose.Schema({
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: "Company", required: true },
  serviceName: String,
  apiKey: String,
  config: { type: mongoose.Schema.Types.Mixed },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.model("ApiIntegration", apiIntegrationSchema);
```

---

## 15. **Audit Log Schema**

```js
import mongoose from "mongoose";

const auditLogSchema = new mongoose.Schema({
  entityType: { type: String, required: true },
  entityId: { type: mongoose.Schema.Types.ObjectId },
  action: { type: String, required: true },
  performedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  details: { type: mongoose.Schema.Types.Mixed },
  ipAddress: String,
}, { timestamps: true });

auditLogSchema.index({ entityType: 1, createdAt: -1 });

export default mongoose.model("AuditLog", auditLogSchema);
```

---

# ⚙️ Notes

✅ Every model has:

* `timestamps: true` for `createdAt` & `updatedAt`
* Proper `ref` linking for population
* Enum constraints where applicable
* JSON-flexible `Mixed` fields for AI, configs, or metadata
* Indexes for fast queries

---

Would you like me to next:

1. 🧩 Create **relationship-level population examples (aggregate + populate pipelines)**, or
2. 🚀 Show **API routes + controller structure** for this schema (like Job posting, Candidate applying, AI Interview trigger flow)?