import React, { useState, useEffect } from "react";
import Upload from "../../../public/svgs/upload.svg";
import Download from "../../../public/svgs/download.svg";
import {
  checkStudentPresenceInClass,
  downloadNotes,
} from "../../apis/student/attendLecture"; // Adjust the import path accordingly
import CameraComponent from "../../pages/users/student/CameraComponent";

const MARK_ATTENDANCE_URL = "https://example.com/api/markAttendance";

function LectureTableItem(props) {
  const [status, setStatus] = useState(props.status);
  const [attendanceStatus, setAttendanceStatus] = useState(
    props.attendanceStatus
  );
  const [showCamera, setShowCamera] = useState(false); // State for camera visibility

  useEffect(() => {
    setStatus(props.status);
  }, [props.status]);

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
    props.onStatusChange(props.id, newStatus);
  };

  const attended = () => {
    setShowCamera(false);
    props.reFetchLectures();
  };

  const checkForGeoLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          markAttendance(latitude, longitude); // Call function to mark attendance with geolocation
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Unable to retrieve your location.");
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };

  const handleDownload = async () => {
    try {
      // Call the API to download the notes as a zip file
      const blob = await downloadNotes({ id: props.id });

      // Create a URL for the binary data (the zip file)
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "notes.zip"); // Specify the name for the downloaded file

      // Append the link to the document and click it programmatically to download the file
      document.body.appendChild(link);
      link.click();

      // Clean up by removing the link element from the document
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading SVG images:", error);
    }
  };

  const markAttendance = async (latitude, longitude) => {
    const studentId = localStorage.getItem("id"); // Get student ID from local storage
    const lectureId = props.id; // Use the lecture ID passed as props

    const attendanceData = {
      studentId,
      lectureId,
      pointVo: {
        latitude,
        longitude,
      },
    };

    try {
      const response = await checkStudentPresenceInClass(attendanceData);
      alert(response.body.presenceStatus);

      if (response.body.presenceStatus) {
        // If attendance is successfully marked
        setShowCamera(true); // Show the camera
      }

      if (!response.status) {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.error("Error marking attendance:", error);
    }
  };

  return (
    <>
      <tr>
        <td className="px-3 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
          <div className="flex items-center"></div>
        </td>
        <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
          <div className={"font-medium text-sky-500"}>{props.name}</div>
        </td>
        <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
          <div className="font-medium text-black-500">
            {new Date(props.date).toLocaleDateString()}
          </div>
        </td>
        <td className="px-1 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
          <div className={`font-medium text-slate-800`}>{props.teacher}</div>
        </td>
        <td>
          <div className="font-medium text-left text-slate-800">
            {new Date(props.time).toLocaleTimeString()}{" "}
          </div>
        </td>
        <td>
          {status ? (
            <div className="inline-flex font-medium rounded-full text-center px-2.5 py-0.5 bg-emerald-100 text-emerald-600">
              In Progress
            </div>
          ) : (
            <div className="inline-flex font-medium rounded-full text-center px-2.5 py-0.5 bg-amber-100 text-amber-600">
              Finished
            </div>
          )}
        </td>
        <td>
          {attendanceStatus ? (
            <div className="inline-flex font-medium rounded-full text-center px-2.5 py-0.5 bg-emerald-100 text-emerald-600">
              Marked
            </div>
          ) : (
            <div className="inline-flex font-medium rounded-full text-center px-2.5 py-0.5 bg-amber-100 text-amber-600">
              Not Marked
            </div>
          )}
        </td>
        <td>
          <div className={`font-medium text-center text-slate-800`}>
            <img
              src={Upload}
              className="opacity-60 hover:opacity-100 transition-opacity duration-200"
              alt="Upload"
            />
          </div>
        </td>
        <td>
          <div
            className={`font-medium text-center text-slate-800`}
            onClick={handleDownload}
          >
            <img
              src={Download}
              className="opacity-60 hover:opacity-100 transition-opacity duration-200 "
              alt="Download"
            />
          </div>
        </td>
        <td>
          <div>
            {status ? (
              !attendanceStatus ? (
                <div
                  className={`font-medium text-center text-white bg-green-500 hover:bg-emerald-700 px-1 py-1 rounded-md w-40`}
                >
                  <button onClick={checkForGeoLocation}>Mark Attendance</button>
                </div>
              ) : (
                <div
                  className={`font-medium text-center text-white bg-gray-400 px-1 py-1 rounded-md w-40`}
                >
                  - -
                </div>
              )
            ) : (
              <div
                className={`font-medium text-center text-white bg-gray-400 px-1 py-1 rounded-md w-40`}
              >
                - -
              </div>
            )}
          </div>
        </td>
      </tr>
      {showCamera && (
        <CameraComponent
          attendanceId={props.attendanceId}
          attended={attended}
        />
      )}{" "}
      {/* Render the CameraComponent if showCamera is true */}
    </>
  );
}

export default LectureTableItem;
