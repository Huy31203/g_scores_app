import { IBaseModel, ISubject } from '.';

export interface IStudent extends IBaseModel {
  registration_number: string;
  subjects: ISubject[];
  total_group_a_score: number;
}
