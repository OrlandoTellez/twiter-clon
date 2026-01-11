use axum::{extract::Request, middleware::Next, response::Response};
use axum_extra::extract::cookie::CookieJar;

use crate::helpers::{check_session::check_session, errors::AppError};
use crate::models::auth_model::Claim;

pub async fn auth_middleware(
    jar: CookieJar,
    req: Request,
    next: Next,
) -> Result<Response, AppError> {
    let _claims: Claim = check_session(&jar)?;
    Ok(next.run(req).await)
}
