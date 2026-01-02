use chrono::NaiveDateTime;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Clone, Debug)]
pub struct User {
    pub id: i32,
    pub name: String,
    pub last_name: String,
    pub age: i32,
    pub email: String,
    pub username: String,
    pub password: String,
    pub bio: Option<String>,
    pub image_profile: Option<String>,
    pub image_banner: Option<String>,
    pub created_at: Option<NaiveDateTime>,
}
