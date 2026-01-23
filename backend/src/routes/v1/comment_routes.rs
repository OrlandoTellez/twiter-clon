use axum::{
    Router,
    routing::{delete, get, post},
};

use crate::{handlers::comment_handler, states::DbState};

pub fn routes() -> Router<DbState> {
    Router::new()
        // Obtener todos los comentarios de un tweet específico
        .route(
            "/tweets/{tweet_id}/comments",
            get(comment_handler::get_comments_by_tweet),
        )
        // Crear un nuevo comentario
        .route("/comments", post(comment_handler::create_comment))
        // Eliminar un comentario específico
        .route(
            "/comments/{comment_id}",
            delete(comment_handler::delete_comment),
        )
        // Obtener todos los comentarios del usuario logueado
        .route("/comments/me", get(comment_handler::get_comments_by_user))
        // Obtener el conteo de comentarios de un tweet (endpoint auxiliar)
        .route(
            "/tweets/{tweet_id}/comments/count",
            get(comment_handler::get_comments_count),
        )
}
