import React, { useEffect, useState } from 'react';
import AdminSidebar from '../../../partials/AdminSidebar';
import Header from '../../../partials/Header';
import DepartmentTable from '../../../partials/department/DepartmentTable';
import PaginationClassic from '../../../components/PaginationClassic';
import { getAllDepartment } from '../../../apis/admin/departments';
import { useDispatch } from 'react-redux';
import { departmentActions } from '../../../store/admin/departmentStore';
import DepartmentCreateModel from '../../../partials/department/DepartmentCreateModel';

function ManageDepartments() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [createDepartmentModel, setCreateDepartmentModel] = useState(false);
  const dispatch = useDispatch();

  const handleSelectedItems = (selectedItems) => {
    setSelectedItems([...selectedItems]);
  };

  const createDepartment = (e) => {
    e.stopPropagation();
    setCreateDepartmentModel(true);
  };

  useEffect(() => {
    const fetchDepartments = async () => {
      const response = await getAllDepartment();
      dispatch(
        departmentActions.saveDepartments({
          departmentList: response.body.departmentList,
        })
      );
    };
    fetchDepartments();
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">
      <DepartmentCreateModel
        createDepartmentModel={createDepartmentModel}
        setCreateDepartmentModel={setCreateDepartmentModel}
      ></DepartmentCreateModel>
      {/* AdminSidebar */}
      <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            {/* Page header */}
            <div className="sm:flex sm:justify-between sm:items-center mb-5">
              {/* Left: Title */}
              <div className="sm:mb-0">
                <h1 className="text-2xl md:text-3xl text-slate-800 font-bold">
                  Manage Departments
                </h1>
              </div>

              {/* Right: Actions */}
              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                {/* Create invoice button */}
                <button
                  className="btn bg-indigo-500 hover:bg-indigo-600 text-white"
                  onClick={createDepartment}
                  aria-controls="create-department-model"
                >
                  <svg
                    className="w-4 h-4 fill-current opacity-50 shrink-0"
                    viewBox="0 0 16 16"
                  >
                    <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                  </svg>
                  <span className="hidden xs:block ml-2">
                    Create Department
                  </span>
                </button>
              </div>
            </div>

            {/* Table */}
            <DepartmentTable selectedItems={handleSelectedItems} />

            {/* Pagination */}
            <div className="mt-8">
              <PaginationClassic />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default ManageDepartments;
