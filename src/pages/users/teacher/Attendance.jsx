import React, { useState } from 'react';

import FacultySidebar from '../../../partials/FacultySidebar';
import Header from '../../../partials/Header';
import AttendanceTable from '../../../partials/attendance/AttendanceTable';

function TeacherDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* FacultySidebar */}
      <FacultySidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <div className=" gap-6">
              <AttendanceTable />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default TeacherDashboard;
