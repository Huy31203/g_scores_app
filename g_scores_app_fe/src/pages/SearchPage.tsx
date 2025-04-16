import { ScoreDetails } from '@/components/ScoreDetails';
import { SearchForm } from '@/components/SearchForm';
import { IStudent } from '@/types';
import { useState } from 'react';

export default function SearchPage() {
  const [student, setStudent] = useState<IStudent | null>(null);

  return (
    <div className="p-6 w-full space-y-6">
      <h1 className="text-2xl font-bold">Search Scores</h1>

      <div className="bg-card rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">Student Score Lookup</h2>
        <SearchForm onStudentFound={setStudent} />
      </div>

      {student && (
        <div className="bg-card rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Score Details</h2>
          <ScoreDetails student={student} />
        </div>
      )}
    </div>
  );
}
