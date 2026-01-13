use std::env;

use once_cell::sync::Lazy;

pub static DATABASE_URL: Lazy<String> =
    Lazy::new(|| env::var("DATABASE_URL").expect("Se necesita la variable de entorno"));

pub static JWT_SECRET: Lazy<String> =
    Lazy::new(|| env::var("JWT_SECRET").expect("Se necesita la variable de entorno"));

pub static FRONTEND_URL: Lazy<String> =
    Lazy::new(|| env::var("FRONTEND_URL").expect("Se necesita la variable de entoron"));

pub static CLOUDINARY_NAME: Lazy<String> =
    Lazy::new(|| env::var("CLOUDINARY_NAME").expect("Se necesita la variable de entorno"));

pub static CLOUDINARY_KEY: Lazy<String> =
    Lazy::new(|| env::var("CLOUDINARY_KEY").expect("Se necesita la variable de entorno"));

pub static CLOUDINARY_SECRET: Lazy<String> =
    Lazy::new(|| env::var("CLOUDINARY_SECRET").expect("Se necesita la variable de entorno"));
