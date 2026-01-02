use axum::{Router, routing::post};

use crate::{handlers::auth_handler, states::DbState};

pub fn routes() -> Router<DbState> {
    Router::new()
        .route("/auth/register", post(auth_handler::resgister_user))
        .route("/auth/login", post(auth_handler::login_user))
}
