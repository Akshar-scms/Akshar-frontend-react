import ModalBasic from "../../components/ModalBasic";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  checkForDepartmentIdAvail,
  updateDepartment,
} from "../../apis/admin/departments";
import { getAllTeacherByDepartment } from "../../apis/admin/teacher";
import { useDispatch } from "react-redux";
import { departmentActions } from "../../store/admin/departmentStore";

const DepartmentEditModel = (props) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const [teacherList, setTeacherList] = useState([]);

  const fetchTeachers = async ({ id, departmentId }) => {
    try {
      const response = await getAllTeacherByDepartment({ id, departmentId });
      setTeacherList(response.body.teacherList);
    } catch (error) {
      console.error("Error fetching teachers: ", error);
    }
  };

  useEffect(() => {
    if (props.editDepartmentVo.departmentId) {
      fetchTeachers({
        id: props.editDepartmentVo.id,
        departmentId: props.editDepartmentVo.departmentId,
      });
      setValue("departmentId", props.editDepartmentVo.departmentId);
      setValue("departmentName", props.editDepartmentVo.departmentName);
      setValue(
        "departmentShortName",
        props.editDepartmentVo.departmentShortName
      );
      setValue("teacherInfo", props.editDepartmentVo.teacherInfo);
    }
  }, [props.editDepartmentVo, setValue]);

  const selectedTeacher = watch("teacherInfo");

  const onSubmit = async (data) => {
    try {
      const response = await updateDepartment({
        id: props.editDepartmentVo.id,
        departmentId: data.departmentId,
        departmentName: data.departmentName,
        departmentShortName: data.departmentShortName,
        teacherInfo: data.teacherInfo,
      });

      if (response.status) {
        dispatch(departmentActions.updateDepartment(response.body));
        props.setFeedbackModalOpen(false);
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <ModalBasic
      id="edit-department-model"
      modalOpen={props.feedbackModalOpen}
      setModalOpen={props.setFeedbackModalOpen}
      title="Edit Department"
    >
      {/* Modal content */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="px-5 py-4">
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="name">
                Department Unique Id<span className="text-rose-500">*</span>
              </label>
              <input
                id="name"
                className="form-input w-full px-2 py-1"
                type="text"
                required
                {...register("departmentId", {
                  required: "Department Id is required.",
                  validate: async (value) => {
                    let response = await checkForDepartmentIdAvail(
                      value,
                      props.editDepartmentVo.id
                    );
                    return response.status || "Department Id already in use.";
                  },
                  pattern: {
                    value: /^[0-9]{6}$/,
                    message: "Invalid Department Id",
                  },
                })}
              />
              {errors.departmentId && (
                <p className="text-red-500">{errors.departmentId.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="name">
                Name<span className="text-rose-500">*</span>
              </label>
              <input
                id="name"
                className="form-input w-full px-2 py-1"
                type="text"
                required
                {...register("departmentName", {
                  required: "Department Name is  Required.",
                })}
              />
              {errors.departmentName && (
                <p className="text-red-500">{errors.departmentName.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="name">
                Short Name<span className="text-rose-500">*</span>
              </label>
              <input
                id="name"
                className="form-input w-full px-2 py-1"
                type="text"
                required
                {...register("departmentShortName", {
                  required: "Department ShortName is  Required.",
                })}
              />
              {errors.departmentShortName && (
                <p className="text-red-500">
                  {errors.departmentShortName.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="email">
                Choose Department Head<span className="text-rose-500">*</span>
              </label>
              <select
                id="teacherInfo"
                className="form-select"
                {...register("teacherInfo", {
                  required: "Head Of Department Required.",
                })}
                // value={selectedTeacher} // Set the value explicitly to ensure the field is controlled
              >
                <option value="">Choose Teacher Id</option>
                {teacherList.map((teacher) => (
                  <option
                    key={teacher.id}
                    value={`${teacher.firstName} ${teacher.lastName} (${teacher.teacherId})`}
                  >
                    {`${teacher.firstName} ${teacher.lastName} (${teacher.teacherId})`}
                  </option>
                ))}
              </select>
              {errors.teacherInfo && (
                <p className="text-red-500">{errors.teacherInfo.message}</p>
              )}
            </div>
          </div>
        </div>
        {/* Modal footer */}
        <div className="px-5 py-4 border-t border-slate-200">
          <div className="flex flex-wrap justify-end space-x-2">
            <button
              className="btn-sm border-slate-200 hover:border-slate-300 text-slate-600"
              onClick={(e) => {
                e.preventDefault(); // prevent form submission
                props.setFeedbackModalOpen(false);
              }}
            >
              Cancel
            </button>
            <button
              className="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white"
              type={"submit"}
            >
              Update
            </button>
          </div>
        </div>
      </form>
    </ModalBasic>
  );
};

export default DepartmentEditModel;
