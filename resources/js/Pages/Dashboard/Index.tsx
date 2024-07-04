import { Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import { Menu } from '@/types';

function DashboardPage() {
  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">Dashboard</h1>
      <p className="mb-12 leading-normal">Coming Soon....</p>
    </div>
  );
}

/**
 * Persistent Layout (Inertia.js)
 *
 * [Learn more](https://inertiajs.com/pages#persistent-layouts)
 */
// DashboardPage.layout = (page: React.ReactNode, menus:Menu[]) => (
//   <MainLayout title="Dashboard" children={page} menus= {menus} />
// );

export default DashboardPage;
