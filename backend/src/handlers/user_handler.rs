use axum::{
    Json,
    extract::{Multipart, State},
    http::StatusCode,
};
use axum_extra::extract::cookie::CookieJar;

use crate::{
    helpers::{check_session::check_session, errors::AppError},
    models::{auth_model::Claim, user_model::User},
    services::cloudinary_services,
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

pub async fn upload_profile_image(
    jar: CookieJar,
    State(db): State<DbState>,
    mut multipart: Multipart,
) -> Result<Json<serde_json::Value>, AppError> {
    // chequear la sesion
    let claims: Claim = check_session(&jar)?;

    // crear el espacion donde se guardaran los bytes de la imagen
    let mut image_bytes: Option<Vec<u8>> = None;

    // se procesa el multipart, se le pone de titulo "image"
    while let Some(field) = multipart
        .next_field()
        .await
        .map_err(|_| AppError::BadRequest("Error leyendo multipart".into()))?
    {
        if field.name() == Some("image") {
            image_bytes = Some(
                field
                    .bytes()
                    .await
                    .map_err(|_| AppError::BadRequest("Error leyendo archivo".into()))?
                    .to_vec(),
            );
        }
    }

    let image_bytes: Vec<u8> =
        image_bytes.ok_or(AppError::BadRequest("No se subió ninguna imagen".into()))?;

    let image_url: String = cloudinary_services::upload_image(image_bytes, "twitter-clone")
        .await
        .map_err(|_| AppError::InternalServerError("Error subiendo imagen".into()))?;

    UserService::update_profile_image(&db, &claims.sub, &image_url).await?;

    Ok(Json(serde_json::json!({
        "message": "Imagen de perfil actualizada",
        "image_url": image_url
    })))
}

pub async fn update_profile(
    jar: CookieJar,
    State(db): State<DbState>,
    mut multipart: Multipart,
) -> Result<Json<User>, AppError> {
    let claims: Claim = check_session(&jar)?;

    let mut name: Option<String> = None;
    let mut image_bytes: Option<Vec<u8>> = None;

    while let Some(field) = multipart
        .next_field()
        .await
        .map_err(|_| AppError::BadRequest("Error leyendo multipart".into()))?
    {
        match field.name() {
            Some("name") => {
                name = Some(
                    field
                        .text()
                        .await
                        .map_err(|_| AppError::BadRequest("Error leyendo nombre".into()))?,
                );
            }
            Some("image") => {
                image_bytes = Some(
                    field
                        .bytes()
                        .await
                        .map_err(|_| AppError::BadRequest("Error leyendo archivo".into()))?
                        .to_vec(),
                );
            }
            _ => {}
        }
    }

    let name: String = name.ok_or(AppError::BadRequest("Nombre requerido".into()))?;

    let mut image_url: Option<String> = None;
    if let Some(bytes) = image_bytes {
        image_url = Some(
            cloudinary_services::upload_image(bytes, "twitter-clone")
                .await
                .map_err(|_| AppError::InternalServerError("Error subiendo imagen".into()))?,
        );
    }

    let user: User =
        UserService::update_profile(&db, &claims.sub, &name, image_url.as_deref()).await?;

    Ok(Json(user))
}
