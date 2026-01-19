import { API } from "../constants/api";
import type { LikePayload } from "../types/tweet";

export const toggleLike = async (payload: LikePayload): Promise<boolean> => {
  const response = await API.post("/like/toggle", payload);

  return response.data;
};

export const getLikesCount = async (payload: LikePayload): Promise<number> => {
  const response = await API.post("/like/count", payload);

  return response.data;
};
