import { create } from "zustand";
import type { CreateTweetPayload, LikePayload, Tweet } from "../types/tweet";
import {
  createTweet,
  getTweets,
  getMyTweets,
  getMyLikedTweets,
  deleteTweet as deleteTweetApi,
  uploadTweetWithImage,
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
  createTweetWithImage: (content: string, file?: File) => Promise<void>;
  toggleLike: (payload: LikePayload) => Promise<void>;
  deleteTweet: (tweetId: number) => Promise<void>;
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
  createTweetWithImage: async (content: string, file?: File) => {
    set({ loading: true, error: null });
    try {
      const newTweet = await uploadTweetWithImage(content, file);
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
      const { tweets, myTweets, likedTweets } = get();
      const updatedTweetsArray = (tweetsArray: Tweet[]) => tweetsArray.map((tweet) => {
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

      set({
        tweets: updatedTweetsArray(tweets),
        myTweets: updatedTweetsArray(myTweets),
        likedTweets: updatedTweetsArray(likedTweets)
      });
    } catch (error) {
      set({ error: (error as Error).message });
    }
  },

  deleteTweet: async (tweetId: number) => {
    console.log('🗑️ eliminando tweet:', tweetId);
    set({ loading: true, error: null });
    try {
      console.log('⏳ llamando a la API...');
      await deleteTweetApi(tweetId);
      console.log('✅ API respondió correctamente');

      const { tweets, myTweets, likedTweets } = get();
      console.log("📊 tweets antes:", tweets.length);

      const updatedTweetsArray = (tweetsArray: Tweet[]) =>
        tweetsArray.filter((tweet) => tweet.id !== tweetId);

      const newTweets = updatedTweetsArray(tweets);
      console.log("📊 nuevos tweets:", newTweets.length);

      set({
        tweets: newTweets,
        myTweets: updatedTweetsArray(myTweets),
        likedTweets: updatedTweetsArray(likedTweets),
        loading: false
      });
      console.log("🔄 Estado actualizado");
    } catch (error) {
      console.error("❌ Error en deleteTweet:", error);
      set({ error: (error as Error).message, loading: false });
    }
  }
 }));
