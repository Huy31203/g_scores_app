export * from './report';
export * from './student';
export * from './subject';

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
