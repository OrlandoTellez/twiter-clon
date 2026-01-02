use axum::{Json, extract::State};

use crate::{
    helpers::{errors::AppError, success_response::success_response},
    models::{
        api_model::ApiResponse,
        auth_model::{AuthResponse, LoginPayload, RegisterPayload},
        user_model::User,
    },
    services::auth_services::AuthService,
    states::DbState,
};

pub async fn resgister_user(
    State(db): State<DbState>,
    Json(payload): Json<RegisterPayload>,
) -> Result<Json<ApiResponse<User>>, AppError> {
    let register_user: User = AuthService::register_user(&db, payload)
        .await
        .map_err(|_| AppError::InternalServerError("Internal server error".to_string()))?;

    let response: ApiResponse<User> = success_response(register_user, "Register user succesfully");

    Ok(Json(response))
}

pub async fn login_user(
    State(db): State<DbState>,
    Json(payload): Json<LoginPayload>,
) -> Result<Json<ApiResponse<AuthResponse>>, AppError> {
    let login_user: AuthResponse = AuthService::login_user(&db, payload).await?;

    let response: ApiResponse<AuthResponse> = success_response(login_user, "Login succesfully");

    Ok(Json(response))
}
