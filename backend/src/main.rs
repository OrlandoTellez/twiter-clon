mod handlers;
mod routes;
mod states;

use dotenvy::dotenv;

use axum::Router;
use tokio::net::TcpListener;

const PORT: &str = "3000";
const HOST: &str = "0.0.0.0";

#[tokio::main]
async fn main() {
    dotenv().ok();

    let app: Router = routes::create_routes();

    let addr: String = format!("{}:{}", &HOST, &PORT);

    let listener: TcpListener = TcpListener::bind(&addr).await.unwrap();

    println!("Server initialize in http://{}", &addr);

    axum::serve(listener, app).await.unwrap()
}
