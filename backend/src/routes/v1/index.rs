use crate::handlers::index_handler;
use axum::{Router, routing::get};

pub fn routes() -> Router {
    Router::new().route("/", get(index_handler::hello_world))
}
