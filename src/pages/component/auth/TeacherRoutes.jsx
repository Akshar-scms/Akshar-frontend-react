import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { getUserRole } from '../../../service/localstorage';

const TeacherRoutes = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const role = getUserRole();
    if (role !== 'TEACHER') {
      navigate('/login');
    }
  }, []);

  return <Outlet></Outlet>;
};

export default TeacherRoutes;
