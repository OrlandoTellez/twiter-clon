use axum::{
    Router,
    routing::{delete, get, post},
};

use crate::{handlers::tweet_handler, states::DbState};

pub fn routes() -> Router<DbState> {
    Router::new()
        //este no es para crear un tweet sin imagen
        .route(
            "/tweets",
            get(tweet_handler::get_tweets).post(tweet_handler::create_tweet),
        )
        //este no es para crear un tweet con imagen, este es mejor porque es opcional la imagen, asiq ue mejor usar este
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
