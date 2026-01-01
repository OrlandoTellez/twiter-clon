use axum::Router;

pub mod index;

pub fn v1_routes() -> Router {
    Router::new().merge(index::routes())
}
