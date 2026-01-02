use crate::{
    helpers::errors::AppError,
    models::{auth_model::RegisterPayload, user_model::User},
    states::DbState,
};

pub struct AuthService;

impl AuthService {
    pub async fn register_user(db: &DbState, payload: RegisterPayload) -> Result<User, AppError> {
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
                password, 
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
            payload.password,
            payload.bio,
            payload.image_profile,
            payload.image_banner
        )
        .fetch_one(db)
        .await?;

        Ok(user)
    }
}
