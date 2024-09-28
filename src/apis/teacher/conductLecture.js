import { GLOBAL_URL } from "../globalUrl";

export const getAllCoursesForTeacher = async () => {
  const response = await fetch(GLOBAL_URL + "teacher/course/getAllCourse", {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    alert("Invalid Username or password");
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const getClassRoomsForTeachers = async () => {
  const response = await fetch(
    GLOBAL_URL + "teacher/classRoom/getAllClassRoom",
    {
      method: "GET",
      credentials: "include",
    }
  );

  if (!response.ok) {
    alert("Invalid Username or password");
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const getAllBatchsForTeacher = async (data) => {
  const response = await fetch(GLOBAL_URL + "batch/getAllBatchByCourse", {
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

export const getAllSubjectForTeacher = async (data) => {
  const response = await fetch(
    GLOBAL_URL + "teacher/subject/getSubjectByCourseId",
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

export const getSectionForTeacher = async (data) => {
  const response = await fetch(
    GLOBAL_URL + "teacher/section/getAllSectionByBatchId",
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

export const conductLectureAPI = async (data) => {
  const response = await fetch(GLOBAL_URL + "teacher/lecture/startLecture", {
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
