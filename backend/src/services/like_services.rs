use crate::{helpers::errors::AppError, states::DbState};

pub struct LikeService;

impl LikeService {
    pub async fn toggle_like(db: &DbState, user_id: i32, tweet_id: i32) -> Result<bool, AppError> {
        let exists_option: Option<bool> = sqlx::query_scalar!(
            "SELECT EXISTS(SELECT 1 FROM Likes WHERE user_id = $1 AND tweet_id = $2)",
            user_id,
            tweet_id
        )
        .fetch_one(db)
        .await?;

        let exists = exists_option.unwrap_or(false);

        if exists {
            // quitar like
            sqlx::query!(
                "DELETE FROM Likes WHERE user_id = $1 AND tweet_id = $2",
                user_id,
                tweet_id
            )
            .execute(db)
            .await?;
            Ok(false) // ya no hay like
        } else {
            // agregar like
            sqlx::query!(
                "INSERT INTO Likes (user_id, tweet_id) VALUES ($1, $2)",
                user_id,
                tweet_id
            )
            .execute(db)
            .await?;
            Ok(true) // ahora si hay like
        }
    }

    pub async fn get_likes_count(db: &DbState, tweet_id: i32) -> Result<i64, AppError> {
        let count: Option<i64> =
            sqlx::query_scalar!("SELECT COUNT(*) FROM Likes WHERE tweet_id = $1", tweet_id)
                .fetch_one(db)
                .await?;

        let count: i64 = count.unwrap_or(0);

        Ok(count)
    }

    pub async fn is_liked_by_user(
        db: &DbState,
        user_id: i32,
        tweet_id: i32,
    ) -> Result<bool, AppError> {
        let exists: Option<Option<bool>> = sqlx::query_scalar!(
            "SELECT EXISTS(SELECT 1 FROM Likes WHERE user_id = $1 AND tweet_id = $2)",
            user_id,
            tweet_id
        )
        .fetch_optional(db)
        .await?;

        let exists: bool = exists.unwrap().unwrap_or(false);

        Ok(exists)
    }
}
