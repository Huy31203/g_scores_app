import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { reportService } from '@/services/reportService';
import { IReport } from '@/types/report';
import logError from '@/utils';
import { useEffect, useState } from 'react';
import { ScoreDistributionChart } from '../ScoreDistributionChart';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

const subjectLabels: Record<keyof IReport, string> = {
  math: 'Mathematics',
  literature: 'Literature',
  foreign_language: 'Foreign Language',
  physics: 'Physics',
  chemistry: 'Chemistry',
  biology: 'Biology',
  history: 'History',
  geography: 'Geography',
  civic_education: 'Civic Education',
};

export function ScoreReports() {
  const [report, setReport] = useState<IReport | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<keyof IReport | null>(
    null
  );

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await reportService.getScoreReports();
        setReport(res.data);

        const subjects = Object.keys(res.data) as Array<keyof IReport>;
        if (subjects.length > 0) {
          setSelectedSubject(subjects[0]);
        }
      } catch (error) {
        logError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReports();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!report) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No report data available.</p>
      </div>
    );
  }

  const subjects = Object.keys(report) as Array<keyof IReport>;

  return (
    <div className="space-y-6">
      <div className="w-full max-w-xs">
        <Select
          value={selectedSubject ?? undefined}
          onValueChange={(value) => setSelectedSubject(value as keyof IReport)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a subject" />
          </SelectTrigger>
          <SelectContent>
            {subjects.map((subject) => (
              <SelectItem key={subject} value={subject}>
                {subjectLabels[subject]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {selectedSubject && (
        <Card>
          <CardHeader>
            <CardTitle>
              {subjectLabels[selectedSubject]} Score Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScoreDistributionChart
              scoreRange={report[selectedSubject]}
              subject={subjectLabels[selectedSubject]}
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
