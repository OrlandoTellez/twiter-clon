pub mod v1;

use axum::Router;

use v1::v1_routes;

use crate::states::DbState;

pub fn create_routes() -> Router<DbState> {
    Router::new().nest("/api/v1", v1_routes())
}
