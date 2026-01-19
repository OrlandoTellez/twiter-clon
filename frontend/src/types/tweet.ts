export interface Tweet {
  id: number;
  content: string;
  user_id: number;
  created_at: string;
  user: {
    id: number;
    name: string;
    username: string;
    profile_image?: string;
  };
  likes_count: number;
  is_liked_by_user: boolean;
}

export interface CreateTweetPayload {
  content: string;
}

export interface LikePayload {
  user_id: number;
  tweet_id: number;
}
