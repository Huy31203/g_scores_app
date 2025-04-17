import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { IStudent } from '@/types';

type ScoreDetailsProps = {
  student: IStudent;
};

export function ScoreDetails({ student }: ScoreDetailsProps) {
  const getScoreLevel = (score: number) => {
    if (score >= 8)
      return { label: 'Excellent', color: 'bg-emerald-500 text-white' };
    if (score >= 6) return { label: 'Good', color: 'bg-violet-500 text-white' };
    if (score >= 4)
      return { label: 'Average', color: 'bg-amber-500 text-white' };
    return { label: 'Below Average', color: 'bg-red-500 text-white' };
  };

  // Get all subject scores from the student object
  const subjectMapping = [
    { display: 'Math', key: 'math' },
    { display: 'Literature', key: 'literature' },
    { display: 'Foreign Language', key: 'foreign_language' },
    { display: 'Physics', key: 'physics' },
    { display: 'Chemistry', key: 'chemistry' },
    { display: 'Biology', key: 'biology' },
    { display: 'History', key: 'history' },
    { display: 'Geography', key: 'geography' },
    { display: 'Civic Education', key: 'civic_education' },
  ];

  const subjectScores = subjectMapping.map(({ display, key }) => ({
    subject: display,
    score: student.subjects.find((s) => s.name === key)?.score ?? 0,
  }));

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Student Information</CardTitle>
          <CardDescription>
            Registration Number: {student.registration_number}
          </CardDescription>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Subject Scores</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Subject</TableHead>
                <TableHead>Score</TableHead>
                <TableHead>Level</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {subjectScores.map(({ subject, score }) => {
                const { label, color } = getScoreLevel(score);
                return (
                  <TableRow key={subject}>
                    <TableCell className="font-medium">{subject}</TableCell>
                    <TableCell>
                      {score > 0 ? score.toFixed(2) : 'Not participated'}
                    </TableCell>
                    <TableCell>
                      {score > 0 && <Badge className={color}>{label}</Badge>}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
