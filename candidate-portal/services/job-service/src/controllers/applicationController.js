import Application from "../models/Application.js";
import Job from "../models/Job.js";
import logger from "../utils/logger.js";

// @desc    Apply for a job
// @route   POST /api/jobs/:id/apply
// @access  Private (Candidate)
export const applyForJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const candidateId = req.candidate.id;

    // Check if job exists and is open
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found"
      });
    }

    if (job.status !== "open") {
      return res.status(400).json({
        success: false,
        message: "This job is no longer accepting applications"
      });
    }

    // Check if deadline has passed
    if (job.deadline && new Date(job.deadline) < new Date()) {
      return res.status(400).json({
        success: false,
        message: "Application deadline has passed"
      });
    }

    // Check if already applied
    const existingApplication = await Application.findOne({
      jobId,
      candidateId
    });

    if (existingApplication) {
      return res.status(409).json({
        success: false,
        message: "You have already applied for this job"
      });
    }

    // Get candidate info from request body (sent from frontend)
    const { candidateInfo, coverLetter, customAnswers } = req.body;

    // Create application
    const application = await Application.create({
      jobId,
      candidateId,
      candidateInfo,
      coverLetter,
      customAnswers,
      source: req.body.source || "direct"
    });

    // Update job stats
    await Job.findByIdAndUpdate(jobId, {
      $inc: { "stats.applications": 1 }
    });

    logger.info(`New application: Candidate ${candidateId} applied for job ${jobId}`);

    res.status(201).json({
      success: true,
      message: "Application submitted successfully",
      data: { application }
    });

  } catch (error) {
    logger.error("Apply for job error:", error);
    res.status(500).json({
      success: false,
      message: "Error submitting application"
    });
  }
};

// @desc    Get candidate's applications
// @route   GET /api/applications/my-applications
// @access  Private (Candidate)
export const getMyApplications = async (req, res) => {
  try {
    const candidateId = req.candidate.id;
    const { status, page = 1, limit = 10 } = req.query;

    // Build query
    const query = { candidateId };
    if (status) {
      query.status = status;
    }

    // Pagination
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    // Get applications with job details
    const applications = await Application.find(query)
      .populate("jobId", "title companyName companyLogo location workMode employmentType status")
      .sort({ appliedAt: -1 })
      .skip(skip)
      .limit(limitNum)
      .lean();

    const total = await Application.countDocuments(query);

    res.status(200).json({
      success: true,
      data: {
        applications,
        pagination: {
          currentPage: pageNum,
          totalPages: Math.ceil(total / limitNum),
          totalApplications: total,
          applicationsPerPage: limitNum
        }
      }
    });

  } catch (error) {
    logger.error("Get my applications error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching applications"
    });
  }
};

// @desc    Get single application details
// @route   GET /api/applications/:id
// @access  Private (Candidate)
export const getApplicationById = async (req, res) => {
  try {
    const candidateId = req.candidate.id;
    const applicationId = req.params.id;

    const application = await Application.findOne({
      _id: applicationId,
      candidateId
    }).populate("jobId");

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found"
      });
    }

    res.status(200).json({
      success: true,
      data: { application }
    });

  } catch (error) {
    logger.error("Get application by ID error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching application details"
    });
  }
};

// @desc    Withdraw application
// @route   PUT /api/applications/:id/withdraw
// @access  Private (Candidate)
export const withdrawApplication = async (req, res) => {
  try {
    const candidateId = req.candidate.id;
    const applicationId = req.params.id;

    const application = await Application.findOne({
      _id: applicationId,
      candidateId
    });

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found"
      });
    }

    // Check if application can be withdrawn
    if (["hired", "rejected", "withdrawn"].includes(application.status)) {
      return res.status(400).json({
        success: false,
        message: "Cannot withdraw this application"
      });
    }

    application.status = "withdrawn";
    application.isActive = false;
    await application.save();

    // Update job stats
    await Job.findByIdAndUpdate(application.jobId, {
      $inc: { "stats.applications": -1 }
    });

    res.status(200).json({
      success: true,
      message: "Application withdrawn successfully"
    });

  } catch (error) {
    logger.error("Withdraw application error:", error);
    res.status(500).json({
      success: false,
      message: "Error withdrawing application"
    });
  }
};
