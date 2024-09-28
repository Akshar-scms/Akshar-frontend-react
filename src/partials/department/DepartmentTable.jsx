import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DepartmentTableItem from "./DepartmentTableItem";
import DepartmentEditModel from "./DepartmentEditModel";
import { removeDepartment } from "../../apis/admin/departments";
import { departmentActions } from "../../store/admin/departmentStore";

function DepartmentTable({ selectedItems }) {
  const { departmentList, numberOfDepartment } = useSelector(
    (store) => store.departmentStore
  );
  const dispatch = useDispatch();

  const [selectAll, setSelectAll] = useState(false);
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
  const [editDepartmentVo, setEditDepartmentVo] = useState({});
  const [isCheck, setIsCheck] = useState([]);

  const editDepartment = (e, department) => {
    e.stopPropagation();
    setFeedbackModalOpen(true);
    setEditDepartmentVo(department);
  };

  const deleteDepartment = async (data) => {
    const response = await removeDepartment(data);
    if (response.status) {
      dispatch(departmentActions.deleteDepartment(response.body.id));
    }
  };

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    setIsCheck(departmentList.map((li) => li.id));
    if (selectAll) {
      setIsCheck([]);
    }
  };

  const handleClick = (e) => {
    const { id, checked } = e.target;
    setSelectAll(false);
    setIsCheck([...isCheck, id]);
    if (!checked) {
      setIsCheck(isCheck.filter((item) => item !== id));
    }
  };

  useEffect(() => {
    selectedItems(isCheck);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCheck]);

  return (
    <div className="bg-white shadow-lg rounded-sm border border-slate-200 relative">
      <header className="px-3 py-4">
        <h2 className="font-semibold text-slate-800">
          Departments{" "}
          <span className="text-slate-400 font-medium">
            {" "}
            {numberOfDepartment}
          </span>
        </h2>
      </header>
      <DepartmentEditModel
        feedbackModalOpen={feedbackModalOpen}
        setFeedbackModalOpen={setFeedbackModalOpen}
        editDepartmentVo={editDepartmentVo}
      ></DepartmentEditModel>
      <div>
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            {/* Table header */}
            <thead className="text-xs font-semibold uppercase text-slate-500 bg-slate-50 border-t border-b border-slate-200">
              <tr>
                <th className="px-3 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
                  <div className="flex items-center">
                    <label className="inline-flex">
                      <span className="sr-only">Select all</span>
                      <input
                        className="form-checkbox"
                        type="checkbox"
                        checked={selectAll}
                        onChange={handleSelectAll}
                      />
                    </label>
                  </div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Id</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Name</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Short Name</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">
                    Head Of Department
                  </div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Courses</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Teachers</div>
                </th>
                <th className="px-3 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Actions</div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm divide-y divide-slate-200">
              {departmentList.map((department) => {
                return (
                  <DepartmentTableItem
                    key={department.id}
                    id={department.id}
                    departmentId={department.departmentId}
                    departmentName={department.departmentName}
                    departmentShortName={department.departmentShortName}
                    teacherInfo={department.teacherInfo}
                    courses={department.courses}
                    teachers={department.teachers}
                    handleClick={handleClick}
                    isChecked={isCheck.includes(department.id)}
                    editDepartment={editDepartment}
                    deleteDepartment={deleteDepartment}
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

export default DepartmentTable;
