import { Company, ICompany } from '@hirepro/shared';
import { AppError } from '@hirepro/shared';
import { CreateCompanyInput, UpdateCompanyInput } from '../validators/company.validator';

interface GetAllCompaniesParams {
  page: number;
  limit: number;
  search?: string;
  industry?: string;
  size?: string;
  isActive?: boolean;
}

interface GetAllCompaniesResult {
  companies: ICompany[];
  total: number;
  page: number;
  limit: number;
}

export class CompanyService {
  async createCompany(data: CreateCompanyInput): Promise<ICompany> {
    // Check if company with same name already exists
    const existingCompany = await Company.findOne({ name: data.name });
    if (existingCompany) {
      throw new AppError('Company with this name already exists', 409);
    }

    const company = await Company.create(data);
    return company;
  }

  async getCompanyById(id: string): Promise<ICompany> {
    const company = await Company.findById(id);
    
    if (!company) {
      throw new AppError('Company not found', 404);
    }

    return company;
  }

  async getAllCompanies(params: GetAllCompaniesParams): Promise<GetAllCompaniesResult> {
    const { page, limit, search, industry, size, isActive } = params;
    const skip = (page - 1) * limit;

    // Build query
    const query: any = {};

    if (search) {
      query.$text = { $search: search };
    }

    if (industry) {
      query.industry = industry;
    }

    if (size) {
      query.size = size;
    }

    if (isActive !== undefined) {
      query.isActive = isActive;
    }

    // Execute query
    const [companies, total] = await Promise.all([
      Company.find(query)
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 }),
      Company.countDocuments(query),
    ]);

    return {
      companies,
      total,
      page,
      limit,
    };
  }

  async updateCompany(id: string, data: UpdateCompanyInput): Promise<ICompany> {
    const company = await Company.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true, runValidators: true }
    );

    if (!company) {
      throw new AppError('Company not found', 404);
    }

    return company;
  }

  async deleteCompany(id: string): Promise<void> {
    const company = await Company.findByIdAndDelete(id);

    if (!company) {
      throw new AppError('Company not found', 404);
    }
  }

  async getCompanyStats(id: string): Promise<any> {
    const company = await this.getCompanyById(id);

    // In a real application, you would aggregate data from other services
    // For now, we'll return basic stats
    const stats = {
      companyId: company._id,
      companyName: company.name,
      totalJobs: 0, // Would come from job-service
      activeJobs: 0,
      totalApplications: 0, // Would come from application data
      totalHires: 0,
      createdAt: company.createdAt,
    };

    return stats;
  }
}
