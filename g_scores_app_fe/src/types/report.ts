export interface IScoreRange {
  level_1: number;
  level_2: number;
  level_3: number;
  level_4: number;
}

export interface IReport {
  math: IScoreRange;
  literature: IScoreRange;
  foreign_language: IScoreRange;
  physics: IScoreRange;
  chemistry: IScoreRange;
  biology: IScoreRange;
  history: IScoreRange;
  geography: IScoreRange;
  civic_education: IScoreRange;
}
