pub mod index;
use axum::Router;

pub fn create_routes() -> Router {
    Router::new().merge(index::routes())
}
