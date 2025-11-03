import api from '@/lib/axios';
import { Application, ApiResponse } from '@/types';

export const applicationService = {
  getMyApplications: async (filters?: { status?: string; page?: number; limit?: number }) => {
    const response = await api.get<ApiResponse<{
      applications: Application[];
      pagination: any;
    }>>('/applications/my-applications', { params: filters });
    return response.data.data!;
  },

  getApplicationById: async (id: string) => {
    const response = await api.get<ApiResponse<{ application: Application }>>(`/applications/${id}`);
    return response.data.data!.application;
  },

  withdrawApplication: async (id: string) => {
    const response = await api.put(`/applications/${id}/withdraw`);
    return response.data;
  },
};
