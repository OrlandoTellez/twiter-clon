use chrono::NaiveDateTime;
use serde::{Deserialize, Serialize};
use sqlx::prelude::FromRow;

#[derive(Serialize, Deserialize, Clone, Debug, FromRow)]
pub struct Tweet {
    pub id: i32,
    pub content: String,
    pub user: TweetUser,
    pub likes_count: i32,
    pub is_liked_by_user: bool,
    pub image: Option<String>,
    pub created_at: Option<NaiveDateTime>,
}

#[derive(Serialize, Deserialize, Clone, Debug)]
pub struct TweetUser {
    pub id: i32,
    pub name: String,
    pub username: String,
    pub profile_image: Option<String>,
}

#[derive(Serialize, Deserialize, Clone, Debug)]
pub struct CreateTweetData {
    pub content: String,
    pub image: Option<String>,
}
