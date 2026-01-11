use axum::Json;
use axum_extra::extract::cookie::CookieJar;

use crate::helpers::check_session::check_session;
use crate::helpers::errors::AppError;
use crate::models::auth_model::Claim;

pub async fn profile_handler(jar: CookieJar) -> Result<Json<String>, AppError> {
    let claims: Claim = check_session(&jar)?;

    Ok(Json(format!("Bienvenido {} a tu perfil", claims.sub)))
}
