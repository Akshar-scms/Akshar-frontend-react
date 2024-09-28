import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AttendanceTableItem from './AttendanceTableItem';
import DoughnutChart from '../../charts/DoughnutChart';
import {
  getStudentForCurrentLecture,
  markAttendence,
} from '../../apis/teacher/conductingLecture';

function AttendanceTable({ selectedItems }) {
  const [attendanceList, setAttendanceList] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const lectureId = localStorage.getItem('lectureId');
        const response = await getStudentForCurrentLecture({ id: lectureId });
        setAttendanceList(response.body.studentList);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    fetchStudents();
  }, []);

  // Handle status change for each student
  const handleStatusChange = async (id, newStatus) => {
    setAttendanceList((prevList) =>
      prevList.map((student) =>
        student.id === id
          ? { ...student, attendanceStatus: newStatus }
          : student
      )
    );
    const response = await markAttendence({
      id,
      attendanceStatus: newStatus,
    });
    console.log(response);
  };

  const presentCount = attendanceList.filter(
    (attendance) => attendance.attendanceStatus === 'Present'
  ).length;
  const absentCount = attendanceList.filter(
    (attendance) => attendance.attendanceStatus === 'Absent'
  ).length;

  const chartData = {
    labels: ['Present', 'Absent'],
    datasets: [
      {
        label: 'My Dataset',
        data: [presentCount, absentCount],
        backgroundColor: ['#FF6384', '#36A2EB'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="bg-white shadow-lg rounded-sm border border-slate-200 relative">
      <header className="px-3 py-4">
        <h2 className="font-semibold text-slate-800">Attendances </h2>
      </header>

      <div>
        <div style={{ position: 'absolute', top: '-200px', left: '55%' }}>
          {/* Fix: Correct usage of DoughnutChart component */}
          <DoughnutChart data={chartData} width={120} height={120} />
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            {/* Table header */}
            <thead className="text-xs font-semibold uppercase text-slate-500 bg-slate-50 border-t border-b border-slate-200">
              <tr>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Enrollment no.</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Name</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Status</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">
                    Manual Attendance
                  </div>
                </th>
              </tr>
            </thead>

            {/* Table body */}
            <tbody className="text-sm divide-y divide-slate-200">
              {attendanceList.map((attendance) => {
                return (
                  <AttendanceTableItem
                    key={attendance.id}
                    id={attendance.id}
                    enrollmentNo={attendance.enrollmentNumber}
                    name={attendance.firstName}
                    status={attendance.attendanceStatus}
                    onStatusChange={handleStatusChange}
                    attendanceId={attendance.attendanceId} // Pass the handler to child
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AttendanceTable;
