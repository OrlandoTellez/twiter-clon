use crate::{
    helpers::errors::AppError,
    models::user_model::{UpdateUserData, User},
    states::DbState,
};
use sqlx::Postgres;

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

    // al parecer esta es de las mejores maneras para actualizar el perfil, lo estuve probando y
    // funciona correctamente, es seguro
    pub async fn update_profile(
        db: &DbState,
        username: &str,
        data: UpdateUserData,
    ) -> Result<User, AppError> {
        use sqlx::QueryBuilder;

        let mut qb = QueryBuilder::<Postgres>::new("UPDATE users SET ");

        // vector para los campos a actualizar
        let mut fields_updated = 0;

        if let Some(name) = data.name {
            if fields_updated > 0 {
                qb.push(", ");
            }
            qb.push("name = ").push_bind(name);
            fields_updated += 1;
        }

        if let Some(last_name) = data.last_name {
            if fields_updated > 0 {
                qb.push(", ");
            }
            qb.push("last_name = ").push_bind(last_name);
            fields_updated += 1;
        }

        if let Some(age) = data.age {
            if fields_updated > 0 {
                qb.push(", ");
            }
            qb.push("age = ").push_bind(age);
            fields_updated += 1;
        }

        if let Some(email) = data.email {
            if fields_updated > 0 {
                qb.push(", ");
            }
            qb.push("email = ").push_bind(email);
            fields_updated += 1;
        }

        if let Some(bio) = data.bio {
            if fields_updated > 0 {
                qb.push(", ");
            }
            qb.push("bio = ").push_bind(bio);
            fields_updated += 1;
        }

        if let Some(image_profile) = data.image_profile {
            if fields_updated > 0 {
                qb.push(", ");
            }
            qb.push("image_profile = ").push_bind(image_profile);
            fields_updated += 1;
        }

        if let Some(image_banner) = data.image_banner {
            if fields_updated > 0 {
                qb.push(", ");
            }
            qb.push("image_banner = ").push_bind(image_banner);
            fields_updated += 1;
        }

        if fields_updated == 0 {
            return Err(AppError::BadRequest("No hay campos para actualizar".into()));
        }

        qb.push(" WHERE username = ").push_bind(username);

        qb.push(
        " RETURNING id, name, last_name, age, email, username, bio, image_profile, image_banner, created_at",
    );

        let user = qb
            .build_query_as::<User>()
            .fetch_one(db)
            .await
            .map_err(AppError::from)?;

        Ok(user)
    }
}
