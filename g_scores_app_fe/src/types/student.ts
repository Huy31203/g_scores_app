import { IBaseModel } from '.';

export interface IStudent extends IBaseModel {
  registration_number: string;
  math: number;
  literature: number;
  foreign_language: number;
  physics: number;
  chemistry: number;
  biology: number;
  history: number;
  geography: number;
  civic_education: number;
}
