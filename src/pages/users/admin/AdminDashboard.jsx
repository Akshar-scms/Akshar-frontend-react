import React, { useState } from 'react';

import AdminSidebar from '../../../partials/AdminSidebar';
import Header from '../../../partials/Header';
import AdminWelcomeBanner from '../../../partials/dashboard/AdminWelcomeBanner';
import FilterButton from '../../../components/DropdownFilter';
import Datepicker from '../../../components/Datepicker';
import DashboardCard01 from '../../../partials/dashboard/DashboardCard01';
import DashboardCard02 from '../../../partials/dashboard/DashboardCard02';
import DashboardCard03 from '../../../partials/dashboard/DashboardCard03';
import DashboardCard04 from '../../../partials/dashboard/DashboardCard04';
import DashboardCard05 from '../../../partials/dashboard/DashboardCard05';
import DashboardCard06 from '../../../partials/dashboard/DashboardCard06';
import DashboardCard07 from '../../../partials/dashboard/DashboardCard07';
import DashboardCard08 from '../../../partials/dashboard/DashboardCard08';
import DashboardCard09 from '../../../partials/dashboard/DashboardCard09';
import DashboardCard10 from '../../../partials/dashboard/DashboardCard10';
import DashboardCard11 from '../../../partials/dashboard/DashboardCard11';
import { useSelector } from 'react-redux';

function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { username, role } = useSelector((store) => store.userDetailStore);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* AdminSidebar */}
      <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            {/* Welcome banner */}
            <AdminWelcomeBanner />

            {/* Cards */}
            <div className="grid grid-cols-12 gap-6">
              {/* Line chart (Acme Plus) */}
              <DashboardCard01 />
              {/* Line chart (Acme Advanced) */}
              <DashboardCard02 />
              {/* Line chart (Acme Professional) */}
              <DashboardCard03 />
              {/* Bar chart (Direct vs Indirect) */}
              <DashboardCard04 />
              {/* Line chart (Real Time Value) */}
              <DashboardCard05 />
              {/* Doughnut chart (Top Countries) */}
              <DashboardCard06 />
              {/* Table (Top Channels) */}
              <DashboardCard07 />
              {/* Line chart (Sales Over Time) */}
              <DashboardCard08 />
              {/* Stacked bar chart (Sales VS Refunds) */}
              <DashboardCard09 />
              {/* Card (Recent Activity) */}
              <DashboardCard10 />
              {/* Card (Income/Expenses) */}
              <DashboardCard11 />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminDashboard;
