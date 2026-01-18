use axum::{Json, extract::State};

use crate::{
    helpers::errors::AppError, models::like_model::LikePayload,
    services::like_services::LikeService, states::DbState,
};

#[axum::debug_handler]
pub async fn toggle_like(
    State(db): State<DbState>,
    Json(payload): Json<LikePayload>,
) -> Result<Json<bool>, AppError> {
    let toggle_result: bool = LikeService::toggle_like(&db, payload).await?;

    Ok(Json(toggle_result))
}

#[axum::debug_handler]
pub async fn get_likes_count(
    State(db): State<DbState>,
    Json(payload): Json<LikePayload>,
) -> Result<Json<i64>, AppError> {
    let count: i64 = LikeService::get_likes_count(&db, payload).await?;

    Ok(Json(count))
}

#[axum::debug_handler]
pub async fn is_liked_by_user(
    State(db): State<DbState>,
    Json(payload): Json<LikePayload>,
) -> Result<Json<bool>, AppError> {
    let exists: bool = LikeService::is_liked_by_user(&db, payload).await?;

    Ok(Json(exists))
}
