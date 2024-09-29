import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Import useParams
import StudentSidebar from "../../../partials/StudentSidebar";
import Header from "../../../partials/Header";
import LectureTable from "../../../partials/lecture/LectureTable.jsx";
import { useSelector } from "react-redux";

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
          <LectureTable />
        </main>
      </div>
    </div>
  );
}

export default AttendLecture;
