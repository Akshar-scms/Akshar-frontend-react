import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import './css/style.css';

import './charts/ChartjsConfig';

import Herosection from './pages/Herosection';
import AdminAnalytics from './pages/users/admin/AdminAnalytics';
import PageNotFound from './pages/utility/PageNotFound';
import Signin from './pages/Signin';
import AdminRoutes from './pages/component/auth/AdminRoutes';
import StudentRoutes from './pages/component/auth/StudentRoutes';
import TeacherRoutes from './pages/component/auth/TeacherRoutes';
import AdminDashboard from './pages/users/admin/AdminDashboard';
import StudentDashboard from './pages/users/student/StudentDashboard';
import TeacherDashboard from './pages/users/teacher/TeacherDashboard';
import ManageDepartments from './pages/users/admin/ManageDepartments';
import ConductLecture from './pages/users/teacher/ConductLecture';
import ConductingLecture from './pages/users/teacher/ConductingLecture';
import AttendLecture from './pages/users/student/AttendLecture.jsx';
import ClassRoomMapping from './pages/users/admin/ClassRoomMapping';

function App() {
  const location = useLocation();

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto';
    window.scroll({ top: 0 });
    document.querySelector('html').style.scrollBehavior = '';
  }, [location.pathname]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Herosection />} />
        <Route path="/login" element={<Signin />} />

        {/*Admin routes*/}
        <Route path="/admin" element={<AdminRoutes />}>
          <Route path="manageDepartments" element={<ManageDepartments />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="classroom-mapping" element={<ClassRoomMapping />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>

        {/*Student routes*/}
        <Route path="/student" element={<StudentRoutes />}>
          <Route path="dashboard" element={<StudentDashboard />} />
          <Route path="attend-lecture" element={<AttendLecture />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>

        {/*Faculty routes*/}
        <Route path="/faculty" element={<TeacherRoutes />}>
          <Route path="dashboard" element={<TeacherDashboard />} />
          <Route path="conduct-lecture" element={<ConductLecture />} />
          <Route path="conducting-lecture" element={<ConductingLecture />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
