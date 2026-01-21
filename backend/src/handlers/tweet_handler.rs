use axum::{
    Json,
    extract::{Multipart, Path, State},
    response::IntoResponse,
};
use axum_extra::extract::CookieJar;
use serde_json::json;

use crate::{
    helpers::{check_session::check_session, errors::AppError},
    models::{
        auth_model::Claim,
        tweet_model::{CreateTweetData, Tweet},
        user_model::User,
    },
    services::{cloudinary_services, tweet_services::TweetService, user_services::UserService},
    states::DbState,
};

pub async fn get_tweets(
    jar: CookieJar,
    State(db): State<DbState>,
) -> Result<Json<Vec<Tweet>>, AppError> {
    let claims: Claim = check_session(&jar)?;
    let user: User = UserService::get_user_by_username(&db, &claims.sub).await?;
    let tweets: Vec<Tweet> = TweetService::get_tweets(&db, user.id).await?;
    Ok(Json(tweets))
}

pub async fn create_tweet(
    jar: CookieJar,
    State(db): State<DbState>,
    Json(data): Json<CreateTweetData>,
) -> Result<Json<Tweet>, AppError> {
    let claims: Claim = check_session(&jar)?;

    let user: User = UserService::get_user_by_username(&db, &claims.sub).await?;

    let tweet: Tweet = TweetService::create_tweet(&db, user.id, data).await?;

    Ok(Json(tweet))
}

pub async fn create_tweet_with_image(
    jar: CookieJar,
    State(db): State<DbState>,
    mut multipart: Multipart,
) -> Result<Json<Tweet>, AppError> {
    let claims: Claim = check_session(&jar)?;

    let user: User = UserService::get_user_by_username(&db, &claims.sub).await?;

    let mut content: Option<String> = None;
    let mut image_bytes: Option<Vec<u8>> = None;

    while let Some(field) = multipart
        .next_field()
        .await
        .map_err(|_| AppError::BadRequest("Error leyendo multipart".into()))?
    {
        match field.name() {
            Some("content") => {
                content = Some(
                    field
                        .text()
                        .await
                        .map_err(|_| AppError::BadRequest("Error leyendo content".into()))?,
                );
            }
            Some("image") => {
                image_bytes = Some(
                    field
                        .bytes()
                        .await
                        .map_err(|_| AppError::BadRequest("Error leyendo image".into()))?
                        .to_vec(),
                );
            }
            _ => {}
        }
    }

    // Validar que el contenido exista
    let content: String =
        content.ok_or(AppError::BadRequest("El contenido es obligatorio".into()))?;

    // Si hay imagen, subirla a Cloudinary
    let image_url: Option<String> = if let Some(bytes) = image_bytes {
        Some(
            cloudinary_services::upload_image(bytes, "tweets")
                .await
                .map_err(|_| AppError::InternalServerError("Error subiendo imagen".into()))?,
        )
    } else {
        None
    };

    let tweet_data: CreateTweetData = CreateTweetData {
        content,
        image: image_url,
    };

    let tweet: Tweet = TweetService::create_tweet(&db, user.id, tweet_data).await?;

    Ok(Json(tweet))
}

pub async fn get_my_tweets(
    jar: CookieJar,
    State(db): State<DbState>,
) -> Result<Json<Vec<Tweet>>, AppError> {
    let claims: Claim = check_session(&jar)?;

    let user: User = UserService::get_user_by_username(&db, &claims.sub).await?;

    let tweets: Vec<Tweet> = TweetService::get_tweets_by_user(&db, user.id).await?;

    Ok(Json(tweets))
}

pub async fn get_liked_tweets_by_user(
    jar: CookieJar,
    State(db): State<DbState>,
) -> Result<Json<Vec<Tweet>>, AppError> {
    let claims: Claim = check_session(&jar)?;

    let user: User = UserService::get_user_by_username(&db, &claims.sub).await?;

    let tweets: Vec<Tweet> = TweetService::get_liked_tweets_by_user(&db, user.id).await?;

    Ok(Json(tweets))
}

pub async fn delete_tweet(
    jar: CookieJar,
    State(db): State<DbState>,
    Path(tweet_id): Path<i32>,
) -> Result<impl IntoResponse, AppError> {
    let claims: Claim = check_session(&jar)?;

    let user: User = UserService::get_user_by_username(&db, &claims.sub).await?;

    TweetService::delete_tweet(&db, tweet_id, user.id).await?;

    let response = json!({
        "message": "successfully deleted tweet"
    });

    Ok(Json(response))
}
