import { API_URL } from '@/contants/endpoint';
import { ApiResponse } from '@/types';
import { IReport } from '@/types/report';
import apiClient from './apiClient';

export const reportService = {
  async getScoreReports(): Promise<ApiResponse<IReport>> {
    return await apiClient.get(`${API_URL.REPORTS}/scores`);
  },
};
