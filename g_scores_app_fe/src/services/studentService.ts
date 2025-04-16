import { API_URL } from '@/contants/endpoint';
import { ApiResponse, IStudent } from '@/types';
import apiClient from './apiClient';

export const studentService = {
  async getStudentByRegistration(
    registration_number: string
  ): Promise<ApiResponse<IStudent>> {
    return await apiClient.get(`${API_URL.STUDENTS}/${registration_number}`);
  },

  async getTopTenStudents(): Promise<ApiResponse<IStudent[]>> {
    return await apiClient.get(`${API_URL.STUDENTS}/top_ten`);
  },
};
