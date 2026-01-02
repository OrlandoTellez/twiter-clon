use axum::{
    Json,
    http::StatusCode,
    response::{IntoResponse, Response},
};
use serde_json::json;
use validator::ValidationErrors;

#[derive(Debug)]
pub enum AppError {
    NotFound(String),
    InternalServerError(String),
    ValidationError(ValidationErrors),
}

impl IntoResponse for AppError {
    fn into_response(self) -> Response {
        let (status, message_error) = match self {
            AppError::NotFound(message) => (
                StatusCode::NOT_FOUND,
                json!({
                    "success": false,
                    "message": message
                }),
            ),
            AppError::InternalServerError(message) => (
                StatusCode::INTERNAL_SERVER_ERROR,
                json!({
                    "success": false,
                    "message": message
                }),
            ),
            AppError::ValidationError(err) => {
                let error = err
                    .field_errors()
                    .into_iter()
                    .map(|(field, errors)| {
                        let messages: Vec<String> = errors
                            .iter()
                            .filter_map(|e| e.message.clone())
                            .map(|m| m.to_string())
                            .collect();

                        json!({
                            "field": field,
                            "error": messages
                        })
                    })
                    .collect::<Vec<_>>();

                (
                    StatusCode::BAD_REQUEST,
                    json!({
                        "success": false,
                        "message": "Validation Error",
                        "errors": error
                    }),
                )
            }
        };
        (status, Json(message_error)).into_response()
    }
}

impl From<sqlx::Error> for AppError {
    fn from(err: sqlx::Error) -> Self {
        AppError::InternalServerError(err.to_string())
    }
}
