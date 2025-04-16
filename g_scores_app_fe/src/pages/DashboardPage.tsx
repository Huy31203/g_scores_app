import { TopStudents } from '@/components/TopStudents';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../components/ui/card';

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6 w-full">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <div className="w-full">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Top 10 Students (Group A)</CardTitle>
            <CardDescription>Math, Physics, Chemistry</CardDescription>
          </CardHeader>
          <CardContent className="w-full">
            <TopStudents />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
