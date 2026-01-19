import { create } from "zustand";
import type { CreateTweetPayload, LikePayload, Tweet } from "../types/tweet";
import {
  createTweet,
  getTweets,
  getMyTweets,
  getMyLikedTweets,
} from "../api/tweet";
import { toggleLike } from "../api/like";

interface TweetStore {
  tweets: Tweet[];
  myTweets: Tweet[];
  likedTweets: Tweet[];
  loading: boolean;
  error: string | null;
  fetchTweets: () => Promise<void>;
  fetchMyTweets: () => Promise<void>;
  fetchLikedTweets: () => Promise<void>;
  createTweet: (payload: CreateTweetPayload) => Promise<void>;
  toggleLike: (payload: LikePayload) => Promise<void>;
}

export const useTweetStore = create<TweetStore>((set, get) => ({
  tweets: [],
  myTweets: [],
  likedTweets: [],
  loading: false,
  error: null,
  fetchTweets: async () => {
    set({ loading: true, error: null });
    try {
      const tweets = await getTweets();
      set({ tweets, loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },
  fetchMyTweets: async () => {
    set({ loading: true, error: null });
    try {
      const myTweets = await getMyTweets();
      set({ myTweets, loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },
  fetchLikedTweets: async () => {
    set({ loading: true, error: null });
    try {
      const likedTweets = await getMyLikedTweets();
      set({ likedTweets, loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },
  createTweet: async (payload: CreateTweetPayload) => {
    set({ loading: true, error: null });
    try {
      const newTweet = await createTweet(payload);
      const { tweets } = get();
      set({ tweets: [newTweet, ...tweets], loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },
  toggleLike: async (payload: LikePayload) => {
    try {
      const isLiked = await toggleLike(payload);
      console.log(isLiked);
      const { tweets } = get();
      const updatedTweets = tweets.map((tweet) => {
        if (tweet.id == payload.tweet_id) {
          return {
            ...tweet,
            is_liked_by_user: isLiked,
            likes_count: isLiked
              ? tweet.likes_count + 1
              : tweet.likes_count - 1,
          };
        }
        return tweet;
      });

      set({ tweets: updatedTweets });
    } catch (error) {
      set({ error: (error as Error).message });
    }
  },
}));
