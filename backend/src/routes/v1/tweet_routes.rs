use axum::{
    Router,
    routing::{delete, get, post},
};

use crate::{handlers::tweet_handler, states::DbState};

pub fn routes() -> Router<DbState> {
    Router::new()
        .route(
            "/tweets",
            get(tweet_handler::get_tweets).post(tweet_handler::create_tweet),
        )
        .route(
            "/tweets/with-image",
            post(tweet_handler::create_tweet_with_image),
        )
        .route("/tweets/me", get(tweet_handler::get_my_tweets))
        .route(
            "/tweets/liked",
            get(tweet_handler::get_liked_tweets_by_user),
        )
        .route("/tweets/{id}", delete(tweet_handler::delete_tweet))
}
