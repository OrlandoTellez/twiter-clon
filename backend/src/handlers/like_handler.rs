use axum::{Json, extract::State};
use axum_extra::extract::CookieJar;

use crate::{
    helpers::{check_session::check_session, errors::AppError},
    models::{auth_model::Claim, like_model::LikePayload, user_model::User},
    services::{like_services::LikeService, user_services::UserService},
    states::DbState,
};

#[axum::debug_handler]
pub async fn toggle_like(
    jar: CookieJar,
    State(db): State<DbState>,
    Json(payload): Json<LikePayload>,
) -> Result<Json<bool>, AppError> {
    let claims: Claim = check_session(&jar)?;
    let user: User = UserService::get_user_by_username(&db, &claims.sub).await?;
    let toggle_result: bool = LikeService::toggle_like(&db, user.id, payload.tweet_id).await?;

    Ok(Json(toggle_result))
}

#[axum::debug_handler]
pub async fn get_likes_count(
    State(db): State<DbState>,
    Json(payload): Json<LikePayload>,
) -> Result<Json<i64>, AppError> {
    let count: i64 = LikeService::get_likes_count(&db, payload.tweet_id).await?;

    Ok(Json(count))
}

#[axum::debug_handler]
pub async fn is_liked_by_user(
    jar: CookieJar,
    State(db): State<DbState>,
    Json(payload): Json<LikePayload>,
) -> Result<Json<bool>, AppError> {
    let claims: Claim = check_session(&jar)?;
    let user: User = UserService::get_user_by_username(&db, &claims.sub).await?;
    let exists: bool = LikeService::is_liked_by_user(&db, user.id, payload.tweet_id).await?;

    Ok(Json(exists))
}
