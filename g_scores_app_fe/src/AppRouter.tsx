import { Route, Routes } from 'react-router-dom';
import { router } from './contants/router';
import DashboardPage from './pages/DashboardPage';
import ReportsPage from './pages/ReportsPage';
import SearchPage from './pages/SearchPage';

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path={router.search} element={<SearchPage />} />
      <Route path={router.reports} element={<ReportsPage />} />
    </Routes>
  );
}
