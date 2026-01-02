use crate::{handlers::index_handler, states::DbState};
use axum::{Router, routing::get};

pub fn routes() -> Router<DbState> {
    Router::new().route("/", get(index_handler::hello_world))
}
