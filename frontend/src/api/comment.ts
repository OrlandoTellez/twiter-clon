import { API } from "../constants/api";
import type { Comment, CreateCommentPayload } from "../types/comment";

export const getCommentsByTweet = async (
  tweetId: number,
): Promise<Comment[]> => {
  const response = await API.get(`/tweets/${tweetId}/comments`);
  return response.data;
};

export const createComment = async (
  payload: CreateCommentPayload,
): Promise<Comment> => {
  const response = await API.post("/comments", payload);
  return response.data;
};

export const deleteComment = async (commentId: number): Promise<void> => {
  await API.delete(`/comments/${commentId}`);
};

export const getMyComments = async (): Promise<Comment[]> => {
  const response = await API.get("/comments/me");
  return response.data;
};
