use crate::{
    helpers::errors::AppError,
    models::tweet_model::{CreateTweetData, Tweet},
    states::DbState,
};

pub struct TweetService;

impl TweetService {
    pub async fn get_tweets(db: &DbState) -> Result<Vec<Tweet>, AppError> {
        let tweets: Vec<Tweet> = sqlx::query_as!(
            Tweet,
            r#"
            SELECT id, user_id, content, image, created_at 
            FROM tweets 
            ORDER BY created_at DESC
            "#,
        )
        .fetch_all(db)
        .await?;

        Ok(tweets)
    }

    pub async fn create_tweet(
        db: &DbState,
        user_id: i32,
        data: CreateTweetData,
    ) -> Result<Tweet, AppError> {
        let tweet: Tweet = sqlx::query_as!(
            Tweet,
            r#"
            INSERT INTO tweets (user_id, content, image)
            VALUES ($1, $2, $3)
            RETURNING id, user_id, content, image, created_at
            "#,
            user_id,
            data.content,
            data.image
        )
        .fetch_one(db)
        .await?;

        Ok(tweet)
    }
}
