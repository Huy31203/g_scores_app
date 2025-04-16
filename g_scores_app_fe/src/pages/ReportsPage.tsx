import { ScoreReports } from '@/components/ScoreReports';

export default function ReportsPage() {
  return (
    <div className="p-6 w-full space-y-6">
      <h1 className="text-2xl font-bold">Score Reports</h1>

      <div className="bg-card rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">Score Distribution Reports</h2>
        <ScoreReports />
      </div>
    </div>
  );
}
