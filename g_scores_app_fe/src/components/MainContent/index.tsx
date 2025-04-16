'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { IStudent } from '@/types/student';
import { useState } from 'react';
import { ScoreDetails } from '../ScoreDetails';
import { ScoreReports } from '../ScoreReports';
import { SearchForm } from '../SearchForm';
import { TopStudents } from '../TopStudents';

export function MainContent() {
  const [activeTab, setActiveTab] = useState('search');
  const [student, setStudent] = useState<IStudent | null>(null);

  return (
    <main className="flex-1 p-6 overflow-auto">
      <div className="max-w-6xl mx-auto">
        <Tabs
          defaultValue="search"
          value={activeTab}
          onValueChange={setActiveTab}
        >
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="search">Search Scores</TabsTrigger>
            <TabsTrigger value="reports">Score Reports</TabsTrigger>
            <TabsTrigger value="top">Top Students</TabsTrigger>
          </TabsList>

          <TabsContent value="search" className="space-y-6">
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
          </TabsContent>

          <TabsContent value="reports">
            <div className="bg-card rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-4">
                Score Distribution Reports
              </h2>
              <ScoreReports />
            </div>
          </TabsContent>

          <TabsContent value="top">
            <div className="bg-card rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-4">
                Top 10 Students (Group A)
              </h2>
              <TopStudents />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
