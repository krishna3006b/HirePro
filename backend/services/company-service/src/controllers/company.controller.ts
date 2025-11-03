import { Request, Response, NextFunction } from 'express';
import { CompanyService } from '../services/company.service';
import { ApiResponseHelper, asyncHandler } from '@hirepro/shared';
import { CreateCompanyInput, UpdateCompanyInput } from '../validators/company.validator';

export class CompanyController {
  private companyService: CompanyService;

  constructor() {
    this.companyService = new CompanyService();
  }

  createCompany = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const companyData: CreateCompanyInput = req.body;
    const company = await this.companyService.createCompany(companyData);
    
    res.status(201).json(
      ApiResponseHelper.success(company, 'Company created successfully')
    );
  });

  getCompanyById = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const company = await this.companyService.getCompanyById(id);
    
    res.status(200).json(
      ApiResponseHelper.success(company, 'Company retrieved successfully')
    );
  });

  getAllCompanies = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const search = req.query.search as string;
    const industry = req.query.industry as string;
    const size = req.query.size as string;
    const isActive = req.query.isActive === 'true';

    const result = await this.companyService.getAllCompanies({
      page,
      limit,
      search,
      industry,
      size,
      isActive,
    });

    res.status(200).json(
      ApiResponseHelper.paginate(
        result.companies,
        result.page,
        result.limit,
        result.total,
        'Companies retrieved successfully'
      )
    );
  });

  updateCompany = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const updateData: UpdateCompanyInput = req.body;
    const company = await this.companyService.updateCompany(id, updateData);
    
    res.status(200).json(
      ApiResponseHelper.success(company, 'Company updated successfully')
    );
  });

  deleteCompany = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    await this.companyService.deleteCompany(id);
    
    res.status(200).json(
      ApiResponseHelper.success(null, 'Company deleted successfully')
    );
  });

  getCompanyStats = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const stats = await this.companyService.getCompanyStats(id);
    
    res.status(200).json(
      ApiResponseHelper.success(stats, 'Company statistics retrieved successfully')
    );
  });
}
