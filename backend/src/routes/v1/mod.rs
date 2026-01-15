use axum::Router;

use crate::states::DbState;

pub mod auth_routes;
pub mod index;
pub mod media_routes;
pub mod profile_routes;
pub mod tweet_routes;
pub mod user_routes;

pub fn v1_routes() -> Router<DbState> {
    Router::new()
        .merge(index::routes())
        .merge(auth_routes::routes())
        .merge(profile_routes::routes())
        .merge(user_routes::routes())
        .merge(media_routes::routes())
        .merge(tweet_routes::routes())
}
