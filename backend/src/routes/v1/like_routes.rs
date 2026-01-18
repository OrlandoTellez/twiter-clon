use axum::Router;
use axum::routing::post;

use crate::handlers::like_handler::{get_likes_count, is_liked_by_user, toggle_like};
use crate::states::DbState;

pub fn routes() -> Router<DbState> {
    Router::new()
        .route("/like/toggle", post(toggle_like))
        .route("/like/count", post(get_likes_count))
        .route("/like/is-liked", post(is_liked_by_user))
}
