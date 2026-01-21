use crate::{
    helpers::errors::AppError,
    models::tweet_model::{CreateTweetData, Tweet, TweetUser},
    states::DbState,
};

pub struct TweetService;

impl TweetService {
    pub async fn get_tweets(db: &DbState, user_id: i32) -> Result<Vec<Tweet>, AppError> {
        let rows = sqlx::query!(
            r#"
            SELECT
                t.id,
                t.content,
                t.image,
                t.created_at,
                u.id as user_id,
                u.name,
                u.username,
                u.image_profile,
                COUNT(l.id) as likes_count,
                CASE WHEN l2.id is NOT NULL THEN true ELSE false END as is_liked_by_user
            FROM tweets t
            LEFT JOIN users u ON t.user_id = u.id
            LEFT JOIN likes l ON t.id = l.tweet_id
            LEFT JOIN likes l2 ON t.id = l2.tweet_id AND l2.user_id = $1
            GROUP BY
                t.id,
                u.id,
                u.name,
                u.username,
                u.image_profile,
                l2.id
            ORDER BY t.created_at DESC
            "#,
            user_id
        )
        .fetch_all(db)
        .await?;

        let tweets: Vec<Tweet> = rows
            .into_iter()
            .map(|row| Tweet {
                id: row.id,
                content: row.content,
                image: row.image,
                created_at: row.created_at,
                user: TweetUser {
                    id: row.user_id,
                    name: row.name,
                    username: row.username,
                    profile_image: row.image_profile,
                },
                likes_count: row.likes_count.unwrap_or(0) as i32,
                is_liked_by_user: row.is_liked_by_user.unwrap_or(false),
            })
            .collect();

        Ok(tweets)
    }

    pub async fn create_tweet(
        db: &DbState,
        user_id: i32,
        data: CreateTweetData,
    ) -> Result<Tweet, AppError> {
        let tweet_id: i32 = sqlx::query_scalar!(
            r#"
            INSERT INTO tweets (user_id, content, image)
            VALUES ($1, $2, $3)
            RETURNING id
            "#,
            user_id,
            data.content,
            data.image
        )
        .fetch_one(db)
        .await?;

        println!("{:?}", data);

        let tweet = Self::get_tweet_by_id(db, tweet_id, user_id).await?;

        Ok(tweet)
    }

    pub async fn get_tweet_by_id(
        db: &DbState,
        tweet_id: i32,
        user_id: i32,
    ) -> Result<Tweet, AppError> {
        let row = sqlx::query!(
            r#"
            SELECT
                t.id,
                t.content,
                t.image,
                t.created_at,
                u.id as user_id,
                u.name,
                u.username,
                u.image_profile,
                COUNT(l.id) as likes_count,
                CASE WHEN l2.id IS NOT NULL THEN true ELSE false END as is_liked_by_user
            FROM tweets t
            LEFT JOIN users u ON t.user_id = u.id
            LEFT JOIN likes l ON t.id = l.tweet_id
             LEFT JOIN likes l2 ON t.id = l2.tweet_id AND l2.user_id = $1
            WHERE t.id = $2
            GROUP BY
                t.id,
                u.id,
                u.name,
                u.username,
                u.image_profile,
                l2.id
            "#,
            user_id,
            tweet_id
        )
        .fetch_one(db)
        .await?;

        let tweet = Tweet {
            id: row.id,
            content: row.content,
            image: row.image,
            created_at: row.created_at,
            user: TweetUser {
                id: row.user_id,
                name: row.name,
                username: row.username,
                profile_image: row.image_profile,
            },
            likes_count: row.likes_count.unwrap_or(0) as i32,
            is_liked_by_user: row.is_liked_by_user.unwrap_or(false),
        };

        Ok(tweet)
    }

    pub async fn get_tweets_by_user(db: &DbState, user_id: i32) -> Result<Vec<Tweet>, AppError> {
        let rows = sqlx::query!(
            r#"
            SELECT
                t.id,
                t.content,
                t.image,
                t.created_at,
                u.id as user_id,
                u.name,
                u.username,
                u.image_profile,
                COUNT(l.id) as likes_count,
                CASE WHEN l2.id is NOT NULL THEN true ELSE false END as is_liked_by_user
            FROM tweets t
            LEFT JOIN users u ON t.user_id = u.id
            LEFT JOIN likes l ON t.id = l.tweet_id
            LEFT JOIN likes l2 ON t.id = l2.tweet_id AND l2.user_id = $1
            WHERE t.user_id = $2
            GROUP BY
                t.id,
                u.id,
                u.name,
                u.username,
                u.image_profile,
                l2.id
            ORDER BY t.created_at DESC
            "#,
            user_id,
            user_id
        )
        .fetch_all(db)
        .await?;

        let tweets: Vec<Tweet> = rows
            .into_iter()
            .map(|row| Tweet {
                id: row.id,
                content: row.content,
                image: row.image,
                created_at: row.created_at,
                user: TweetUser {
                    id: row.user_id,
                    name: row.name,
                    username: row.username,
                    profile_image: row.image_profile,
                },
                likes_count: row.likes_count.unwrap_or(0) as i32,
                is_liked_by_user: row.is_liked_by_user.unwrap_or(false),
            })
            .collect();

        Ok(tweets)
    }

    pub async fn get_liked_tweets_by_user(
        db: &DbState,
        user_id: i32,
    ) -> Result<Vec<Tweet>, AppError> {
        let rows = sqlx::query!(
            r#"
            SELECT
                t.id,
                t.content,
                t.image,
                t.created_at,
                u.id as user_id,
                u.name,
                u.username,
                u.image_profile,
                COUNT(l.id) as likes_count,
                CASE WHEN l2.id IS NOT NULL THEN true ELSE false END as is_liked_by_user
            FROM likes lk
            LEFT JOIN tweets t ON lk.tweet_id = t.id
            LEFT JOIN users u ON t.user_id = u.id
            LEFT JOIN likes l ON t.id = l.tweet_id
            LEFT JOIN likes l2 ON t.id = l2.tweet_id AND l2.user_id = $1
            WHERE lk.user_id = $2
            GROUP BY
                t.id,
                u.id,
                u.name,
                u.username,
                u.image_profile,
                l2.id,
                lk.created_at
            ORDER BY lk.created_at DESC
            "#,
            user_id,
            user_id
        )
        .fetch_all(db)
        .await?;

        let tweets: Vec<Tweet> = rows
            .into_iter()
            .map(|row| Tweet {
                id: row.id,
                content: row.content,
                image: row.image,
                created_at: row.created_at,
                user: TweetUser {
                    id: row.user_id,
                    name: row.name,
                    username: row.username,
                    profile_image: row.image_profile,
                },
                likes_count: row.likes_count.unwrap_or(0) as i32,
                is_liked_by_user: row.is_liked_by_user.unwrap_or(false),
            })
            .collect();

        Ok(tweets)
    }

    pub async fn delete_tweet(db: &DbState, tweet_id: i32, user_id: i32) -> Result<(), AppError> {
        let tweet_owner = sqlx::query_scalar!("SELECT user_id FROM tweets WHERE id = $1", tweet_id)
            .fetch_optional(db)
            .await?;

        match tweet_owner {
            Some(owner_id) if owner_id == user_id => {
                sqlx::query!("DELETE FROM tweets WHERE id = $1", tweet_id)
                    .execute(db)
                    .await?;

                Ok(())
            }
            Some(_) => Err(AppError::Unauthorized(
                "You cannot delete this tweet".to_string(),
            )),
            None => Err(AppError::NotFound("Tweet not found".to_string())),
        }
    }
}
