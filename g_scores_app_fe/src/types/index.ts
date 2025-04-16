export * from './student';

export interface ApiResponse<T> {
  status: number;
  message?: string;
  data: T;
}

export type IBaseModel = {
  id: string;
  created_at: Date;
  updated_at: Date;
};
