import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useParams and useNavigate
import FacultySidebar from '../../../partials/FacultySidebar';
import Header from '../../../partials/Header';
import AttendanceTable from '../../../partials/attendance/AttendanceTable';
import FacultyLectureAttendanceBanner from '../../../partials/dashboard/FacultyLectureAttendanceBanner';
import { getStudentForCurrentLecture } from '../../../apis/teacher/conductingLecture';
// Mock data for testing

function ConductingLecture() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [error, setError] = useState(null);

  const { lectureId: paramLectureId } = useParams(); // Retrieve lectureId from URL parameters
  const navigate = useNavigate();
  const lectureId = localStorage.getItem('lectureId') || paramLectureId; // Get lectureId from localStorage or URL

  useEffect(() => {
    if (!lectureId) {
      // If lectureId is not found, redirect to Conduct Lecture page
      navigate('/faculty/conduct-lecture');
    } else {
      // Fetch students if lectureId exists
      const fetchStudents = async () => {
        try {
        } catch (error) {
          console.error('Error fetching students:', error);
          setError('Failed to load students. Please try again later.');
        }
      };

      fetchStudents();
    }
  }, [lectureId, navigate]);

  //  dd lectureId and navigate as dependencies

  return (
    <div className="flex h-screen overflow-hidden">
      <FacultySidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main>
          <FacultyLectureAttendanceBanner />

          {error ? (
            <div className="p-4 text-red-500">{error}</div>
          ) : (
            <AttendanceTable />
          )}
        </main>
      </div>
    </div>
  );
}

export default ConductingLecture;
