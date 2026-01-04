mod config;
mod handlers;
mod helpers;
mod models;
mod routes;
mod services;
mod states;

use dotenvy::dotenv;

use axum::{Router, http};
use sqlx::postgres::PgPoolOptions;
use tokio::net::TcpListener;
use tower_http::cors::CorsLayer;

use crate::config::constants::{DATABASE_URL, FRONTEND_URL};

const PORT: &str = "3000";
const HOST: &str = "0.0.0.0";

#[tokio::main]
async fn main() {
    dotenv().ok();

    let cors = CorsLayer::new()
        .allow_origin(FRONTEND_URL.parse::<http::HeaderValue>().unwrap())
        .allow_methods([
            http::Method::GET,
            http::Method::POST,
            http::Method::PUT,
            http::Method::DELETE,
        ])
        .allow_headers([http::header::CONTENT_TYPE, http::header::AUTHORIZATION])
        .allow_credentials(true);

    let db = PgPoolOptions::new()
        .max_connections(5)
        .connect(&DATABASE_URL)
        .await
        .expect("Failed to connect to database");

    let app: Router = routes::create_routes().with_state(db).layer(cors);

    let addr: String = format!("{}:{}", &HOST, &PORT);

    let listener: TcpListener = TcpListener::bind(&addr).await.unwrap();

    println!("Server initialize in http://{}", &addr);

    axum::serve(listener, app).await.unwrap()
}
