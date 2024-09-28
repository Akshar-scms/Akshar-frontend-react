import { GLOBAL_URL } from "./globalUrl";

export const getUserDetails = async () => {
  const response = await fetch(
    GLOBAL_URL + "user/getUserDetails",
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
