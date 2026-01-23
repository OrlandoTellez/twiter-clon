use axum::{
    Json,
    extract::{Path, State},
    response::IntoResponse,
};
use axum_extra::extract::CookieJar;
use serde_json::json;

use crate::{
    helpers::{check_session::check_session, errors::AppError},
    models::{
        auth_model::Claim,
        comment_model::{Comment, CreateCommentData},
        user_model::User,
    },
    services::{comment_services::CommentService, user_services::UserService},
    states::DbState,
};

/// Obtener todos los comentarios de un tweet específico
pub async fn get_comments_by_tweet(
    jar: CookieJar,
    State(db): State<DbState>,
    Path(tweet_id): Path<i32>,
) -> Result<Json<Vec<Comment>>, AppError> {
    let claims: Claim = check_session(&jar)?;
    let user: User = UserService::get_user_by_username(&db, &claims.sub).await?;

    let comments: Vec<Comment> =
        CommentService::get_comments_by_tweet(&db, tweet_id, user.id).await?;

    Ok(Json(comments))
}

/// Crear un nuevo comentario en un tweet
pub async fn create_comment(
    jar: CookieJar,
    State(db): State<DbState>,
    Json(data): Json<CreateCommentData>,
) -> Result<Json<Comment>, AppError> {
    let claims: Claim = check_session(&jar)?;
    let user: User = UserService::get_user_by_username(&db, &claims.sub).await?;

    // Validar que el contenido no esté vacío
    if data.content.trim().is_empty() {
        return Err(AppError::BadRequest(
            "El contenido del comentario no puede estar vacío".into(),
        ));
    }

    // Validar que el contenido no sea demasiado largo (opcional)
    if data.content.len() > 1000 {
        return Err(AppError::BadRequest(
            "El comentario no puede exceder los 1000 caracteres".into(),
        ));
    }

    let comment: Comment = CommentService::create_comment(&db, user.id, data).await?;

    Ok(Json(comment))
}

/// Eliminar un comentario específico
pub async fn delete_comment(
    jar: CookieJar,
    State(db): State<DbState>,
    Path(comment_id): Path<i32>,
) -> Result<impl IntoResponse, AppError> {
    let claims: Claim = check_session(&jar)?;
    let user: User = UserService::get_user_by_username(&db, &claims.sub).await?;

    CommentService::delete_comment(&db, comment_id, user.id).await?;

    let response = json!({
        "message": "Comentario eliminado exitosamente"
    });

    Ok(Json(response))
}

/// Obtener todos los comentarios de un usuario específico
pub async fn get_comments_by_user(
    jar: CookieJar,
    State(db): State<DbState>,
) -> Result<Json<Vec<Comment>>, AppError> {
    let claims: Claim = check_session(&jar)?;
    let user: User = UserService::get_user_by_username(&db, &claims.sub).await?;

    let comments: Vec<Comment> = CommentService::get_comments_by_user(&db, user.id).await?;

    Ok(Json(comments))
}

/// Obtener el conteo de comentarios de un tweet (endpoint auxiliar)
pub async fn get_comments_count(
    State(db): State<DbState>,
    Path(tweet_id): Path<i32>,
) -> Result<impl IntoResponse, AppError> {
    let count: i32 = CommentService::get_comments_count(&db, tweet_id).await?;

    let response = json!({
        "comments_count": count
    });

    Ok(Json(response))
}
