use chrono::{Duration, Utc};
use jsonwebtoken::{DecodingKey, EncodingKey, Header, Validation, decode, encode};

use crate::{config::constants::JWT_SECRET, helpers::errors::AppError, models::auth_model::Claim};

pub fn enconde_jwt(username: String) -> Result<String, AppError> {
    let expiration = Utc::now()
        .checked_add_signed(Duration::hours(24))
        .expect("Valid timestamp")
        .timestamp();

    let claims: Claim = Claim {
        sub: username,
        exp: expiration as usize,
        iat: Utc::now().timestamp() as usize,
    };

    encode(
        &Header::default(),
        &claims,
        &EncodingKey::from_secret(JWT_SECRET.as_bytes()),
    )
    .map_err(|_| AppError::InternalServerError("Error encode jwt".to_string()))
}

pub fn decode_jwt(token: &str) -> Result<Claim, AppError> {
    let validation = Validation::default();

    let token_data = decode::<Claim>(
        token,
        &DecodingKey::from_secret(JWT_SECRET.as_bytes()),
        &validation,
    )
    .map_err(|_| AppError::Unauthorized("Token invalido o expirado".to_string()))?;

    Ok(token_data.claims)
}
