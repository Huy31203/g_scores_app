import { IScoreRange } from '@/types/report';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  YAxis,
} from 'recharts';

type ScoreDistributionChartProps = {
  scoreRange: IScoreRange;
  subject: string;
};

export function ScoreDistributionChart({
  scoreRange,
  subject,
}: ScoreDistributionChartProps) {
  const data = [
    {
      name: 'Below Average (<4)',
      value: scoreRange['level_4'],
      fill: '#ef4444', // red-500
    },
    {
      name: 'Average (4-6)',
      value: scoreRange['level_3'],
      fill: '#f59e0b', // amber-500
    },
    {
      name: 'Good (6-8)',
      value: scoreRange['level_2'],
      fill: '#8b5cf6', // violet-500
    },
    {
      name: 'Excellent (≥8)',
      value: scoreRange['level_1'],
      fill: '#10b981', // emerald-500
    },
  ];

  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <YAxis fontSize={14} />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" name={`Number of Students - ${subject}`} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
