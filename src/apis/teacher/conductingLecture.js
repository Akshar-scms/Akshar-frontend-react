import { GLOBAL_URL } from "../globalUrl";

export const getStudentForCurrentLecture = async (data) => {
  const response = await fetch(
    GLOBAL_URL + "teacher/lecture/getStudentForCurrentLecture",
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

export const markAttendence = async (data) => {
  const response = await fetch(GLOBAL_URL + "teacher/lecture/markAttendance", {
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
