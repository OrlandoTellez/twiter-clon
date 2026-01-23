use crate::{
    helpers::errors::AppError,
    models::comment_model::{Comment, CommentUser, CreateCommentData},
    states::DbState,
};

pub struct CommentService;

impl CommentService {
    /// Obtener todos los comentarios de un tweet específico
    pub async fn get_comments_by_tweet(
        db: &DbState,
        tweet_id: i32,
        _current_user_id: i32,
    ) -> Result<Vec<Comment>, AppError> {
        let rows = sqlx::query!(
            r#"
            SELECT
                c.id,
                c.content,
                c.tweet_id,
                c.created_at,
                u.id as user_id,
                u.name,
                u.username,
                u.image_profile
            FROM comments c
            LEFT JOIN users u ON c.user_id = u.id
            WHERE c.tweet_id = $1
            ORDER BY c.created_at ASC
            "#,
            tweet_id
        )
        .fetch_all(db)
        .await?;

        let comments: Vec<Comment> = rows
            .into_iter()
            .map(|row| Comment {
                id: row.id,
                content: row.content,
                tweet_id: row.tweet_id,
                created_at: row.created_at,
                user: CommentUser {
                    id: row.user_id,
                    name: row.name,
                    username: row.username,
                    profile_image: row.image_profile,
                },
            })
            .collect();

        Ok(comments)
    }

    /// Crear un nuevo comentario
    pub async fn create_comment(
        db: &DbState,
        user_id: i32,
        data: CreateCommentData,
    ) -> Result<Comment, AppError> {
        // Primero verificamos que el tweet exista
        let tweet_exists =
            sqlx::query_scalar!("SELECT id FROM tweets WHERE id = $1", data.tweet_id)
                .fetch_optional(db)
                .await?;

        if tweet_exists.is_none() {
            return Err(AppError::NotFound("Tweet not found".to_string()));
        }

        // Insertamos el comentario
        let comment_id: i32 = sqlx::query_scalar!(
            r#"
            INSERT INTO comments (user_id, tweet_id, content)
            VALUES ($1, $2, $3)
            RETURNING id
            "#,
            user_id,
            data.tweet_id,
            data.content
        )
        .fetch_one(db)
        .await?;

        // Obtenemos el comentario completo con los datos del usuario
        Self::get_comment_by_id(db, comment_id).await
    }

    /// Obtener un comentario específico por ID
    pub async fn get_comment_by_id(db: &DbState, comment_id: i32) -> Result<Comment, AppError> {
        let row = sqlx::query!(
            r#"
            SELECT
                c.id,
                c.content,
                c.tweet_id,
                c.created_at,
                u.id as user_id,
                u.name,
                u.username,
                u.image_profile
            FROM comments c
            LEFT JOIN users u ON c.user_id = u.id
            WHERE c.id = $1
            "#,
            comment_id
        )
        .fetch_one(db)
        .await?;

        let comment = Comment {
            id: row.id,
            content: row.content,
            tweet_id: row.tweet_id,
            created_at: row.created_at,
            user: CommentUser {
                id: row.user_id,
                name: row.name,
                username: row.username,
                profile_image: row.image_profile,
            },
        };

        Ok(comment)
    }

    /// Eliminar un comentario (solo el autor puede eliminarlo)
    pub async fn delete_comment(
        db: &DbState,
        comment_id: i32,
        user_id: i32,
    ) -> Result<(), AppError> {
        let comment_owner =
            sqlx::query_scalar!("SELECT user_id FROM comments WHERE id = $1", comment_id)
                .fetch_optional(db)
                .await?;

        match comment_owner {
            Some(owner_id) if owner_id == user_id => {
                sqlx::query!("DELETE FROM comments WHERE id = $1", comment_id)
                    .execute(db)
                    .await?;

                Ok(())
            }
            Some(_) => Err(AppError::Unauthorized(
                "You cannot delete this comment".to_string(),
            )),
            None => Err(AppError::NotFound("Comment not found".to_string())),
        }
    }

    /// Obtener el conteo de comentarios de un tweet
    pub async fn get_comments_count(db: &DbState, tweet_id: i32) -> Result<i32, AppError> {
        let count = sqlx::query_scalar!(
            "SELECT COUNT(*) as count FROM comments WHERE tweet_id = $1",
            tweet_id
        )
        .fetch_one(db)
        .await?;

        Ok(count.unwrap_or(0) as i32)
    }

    /// Obtener todos los comentarios de un usuario específico
    pub async fn get_comments_by_user(
        db: &DbState,
        user_id: i32,
    ) -> Result<Vec<Comment>, AppError> {
        let rows = sqlx::query!(
            r#"
            SELECT
                c.id,
                c.content,
                c.tweet_id,
                c.created_at,
                u.id as user_id,
                u.name,
                u.username,
                u.image_profile
            FROM comments c
            LEFT JOIN users u ON c.user_id = u.id
            WHERE c.user_id = $1
            ORDER BY c.created_at DESC
            "#,
            user_id
        )
        .fetch_all(db)
        .await?;

        let comments: Vec<Comment> = rows
            .into_iter()
            .map(|row| Comment {
                id: row.id,
                content: row.content,
                tweet_id: row.tweet_id,
                created_at: row.created_at,
                user: CommentUser {
                    id: row.user_id,
                    name: row.name,
                    username: row.username,
                    profile_image: row.image_profile,
                },
            })
            .collect();

        Ok(comments)
    }
}
