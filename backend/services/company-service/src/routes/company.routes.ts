import { Router } from 'express';
import { CompanyController } from '../controllers/company.controller';
import { validate } from '@hirepro/shared';
import { authenticate, authorize } from '@hirepro/shared';
import { createCompanySchema, updateCompanySchema, companyIdSchema } from '../validators/company.validator';

const router = Router();
const companyController = new CompanyController();

// Public routes
router.get('/', companyController.getAllCompanies);
router.get('/:id', validate(companyIdSchema), companyController.getCompanyById);

// Protected routes (require authentication)
router.post(
  '/',
  authenticate,
  authorize('admin', 'hr_manager'),
  validate(createCompanySchema),
  companyController.createCompany
);

router.put(
  '/:id',
  authenticate,
  authorize('admin', 'hr_manager'),
  validate(companyIdSchema),
  validate(updateCompanySchema),
  companyController.updateCompany
);

router.delete(
  '/:id',
  authenticate,
  authorize('admin'),
  validate(companyIdSchema),
  companyController.deleteCompany
);

router.get(
  '/:id/stats',
  authenticate,
  authorize('admin', 'hr_manager'),
  validate(companyIdSchema),
  companyController.getCompanyStats
);

export default router;
