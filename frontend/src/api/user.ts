import { API } from "../constants/api";

export const getMyProfile = async () => {
  const response = await API.get("/users/me");

  return response.data;
};
