import { GLOBAL_URL } from "../globalUrl";

export const uploadTheSVG = async (data) => {
  const response = await fetch(GLOBAL_URL + "teacher/whiteboard/saveNotes", {
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
