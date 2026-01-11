use axum::{Router, middleware, routing::get};

use crate::{
    handlers::profile_handler::profile_handler, middleware::auth_middleware::auth_middleware,
    states::DbState,
};

pub fn routes() -> Router<DbState> {
    Router::new()
        .route("/perfil", get(profile_handler))
        .layer(middleware::from_fn(auth_middleware))
}
