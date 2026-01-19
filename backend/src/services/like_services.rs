use crate::{helpers::errors::AppError, models::like_model::LikePayload, states::DbState};

pub struct LikeService;

impl LikeService {
    pub async fn toggle_like(db: &DbState, payload: LikePayload) -> Result<bool, AppError> {
        let exists_option: Option<bool> = sqlx::query_scalar!(
            "SELECT EXISTS(SELECT 1 FROM likes WHERE user_id = $1 AND tweet_id = $2)",
            payload.user_id,
            payload.tweet_id
        )
        .fetch_one(db)
        .await?;

        let exists: bool = exists_option.unwrap_or(false);

        if exists {
            // quitar like
            sqlx::query!(
                "DELETE FROM likes WHERE user_id = $1 AND tweet_id = $2",
                payload.user_id,
                payload.tweet_id
            )
            .execute(db)
            .await?;
            Ok(false) // ya no hay like
        } else {
            // agregar like
            sqlx::query!(
                "INSERT INTO likes (user_id, tweet_id) VALUES ($1, $2)",
                payload.user_id,
                payload.tweet_id
            )
            .execute(db)
            .await?;
            Ok(true) // ahora si hay like
        }
    }

    pub async fn get_likes_count(db: &DbState, payload: LikePayload) -> Result<i64, AppError> {
        let count: Option<i64> = sqlx::query_scalar!(
            "SELECT COUNT(*) FROM likes WHERE tweet_id = $1",
            payload.tweet_id
        )
        .fetch_one(db)
        .await?;

        let count: i64 = count.unwrap_or(0);

        Ok(count)
    }

    pub async fn is_liked_by_user(db: &DbState, payload: LikePayload) -> Result<bool, AppError> {
        let exists: Option<Option<bool>> = sqlx::query_scalar!(
            "SELECT EXISTS(SELECT 1 FROM likes WHERE user_id = $1 AND tweet_id = $2)",
            payload.user_id,
            payload.tweet_id
        )
        .fetch_optional(db)
        .await?;

        let exists: bool = exists.unwrap().unwrap_or(false);

        Ok(exists)
    }
}
