use chrono::NaiveDateTime;
use serde::{Deserialize, Serialize};
use sqlx::prelude::FromRow;

#[derive(Serialize, Deserialize, Clone, Debug, FromRow)]
pub struct Tweet {
    pub id: i32,
    pub user_id: i32,
    pub content: String,
    pub image: Option<String>,
    pub created_at: Option<NaiveDateTime>,
}

#[derive(Serialize, Deserialize, Clone, Debug)]
pub struct CreateTweetData {
    pub content: String,
    pub image: Option<String>,
}
