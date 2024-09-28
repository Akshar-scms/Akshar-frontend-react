import ModalBasic from "../../components/ModalBasic";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {checkForDepartmentIdAvail, createDepartment, updateDepartment} from "../../apis/admin/departments";
import { getAllTeacherByDepartment } from "../../apis/admin/teacher";
import {useDispatch} from "react-redux";
import {departmentActions} from "../../store/admin/departmentStore";

const DepartmentCreateModel = (props) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();


  const dispatch=useDispatch();
  const [teacherList, setTeacherList] = useState([]);

  useEffect(() => {

  }, []);


  const onSubmit = async (data, event) => {
    event.preventDefault();
    try {
      console.log(data);
      const response=await createDepartment(data);
      if (response.status)
      {
        dispatch(departmentActions.addDepartment(response.body))
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <ModalBasic
      id="create-department-model"
      modalOpen={props.createDepartmentModel}
      setModalOpen={props.setCreateDepartmentModel}
      title="Create Department"
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
                    let response = await checkForDepartmentIdAvail(value);
                    return response.status || "Department Id already in use.";
                  },
                  pattern: {
                    value: /^[0-9]{6}$/,
                    message: "Invalid Department Id",
                  },
                })}
              />
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
            </div>
          </div>
        </div>
        {/* Modal footer */}
        <div className="px-5 py-4 border-t border-slate-200">
          <div className="flex flex-wrap justify-end space-x-2">
            <button
                className="btn-sm border-slate-200 hover:border-slate-300 text-slate-600"
                onClick={(e) => {
                  e.stopPropagation();
                  props.setCreateDepartmentModel(false);
                }}
            >
              Cancel
            </button>
            <button
                className="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white"
                type={"submit"}
            >
              Create
            </button>
          </div>
        </div>
      </form>
    </ModalBasic>
  );
};

export default DepartmentCreateModel;
