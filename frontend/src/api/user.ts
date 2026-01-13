import { API } from "../constants/api";
import type { UpdateUser } from "../types/user";

export const getMyProfile = async () => {
  const response = await API.get("/users/me");

  return response.data;
};

export const updateProfile = async ({ name, image_profile }: UpdateUser) => {
  const formData = new FormData();

  if (name) {
    formData.append("name", name);
  }
  if (image_profile) {
    formData.append("image", image_profile);
  }

  const response = await API.patch("/users/me", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
