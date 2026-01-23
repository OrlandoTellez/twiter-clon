export interface Comment {
  id: number;
  content: string;
  tweet_id: number;
  created_at: string;
  user: {
    id: number;
    name: string;
    username: string;
    profile_image?: string;
  };
}

export interface CreateCommentPayload {
  content: string;
  tweet_id: number;
}
