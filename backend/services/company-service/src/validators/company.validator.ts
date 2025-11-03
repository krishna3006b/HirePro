import { z } from 'zod';

export const createCompanySchema = z.object({
  body: z.object({
    name: z.string().min(2, 'Company name must be at least 2 characters'),
    industry: z.string().min(2, 'Industry is required'),
    size: z.enum(['1-10', '11-50', '51-200', '201-500', '501-1000', '1000+']),
    website: z.string().url('Invalid website URL').optional(),
    description: z.string().optional(),
    logo: z.string().url('Invalid logo URL').optional(),
    address: z.object({
      street: z.string().optional(),
      city: z.string(),
      state: z.string(),
      country: z.string(),
      zipCode: z.string().optional(),
    }).optional(),
    socialLinks: z.object({
      linkedin: z.string().url().optional(),
      twitter: z.string().url().optional(),
      facebook: z.string().url().optional(),
    }).optional(),
  }),
});

export const updateCompanySchema = z.object({
  body: z.object({
    name: z.string().min(2).optional(),
    industry: z.string().min(2).optional(),
    size: z.enum(['1-10', '11-50', '51-200', '201-500', '501-1000', '1000+']).optional(),
    website: z.string().url().optional(),
    description: z.string().optional(),
    logo: z.string().url().optional(),
    address: z.object({
      street: z.string().optional(),
      city: z.string().optional(),
      state: z.string().optional(),
      country: z.string().optional(),
      zipCode: z.string().optional(),
    }).optional(),
    socialLinks: z.object({
      linkedin: z.string().url().optional(),
      twitter: z.string().url().optional(),
      facebook: z.string().url().optional(),
    }).optional(),
    settings: z.object({
      allowPublicJobs: z.boolean().optional(),
      requireApproval: z.boolean().optional(),
      emailNotifications: z.boolean().optional(),
    }).optional(),
  }),
});

export const companyIdSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid company ID'),
  }),
});

export type CreateCompanyInput = z.infer<typeof createCompanySchema>['body'];
export type UpdateCompanyInput = z.infer<typeof updateCompanySchema>['body'];
