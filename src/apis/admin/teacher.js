// frontend.js (JavaScript)

import { GLOBAL_URL } from "../globalUrl";

export const getAllTeacherByDepartment = async (data) => {
  const response = await fetch(
    GLOBAL_URL + "admin/teacher/getAllTeacherForDepartment",
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};
