use axum::{Json, extract::State};
use axum_extra::extract::CookieJar;

use crate::{
    helpers::{check_session::check_session, errors::AppError},
    models::{
        auth_model::Claim,
        tweet_model::{CreateTweetData, Tweet},
        user_model::User,
    },
    services::{tweet_services::TweetService, user_services::UserService},
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

pub async fn get_my_tweets(
    jar: CookieJar,
    State(db): State<DbState>,
) -> Result<Json<Vec<Tweet>>, AppError> {
    let claims: Claim = check_session(&jar)?;
    let user: User = UserService::get_user_by_username(&db, &claims.sub).await?;
    let tweets: Vec<Tweet> = TweetService::get_tweets_by_user(&db, user.id).await?;
    Ok(Json(tweets))
}
