import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams
import StudentSidebar from '../../../partials/StudentSidebar';
import Header from '../../../partials/Header';
import LectureTable from '../../../partials/lecture/LectureTable.jsx';

// Mock data for testing
const mockLectures = [
  {
    id: 1,
    name: 'ITH',
    date: '2024-01-01',
    time: '10:00 AM',
    teacher: 'Dr. John Doe',
    status: 'In Progress',
    Homework: true,
    Notes: false,
  },
  {
    id: 2,
    name: 'FOS',
    date: '2024-01-01',
    time: '10:00 AM',
    teacher: 'Dr. Michal Moe',
    status: 'Completed',
    Homework: true,
    Notes: true,
  },
  {
    id: 3,
    name: 'CNS',
    date: '2024-01-01',
    time: '10:00 AM',
    teacher: 'Dr. John Doe',
    status: 'In Progress',
    Homework: false,
    Notes: true,
  },
  {
    id: 4,
    name: 'MTH',
    date: '2024-01-01',
    time: '10:00 AM',
    status: 'Completed',
    teacher: 'Dr. Vansh Vora',
    Homework: true,
    Notes: false,
  },
  {
    id: 5,
    name: 'PHY',
    date: '2024-01-01',
    time: '10:00 AM',
    teacher: 'Dr. Vansh Vora',
    status: 'In Progress',
    Homework: false,
    Notes: true,
  },
];

function AttendLecture() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      <StudentSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main>
          <LectureTable initialLectures={mockLectures} />
        </main>
      </div>
    </div>
  );
}

export default AttendLecture;
