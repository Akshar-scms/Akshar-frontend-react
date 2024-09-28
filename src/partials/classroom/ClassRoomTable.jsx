import React from "react";
import ClassroomTableItem from "./ClassroomTableItem.jsx";
import {
  deleteClassRoom,
  getAllClassRoom,
} from "../../apis/admin/classRoom.js";

function ClassroomTable(props) {
  //   const { classroomList, numberOfClassroom } = useSelector(
  //     (store) => store.classroomStore
  //   );
  //   const dispatch = useDispatch();

  //   const [selectAll, setSelectAll] = useState(false);
  //   const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
  //   const [editClassroomVo, setEditClassroomVo] = useState({});
  //   const [isCheck, setIsCheck] = useState([]);

  //   const presentClassroom = (e, student) => {
  //     e.stopPropagation();
  //     setFeedbackModalOpen(true);
  //     setEditClassroomVo(student);
  //   };

  //   const absentClassroom = (e, student) => {
  //     e.stopPropagation();
  //     setFeedbackModalOpen(true);
  //     setEditClassroomVo(student);
  //   };

  //   const handleSelectAll = () => {
  //     setSelectAll(!selectAll);
  //     setIsCheck(classroomList.map((li) => li.id));
  //     if (selectAll) {
  //       setIsCheck([]);
  //     }
  //   };

  //   const handleClick = (e) => {
  //     const { id, checked } = e.target;
  //     setSelectAll(false);
  //     setIsCheck([...isCheck, id]);
  //     if (!checked) {
  //       setIsCheck(isCheck.filter((item) => item !== id));
  //     }
  //   };

  // useEffect(() => {
  //   selectedItems(isCheck);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [isCheck]);

  const fetchClassrooms = async () => {
    const response = await getAllClassRoom();
    if (response.status) {
      props.setClassrooms(response.body.classRoomList);
    }
  };

  const onDeleteClassRoom = async (id) => {
    const response = await deleteClassRoom({ id });
    fetchClassrooms();
  };

  return (
    <div className="bg-white shadow-lg rounded-sm border border-slate-200 relative">
      <header className="px-3 py-4">
        <h2 className="font-semibold text-slate-800">
          Classrooms{" "}
          {/* <span className="text-slate-400 font-medium">
            {' '}
            {numberOfClassroom}
          </span> */}
        </h2>
      </header>
      {/* <ClassroomEditModel
        feedbackModalOpen={feedbackModalOpen}
        setFeedbackModalOpen={setFeedbackModalOpen}
        editClassroomVo={editClassroomVo}
      ></ClassroomEditModel> */}
      <div>
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            {/* Table header */}
            <thead className="text-xs font-semibold uppercase text-slate-500 bg-slate-50 border-t border-b border-slate-200">
              <tr>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Serial No</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Classroom Name</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">
                    Top Left Latitude
                  </div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">
                    Top Left Longitude
                  </div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">
                    Top Right Latitude
                  </div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">
                    Top Right Longitude
                  </div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">
                    Bottom Left Latitude
                  </div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">
                    Bottom Left Longitude
                  </div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">
                    Bottom Right Latitude
                  </div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">
                    Bottom Right Longitude
                  </div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Delete</div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm divide-y divide-slate-200">
              {props.classrooms.map((classroom, index) => {
                return (
                  <ClassroomTableItem
                    onDeleteClassRoom={onDeleteClassRoom}
                    key={classroom.id}
                    id={classroom.id}
                    sr={index + 1}
                    name={classroom.classRoomNumber}
                    topLeftLatitude={classroom.topLeftLatitude}
                    topLeftLongitude={classroom.topLeftLongitude}
                    topRightLatitude={classroom.topRightLatitude}
                    topRightLongitude={classroom.topRightLongitude}
                    bottomLeftLatitude={classroom.bottomLeftLatitude}
                    bottomLeftLongitude={classroom.bottomLeftLongitude}
                    bottomRightLatitude={classroom.bottomRightLatitude}
                    bottomRightLongitude={classroom.bottomRightLongitude}
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

export default ClassroomTable;
