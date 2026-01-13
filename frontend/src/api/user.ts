import { API } from "../constants/api";

export const getMyProfile = async () => {
  const response = await API.get("/users/me");

  return response.data;
};

export const updateProfile = async (name: string, image?: File) => {
  const formData = new FormData();
  formData.append("name", name);
  if (image) {
    formData.append("image", image);
  }

  const response = await API.patch("/users/me", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
