import { API } from "../constants/api";
import type { Tweet, CreateTweetPayload } from "../types/tweet";

export const createTweet = async (
  payload: CreateTweetPayload,
): Promise<Tweet> => {
  const response = await API.post("/tweets", payload);

  if (!response.data.ok) {
    throw new Error("Error creating tweet");
  }

  return response.data;
};

export const getTweets = async (): Promise<Tweet[]> => {
  const response = await API.get("/tweets");

  return response.data;
};

export const getMyTweets = async (): Promise<Tweet[]> => {
  const response = await API.get("/tweets/me");

  return response.data;
};

export const getMyLikedTweets = async (): Promise<Tweet[]> => {
  const response = await API.get("/tweets/liked");

  return response.data;
};

export const deleteTweet = async (tweetId: number): Promise<void> => {
  const response = await API.delete(`/tweets/${tweetId}`);

  if (response.status !== 200) {
    throw new Error("Error deleting tweet");
  }
}
