use axum_extra::extract::cookie::{Cookie, SameSite};
use time::Duration;

pub fn build_session_cookie(token: String) -> Cookie<'static> {
    Cookie::build(("session", token))
        .http_only(true)
        .same_site(SameSite::Lax)
        .path("/")
        .max_age(Duration::hours(24))
        .build()
}
