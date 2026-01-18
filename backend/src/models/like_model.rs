use chrono::NaiveDateTime;
use serde::{Deserialize, Serialize};
use sqlx::prelude::FromRow;

#[derive(Serialize, Deserialize, Clone, Debug, FromRow)]
pub struct Like {
    pub id: i32,
    pub user_id: i32,
    pub tweet_id: i32,
    pub created_at: Option<NaiveDateTime>,
}

#[derive(Deserialize)]
pub struct LikePayload {
    pub user_id: i32,
    pub tweet_id: i32,
}
