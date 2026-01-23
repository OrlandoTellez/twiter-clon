use chrono::NaiveDateTime;
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Comment {
    pub id: i32,
    pub content: String,
    pub user: CommentUser,
    pub tweet_id: i32,
    pub created_at: Option<NaiveDateTime>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct CommentUser {
    pub id: i32,
    pub name: String,
    pub username: String,
    pub profile_image: Option<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct CreateCommentData {
    pub content: String,
    pub tweet_id: i32,
}
