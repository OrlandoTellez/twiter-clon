use axum::{Router, routing::get};

use crate::{handlers::tweet_handler, states::DbState};

pub fn routes() -> Router<DbState> {
    Router::new().route(
        "/tweets",
        get(tweet_handler::get_tweets).post(tweet_handler::create_tweet),
    )
}
