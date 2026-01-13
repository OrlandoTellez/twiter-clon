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

    pub async fn update_profile_image(
        db: &DbState,
        username: &str,
        image_url: &str,
    ) -> Result<(), AppError> {
        sqlx::query!(
            "UPDATE users SET image_profile = $1 WHERE username = $2",
            image_url,
            username
        )
        .execute(db)
        .await?;

        Ok(())
    }

    pub async fn update_profile(
        db: &DbState,
        username: &str,
        name: Option<&str>,
        image_url: Option<&str>,
    ) -> Result<User, AppError> {
        match (name, image_url) {
            (Some(n), Some(img)) => {
                sqlx::query!(
                    "UPDATE users SET name = $1, image_profile = $2 WHERE username = $3",
                    n,
                    img,
                    username
                )
                .execute(db)
                .await?;
            }
            (Some(n), None) => {
                sqlx::query!(
                    "UPDATE users SET name = $1 WHERE username = $2",
                    n,
                    username
                )
                .execute(db)
                .await?;
            }
            (None, Some(img)) => {
                sqlx::query!(
                    "UPDATE users SET image_profile = $1 WHERE username = $2",
                    img,
                    username
                )
                .execute(db)
                .await?;
            }
            (None, None) => {
                // Nada que actualizar, devolvé el usuario
                return Self::get_user_by_username(db, username).await;
            }
        }

        Self::get_user_by_username(db, username).await
    }
}
