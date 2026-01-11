use crate::helpers::{errors::AppError, jwt::decode_jwt};
use crate::models::auth_model::Claim;
use axum_extra::extract::cookie::CookieJar;

pub fn check_session(jar: &CookieJar) -> Result<Claim, AppError> {
    let token: &str = jar
        .get("session")
        .ok_or(AppError::Unauthorized("No session".into()))?
        .value();

    let claims: Claim = decode_jwt(token)?;

    Ok(claims)
}
