'use client';

import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { studentService } from '@/services/studentService';
import { IStudent } from '@/types';
import logError from '@/utils';
import { useEffect, useState } from 'react';

export function TopStudents() {
  const [students, setStudents] = useState<IStudent[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTopStudents = async () => {
      try {
        const response = await studentService.getTopTenStudents();
        setStudents(response.data);
      } catch (error) {
        logError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTopStudents();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (students.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No top students data available.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">Rank</TableHead>
            <TableHead className="text-center">Registration No.</TableHead>
            <TableHead className="text-right">Math</TableHead>
            <TableHead className="text-right">Physics</TableHead>
            <TableHead className="text-right">Chemistry</TableHead>
            <TableHead className="text-right">Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.map((student, index) => (
            <TableRow className="text-center" key={student.registration_number}>
              <TableCell>
                {index < 3 ? (
                  <Badge
                    className={
                      index === 0
                        ? 'bg-amber-400 text-amber-950'
                        : index === 1
                        ? 'bg-slate-300 text-slate-950'
                        : 'bg-amber-700 text-amber-50'
                    }
                  >
                    {index + 1}
                  </Badge>
                ) : (
                  index + 1
                )}
              </TableCell>
              <TableCell className="text-center">
                {student.registration_number}
              </TableCell>
              <TableCell className="text-right">
                {student.subjects
                  .find((s) => s.name === 'math')
                  ?.score.toFixed(2)}
              </TableCell>
              <TableCell className="text-right">
                {student.subjects
                  .find((s) => s.name === 'physics')
                  ?.score.toFixed(2)}
              </TableCell>
              <TableCell className="text-right">
                {student.subjects
                  .find((s) => s.name === 'chemistry')
                  ?.score.toFixed(2)}
              </TableCell>
              <TableCell className="text-right font-medium">
                {student.subjects
                  .filter((s) =>
                    ['math', 'physics', 'chemistry'].includes(s.name)
                  )
                  .reduce((total, subject) => total + subject.score, 0)
                  .toFixed(2)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
