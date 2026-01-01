use axum::{Router, routing::get};

pub fn routes() -> Router {
    Router::new().route("/", get(|| async { "Hello world" }))
}
