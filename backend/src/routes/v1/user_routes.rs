use axum::Router;
use axum::middleware;
use axum::routing::get;

use crate::states::DbState;
use crate::{
    handlers::user_handler::{get_my_profile, update_profile},
    middleware::auth_middleware::auth_middleware,
};

pub fn routes() -> Router<DbState> {
    Router::new()
        .route("/users/me", get(get_my_profile).patch(update_profile))
        .layer(middleware::from_fn(auth_middleware))
}
