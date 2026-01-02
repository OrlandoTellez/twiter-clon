use axum::Router;

use crate::states::DbState;

pub mod auth_routes;
pub mod index;

pub fn v1_routes() -> Router<DbState> {
    Router::new()
        .merge(index::routes())
        .merge(auth_routes::routes())
}
