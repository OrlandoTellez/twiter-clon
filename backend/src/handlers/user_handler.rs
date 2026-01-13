use axum::{
    Json,
    extract::{Multipart, State},
};
use axum_extra::extract::cookie::CookieJar;

use crate::{
    helpers::{check_session::check_session, errors::AppError},
    models::{
        auth_model::Claim,
        user_model::{UpdateUserData, User},
    },
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
    let mut last_name: Option<String> = None;
    let mut age: Option<i32> = None;
    let mut email: Option<String> = None;
    let mut bio: Option<String> = None;

    let mut image_profile_bytes: Option<Vec<u8>> = None;
    let mut image_banner_bytes: Option<Vec<u8>> = None;

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
                        .map_err(|_| AppError::BadRequest("Error leyendo name".into()))?,
                );
            }
            Some("last_name") => {
                last_name = Some(
                    field
                        .text()
                        .await
                        .map_err(|_| AppError::BadRequest("Error leyendo last_name".into()))?,
                );
            }
            Some("age") => {
                let age_str = field
                    .text()
                    .await
                    .map_err(|_| AppError::BadRequest("Error leyendo age".into()))?;

                age = Some(
                    age_str
                        .parse::<i32>()
                        .map_err(|_| AppError::BadRequest("age debe ser número".into()))?,
                );
            }
            Some("email") => {
                email = Some(
                    field
                        .text()
                        .await
                        .map_err(|_| AppError::BadRequest("Error leyendo email".into()))?,
                );
            }
            Some("bio") => {
                bio = Some(
                    field
                        .text()
                        .await
                        .map_err(|_| AppError::BadRequest("Error leyendo bio".into()))?,
                );
            }
            Some("image_profile") => {
                image_profile_bytes = Some(
                    field
                        .bytes()
                        .await
                        .map_err(|_| AppError::BadRequest("Error leyendo image_profile".into()))?
                        .to_vec(),
                );
            }
            Some("image_banner") => {
                image_banner_bytes = Some(
                    field
                        .bytes()
                        .await
                        .map_err(|_| AppError::BadRequest("Error leyendo image_banner".into()))?
                        .to_vec(),
                );
            }
            _ => {}
        }
    }

    // si las imagenes existen subirlas
    let image_profile: Option<String> = if let Some(bytes) = image_profile_bytes {
        Some(
            cloudinary_services::upload_image(bytes, "twitter-clone")
                .await
                .map_err(|_| {
                    AppError::InternalServerError("Error subiendo image_profile".into())
                })?,
        )
    } else {
        None
    };

    let image_banner: Option<String> = if let Some(bytes) = image_banner_bytes {
        Some(
            cloudinary_services::upload_image(bytes, "twitter-clone")
                .await
                .map_err(|_| AppError::InternalServerError("Error subiendo image_banner".into()))?,
        )
    } else {
        None
    };

    let update_data: UpdateUserData = UpdateUserData {
        name,
        last_name,
        age,
        email,
        bio,
        image_profile,
        image_banner,
    };

    let user: User = UserService::update_profile(&db, &claims.sub, update_data).await?;

    Ok(Json(user))
}
