import { GLOBAL_URL } from "../globalUrl";

export const getAllDepartment = async () => {
  const response = await fetch(
    GLOBAL_URL + "admin/department/getAllDepartment",
    {
      method: "GET",
      credentials: "include", // Ensure credentials (cookies) are included
    }
  );

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};

export const checkForDepartmentIdAvail = async (departmentId, id) => {
  const data = { departmentId, id };
  const response = await fetch(
    GLOBAL_URL + "admin/department/checkForDepartmentIdAvail",
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

export const updateDepartment = async ({
  id,
  departmentId,
  departmentName,
  departmentShortName,
  teacherInfo,
}) => {
  const data = {
    id,
    departmentId,
    departmentName,
    departmentShortName,
    teacherInfo,
  };
  const response = await fetch(
    GLOBAL_URL + "admin/department/updateDepartment",
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

export const removeDepartment = async ({
  id,
  departmentId,
  departmentName,
  departmentShortName,
  teacherInfo,
}) => {
  const data = {
    id,
    departmentId,
    departmentName,
    departmentShortName,
    teacherInfo,
  };
  const response = await fetch(
    GLOBAL_URL + "admin/department/deleteDepartment",
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

export const createDepartment = async ({
  id,
  departmentId,
  departmentName,
  departmentShortName,
  teacherInfo,
}) => {
  const data = {
    id,
    departmentId,
    departmentName,
    departmentShortName,
  };
  const response = await fetch(GLOBAL_URL + "admin/department/addDepartment", {
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
