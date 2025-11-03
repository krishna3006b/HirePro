import api from '@/lib/axios';
import { Job, JobFilters, FilterOptions, ApiResponse } from '@/types';

export const jobService = {
  getJobs: async (filters?: JobFilters) => {
    const response = await api.get<ApiResponse<{
      jobs: Job[];
      pagination: {
        currentPage: number;
        totalPages: number;
        totalJobs: number;
        jobsPerPage: number;
        hasNextPage: boolean;
        hasPrevPage: boolean;
      };
    }>>('/jobs', { params: filters });
    return response.data.data!;
  },

  getJobById: async (id: string) => {
    const response = await api.get<ApiResponse<{ job: Job }>>(`/jobs/${id}`);
    return response.data.data!.job;
  },

  searchJobs: async (query: string) => {
    const response = await api.get<ApiResponse<{ jobs: Job[] }>>('/jobs/search', {
      params: { q: query },
    });
    return response.data.data!.jobs;
  },

  getFilters: async () => {
    const response = await api.get<ApiResponse<FilterOptions>>('/jobs/filters');
    return response.data.data!;
  },

  applyForJob: async (jobId: string, applicationData: any) => {
    const response = await api.post(`/jobs/${jobId}/apply`, applicationData);
    return response.data;
  },
};
