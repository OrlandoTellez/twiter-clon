use axum::{Router, middleware, routing::post};

use crate::{
    handlers::user_handler::upload_profile_image, middleware::auth_middleware::auth_middleware,
    states::DbState,
};

pub fn routes() -> Router<DbState> {
    Router::new()
        .route("/media/profile-image", post(upload_profile_image))
        .layer(middleware::from_fn(auth_middleware))
}
