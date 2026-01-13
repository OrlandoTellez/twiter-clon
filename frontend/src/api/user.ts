import { API } from "../constants/api";
import type { UpdateUser } from "../types/user";

export const getMyProfile = async () => {
  const response = await API.get("/users/me");

  return response.data;
};

export const updateProfile = async ({
  name,
  image_profile,
  image_banner,
  bio,
}: UpdateUser) => {
  const formData = new FormData();

  if (name) {
    formData.append("name", name);
  }
  if (image_profile) {
    formData.append("image_profile", image_profile);
  }

  if (image_banner) {
    formData.append("image_banner", image_banner);
  }

  if (bio) {
    formData.append("bio", bio);
  }

  const response = await API.patch("/users/me", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
