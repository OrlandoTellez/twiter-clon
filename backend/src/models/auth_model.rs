use serde::{Deserialize, Serialize};

#[derive(Serialize)]
pub struct Claim {
    pub sub: String,
    pub exp: usize,
    pub iat: usize,
}

#[derive(Deserialize, Clone, Debug)]
pub struct RegisterPayload {
    pub name: String,
    pub last_name: String,
    pub age: i32,
    pub email: String,
    pub username: String,
    pub password: String,
    pub bio: Option<String>,
    pub image_profile: Option<String>,
    pub image_banner: Option<String>,
}

#[derive(Serialize)]
pub struct AuthResponse {
    pub access_token: String,
    pub token_type: String,
}
