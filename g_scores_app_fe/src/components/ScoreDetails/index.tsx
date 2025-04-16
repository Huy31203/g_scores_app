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
  const subjectScores = [
    { subject: 'Math', score: student.math },
    { subject: 'Literature', score: student.literature },
    { subject: 'Foreign Language', score: student.foreign_language },
    { subject: 'Physics', score: student.physics },
    { subject: 'Chemistry', score: student.chemistry },
    { subject: 'Biology', score: student.biology },
    { subject: 'History', score: student.history },
    { subject: 'Geography', score: student.geography },
    { subject: 'Civic Education', score: student.civic_education },
  ];

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
                      {score ? score.toFixed(2) : 'Not participated'}
                    </TableCell>
                    <TableCell>
                      {score !== null && (
                        <Badge className={color}>{label}</Badge>
                      )}
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
