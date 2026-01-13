use axum::{Json, extract::State};
use axum_extra::extract::cookie::CookieJar;

use crate::{
    helpers::{
        cookies::build_session_cookie, errors::AppError, success_response::success_response,
    },
    models::{
        api_model::ApiResponse,
        auth_model::{LoginPayload, RegisterPayload},
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
    jar: CookieJar,
    State(db): State<DbState>,
    Json(payload): Json<LoginPayload>,
) -> Result<(CookieJar, Json<&'static str>), AppError> {
    let token: String = AuthService::login_user(&db, payload).await?;

    let cookie = build_session_cookie(token);

    Ok((jar.add(cookie), Json("Login successfully")))
}
