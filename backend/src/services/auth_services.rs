use bcrypt::{DEFAULT_COST, hash, verify};

use crate::{
    helpers::{errors::AppError, jwt::enconde_jwt},
    models::{
        auth_model::{LoginPayload, RegisterPayload},
        user_model::User,
    },
    states::DbState,
};

pub struct AuthService;

impl AuthService {
    pub async fn register_user(db: &DbState, payload: RegisterPayload) -> Result<User, AppError> {
        let hashed_password = hash(payload.password, DEFAULT_COST).unwrap();

        let user: User = sqlx::query_as!(
            User,
            r#"
                INSERT INTO users (
                name,
                last_name,
                age,
                email,
                username,
                password,
                bio,
                image_profile,
                image_banner
                )
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
                RETURNING
                id,
                name,
                last_name,
                age,
                email,
                username,
                bio,
                image_profile,
                image_banner,
                created_at
            "#,
            payload.name,
            payload.last_name,
            payload.age,
            payload.email,
            payload.username,
            hashed_password,
            payload.bio,
            payload.image_profile,
            payload.image_banner
        )
        .fetch_one(db)
        .await?;

        Ok(user)
    }

    pub async fn login_user(db: &DbState, payload: LoginPayload) -> Result<String, AppError> {
        let user = sqlx::query!(
            r#"
            SELECT id, username, password
            FROM users
            WHERE username = $1
            "#,
            payload.username
        )
        .fetch_optional(db)
        .await?;

        let user = match user {
            Some(u) => u,
            None => return Err(AppError::NotFound("Invalid credentials".to_string())),
        };

        let valid_password = verify(&payload.password, &user.password)
            .map_err(|_| AppError::InternalServerError("Password verification failed".into()))?;

        if !valid_password {
            return Err(AppError::NotFound("Invalid credentials".into()));
        }

        let token: String = enconde_jwt(user.username)?;

        Ok(token)
    }
}
