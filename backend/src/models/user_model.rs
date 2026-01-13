use chrono::NaiveDateTime;
use serde::{Deserialize, Serialize};
use sqlx::FromRow;

#[derive(Serialize, Deserialize, Clone, Debug, FromRow)]
pub struct User {
    pub id: i32,
    pub name: String,
    pub last_name: String,
    pub age: i32,
    pub email: String,
    pub username: String,
    pub bio: Option<String>,
    pub image_profile: Option<String>,
    pub image_banner: Option<String>,
    pub created_at: Option<NaiveDateTime>,
}

#[derive(Serialize, Deserialize, Clone, Debug)]
pub struct UpdateUserData {
    pub name: Option<String>,
    pub last_name: Option<String>,
    pub age: Option<i32>,
    pub email: Option<String>,
    pub bio: Option<String>,
    pub image_profile: Option<String>,
    pub image_banner: Option<String>,
}
