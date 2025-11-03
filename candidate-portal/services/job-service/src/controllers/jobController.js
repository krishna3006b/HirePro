import Job from "../models/Job.js";
import logger from "../utils/logger.js";

// @desc    Get all jobs with filters and pagination
// @route   GET /api/jobs
// @access  Public
export const getJobs = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search,
      workMode,
      employmentType,
      location,
      skills,
      minSalary,
      maxSalary,
      experienceMin,
      experienceMax,
      sortBy = "createdAt",
      sortOrder = "desc"
    } = req.query;

    // Build query
    const query = {
      status: "open",
      isActive: true,
      $or: [
        { deadline: { $gte: new Date() } },
        { deadline: { $exists: false } }
      ]
    };

    // Search in title and description
    if (search) {
      query.$text = { $search: search };
    }

    // Filter by work mode
    if (workMode) {
      query.workMode = { $in: workMode.split(",") };
    }

    // Filter by employment type
    if (employmentType) {
      query.employmentType = { $in: employmentType.split(",") };
    }

    // Filter by location
    if (location) {
      query["location.city"] = new RegExp(location, "i");
    }

    // Filter by skills
    if (skills) {
      const skillsArray = skills.split(",").map(s => s.trim().toLowerCase());
      query.skillsRequired = { $in: skillsArray };
    }

    // Filter by salary range
    if (minSalary || maxSalary) {
      query["salaryRange.min"] = {};
      if (minSalary) query["salaryRange.min"].$gte = parseInt(minSalary);
      if (maxSalary) query["salaryRange.max"].$lte = parseInt(maxSalary);
    }

    // Filter by experience
    if (experienceMin !== undefined || experienceMax !== undefined) {
      if (experienceMin) query["experienceRequired.min"].$lte = parseInt(experienceMin);
      if (experienceMax) query["experienceRequired.max"].$gte = parseInt(experienceMax);
    }

    // Pagination
    const pageNum = parseInt(page);
    const limitNum = Math.min(parseInt(limit), parseInt(process.env.MAX_PAGE_SIZE) || 50);
    const skip = (pageNum - 1) * limitNum;

    // Sorting
    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === "asc" ? 1 : -1;

    // Execute query
    const jobs = await Job.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(limitNum)
      .select("-__v")
      .lean();

    // Get total count for pagination
    const total = await Job.countDocuments(query);

    res.status(200).json({
      success: true,
      data: {
        jobs,
        pagination: {
          currentPage: pageNum,
          totalPages: Math.ceil(total / limitNum),
          totalJobs: total,
          jobsPerPage: limitNum,
          hasNextPage: pageNum < Math.ceil(total / limitNum),
          hasPrevPage: pageNum > 1
        }
      }
    });

  } catch (error) {
    logger.error("Get jobs error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching jobs"
    });
  }
};

// @desc    Get single job by ID
// @route   GET /api/jobs/:id
// @access  Public
export const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found"
      });
    }

    // Increment view count
    await Job.findByIdAndUpdate(req.params.id, {
      $inc: { "stats.views": 1 }
    });

    res.status(200).json({
      success: true,
      data: { job }
    });

  } catch (error) {
    logger.error("Get job by ID error:", error);
    
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid job ID"
      });
    }

    res.status(500).json({
      success: false,
      message: "Error fetching job details"
    });
  }
};

// @desc    Search jobs
// @route   GET /api/jobs/search
// @access  Public
export const searchJobs = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q || q.trim().length < 2) {
      return res.status(400).json({
        success: false,
        message: "Search query must be at least 2 characters"
      });
    }

    const jobs = await Job.find({
      $text: { $search: q },
      status: "open",
      isActive: true
    })
      .limit(20)
      .select("title companyName location workMode employmentType salaryRange")
      .lean();

    res.status(200).json({
      success: true,
      data: { jobs }
    });

  } catch (error) {
    logger.error("Search jobs error:", error);
    res.status(500).json({
      success: false,
      message: "Error searching jobs"
    });
  }
};

// @desc    Get unique filters data
// @route   GET /api/jobs/filters
// @access  Public
export const getFilters = async (req, res) => {
  try {
    const [locations, skills, companies] = await Promise.all([
      Job.distinct("location.city", { status: "open", isActive: true }),
      Job.distinct("skillsRequired", { status: "open", isActive: true }),
      Job.distinct("companyName", { status: "open", isActive: true })
    ]);

    res.status(200).json({
      success: true,
      data: {
        locations: locations.filter(Boolean).sort(),
        skills: skills.filter(Boolean).sort(),
        companies: companies.filter(Boolean).sort(),
        workModes: ["remote", "onsite", "hybrid"],
        employmentTypes: ["full-time", "part-time", "contract", "intern"]
      }
    });

  } catch (error) {
    logger.error("Get filters error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching filter options"
    });
  }
};
