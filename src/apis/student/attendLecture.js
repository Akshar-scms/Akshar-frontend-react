import { GLOBAL_URL } from "../globalUrl";

export const getLecturesForStudent = async (data) => {
  const response = await fetch(
    GLOBAL_URL + "student/lecture/getLecturesByStudentId",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    }
  );

  if (!response.ok) {
    alert("Invalid Username or password");
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const sendFrameToBackend = async ({
  imageData,
  studentId,
  attendanceId,
}) => {
  const formData = new FormData();
  formData.append("image", imageData); // Assuming the backend expects the image data in this field
  formData.append("student_id", studentId);
  formData.append("attendance_id", attendanceId);

  try {
    const response = await fetch(
      `https://${window.location.hostname}:5001/mark_my_attendance`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return await response.json(); // Assuming your backend returns a JSON response
  } catch (error) {
    console.error("Error sending frame to backend:", error);
    return { message: "error" }; // Handle errors appropriately
  }
};

export const checkStudentPresenceInClass = async (data) => {
  const response = await fetch(GLOBAL_URL + "student/attendance/checkUser", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    credentials: "include",
  });

  if (!response.ok) {
    alert("Invalid Username or password");
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const downloadNotes = async (data) => {
  const response = await fetch(GLOBAL_URL + "student/lecture/downloadNotes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    credentials: "include",
  });

  if (!response.ok) {
    alert("Invalid Username or password");
    throw new Error("Network response was not ok");
  }

  // Return the response as a blob since it's binary data (zip file)
  return response.blob();
};
