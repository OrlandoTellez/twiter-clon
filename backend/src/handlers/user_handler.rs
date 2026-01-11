use axum::{Json, extract::State};
use axum_extra::extract::cookie::CookieJar;

use crate::{
    helpers::{check_session::check_session, errors::AppError},
    models::{auth_model::Claim, user_model::User},
    services::user_services::UserService,
    states::DbState,
};

pub async fn get_my_profile(
    jar: CookieJar,
    State(db): State<DbState>,
) -> Result<Json<User>, AppError> {
    // validar sesión
    let claims: Claim = check_session(&jar)?;

    // obtener usuario desde DB
    let user = UserService::get_user_by_username(&db, &claims.sub).await?;

    // devolver perfil
    Ok(Json(user))
}
