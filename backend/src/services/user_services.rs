use crate::{helpers::errors::AppError, models::user_model::User, states::DbState};

pub struct UserService;

impl UserService {
    pub async fn get_user_by_username(db: &DbState, username: &str) -> Result<User, AppError> {
        let user: User = sqlx::query_as!(
            User,
            r#"
            SELECT
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
            FROM users
            WHERE username = $1
            "#,
            username
        )
        .fetch_one(db)
        .await?;

        Ok(user)
    }
}
