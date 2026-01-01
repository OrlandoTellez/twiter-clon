pub mod v1;

use axum::Router;

use v1::v1_routes;

pub fn create_routes() -> Router {
    Router::new().nest("/api/v1", v1_routes())
}
