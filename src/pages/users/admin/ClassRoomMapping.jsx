import React, { useEffect, useState } from "react";
import AdminSidebar from "../../../partials/AdminSidebar";
import Header from "../../../partials/Header";
import ClassRoomTable from "../../../partials/classroom/ClassRoomTable.jsx";
import {
  confirmGeoCoordinatesOfClassRoom,
  getAllClassRoom,
  getClassRoomDetails,
  addClassRoom, // Import the addClassRoom function from the API
} from "../../../apis/admin/classRoom.js";

const ClassRoomMapping = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [classrooms, setClassrooms] = useState([]);
  const [topRight, setTopRight] = useState({ long: 0.0, lat: 0.0 });
  const [topLeft, setTopLeft] = useState({ long: 0.0, lat: 0.0 });
  const [bottomRight, setBottomRight] = useState({ long: 0.0, lat: 0.0 });
  const [bottomLeft, setBottomLeft] = useState({ long: 0.0, lat: 0.0 });
  const [currentClassRoom, setCurrentClassRoom] = useState(null);
  const [newClassroomName, setNewClassroomName] = useState(""); // State for the new classroom name

  const fetchClassrooms = async () => {
    const response = await getAllClassRoom();
    if (response.status) {
      setClassrooms(response.body.classRoomList);
    }
  };

  const classRoomChanged = async (classRoomId) => {
    const response = await getClassRoomDetails(classRoomId);
    if (response.status) {
      console.log(response.body);
      setCurrentClassRoom(response.body.id);
      setTopLeft({
        long: response.body.topLeftLongitude,
        lat: response.body.topLeftLatitude,
      });
      setTopRight({
        long: response.body.topRightLongitude,
        lat: response.body.topRightLatitude,
      });
      setBottomLeft({
        long: response.body.bottomLeftLongitude,
        lat: response.body.bottomLeftLatitude,
      });
      setBottomRight({
        long: response.body.bottomRightLongitude,
        lat: response.body.bottomRightLatitude,
      });
    }
  };

  const failedToGet = (error) => {
    console.log(`Error: ${error.message}`);
    alert("not implemented");
  };

  // Handler to set the location for the given coordinate
  const addLocation = (setCoordinate) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCoordinate({ lat: latitude, long: longitude });
      },
      failedToGet,
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  };

  const handleOnConfirm = async () => {
    const data = {
      id: currentClassRoom,
      topLeftLongitude: topLeft.long,
      topLeftLatitude: topLeft.lat,
      topRightLongitude: topRight.long,
      topRightLatitude: topRight.lat,
      bottomLeftLongitude: bottomLeft.long,
      bottomLeftLatitude: bottomLeft.lat,
      bottomRightLongitude: bottomRight.long,
      bottomRightLatitude: bottomRight.lat,
    };
    const response = await confirmGeoCoordinatesOfClassRoom(data);
    console.log(response);
  };

  // New function to handle adding the classroom
  const handleAddClassroom = async () => {
    if (newClassroomName.trim() === "") {
      alert("Please enter a classroom name");
      return;
    }

    const data = {
      classRoomNumber: newClassroomName,
      // You can add more classroom details here if needed
    };

    const response = await addClassRoom(data);
    if (response.status) {
      // Update the classrooms list by re-fetching the classrooms
      fetchClassrooms();
      setNewClassroomName(""); // Clear the input field after adding
    }
  };

  useEffect(() => {
    fetchClassrooms();
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <div className="justify-between">
              <h1 className="text-2xl font-semibold">Classroom Mapping</h1>
              <br />
              <br />
              <div className="flex justify-between">
                <select
                  className="border border-gray-300 w-40 rounded-md p-2"
                  onChange={(event) => {
                    classRoomChanged(event.target.value);
                  }}
                >
                  <option value="select">Select Class</option>
                  {classrooms.map((classroom) => (
                    <option key={classroom.id} value={classroom.id}>
                      {classroom.classRoomNumber}
                    </option>
                  ))}
                </select>
                <div className="flex justify-between">
                  <input
                    type="text"
                    placeholder="Enter classroom name"
                    className="border border-gray-300 rounded-md w-60 p-2"
                    value={newClassroomName}
                    onChange={(e) => setNewClassroomName(e.target.value)} // Update state on input change
                  />
                  <button
                    className="bg-blue-500 hover:bg-blue-700 ml-2 text-white font-bold py-2 px-4 rounded"
                    onClick={handleAddClassroom} // Add the onClick handler for the button
                  >
                    Add Classroom
                  </button>
                </div>
              </div>
            </div>
            <br />
            <div className="flex flex-col gap-6 mb-4">
              <div className="flex justify-between">
                {/* top left corner */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    disabled
                    value={`${topLeft.long}-${topLeft.lat}`}
                    className="border border-gray-300 rounded-md p-2 w-60"
                  />
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => addLocation(setTopLeft)}
                  >
                    Add mapping
                  </button>
                </div>

                {/* top right corner */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    disabled
                    value={`${topRight.long}-${topRight.lat}`}
                    className="border border-gray-300 rounded-md p-2 w-60"
                  />
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => addLocation(setTopRight)}
                  >
                    Add mapping
                  </button>
                </div>
              </div>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-40"
                style={{ position: "absolute", left: "550px", top: "275px" }}
                onClick={() => {
                  handleOnConfirm();
                }}
              >
                Confirm
              </button>
              <div className="flex justify-between">
                {/* bottom left corner */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    disabled
                    value={`${bottomLeft.long}-${bottomLeft.lat}`}
                    className="border border-gray-300 rounded-md p-2 w-60"
                  />
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => addLocation(setBottomLeft)}
                  >
                    Add mapping
                  </button>
                </div>
                {/* bottom right corner */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    disabled
                    value={`${bottomRight.long}-${bottomRight.lat}`}
                    className="border border-gray-300 rounded-md p-2 w-60"
                  />
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => addLocation(setBottomRight)}
                  >
                    Add mapping
                  </button>
                </div>
              </div>
            </div>
            <div className=" gap-6">
              <ClassRoomTable
                setClassrooms={setClassrooms}
                classrooms={classrooms}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ClassRoomMapping;
