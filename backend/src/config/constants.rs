use std::env;

use once_cell::sync::Lazy;

pub static DATABASE_URL: Lazy<String> =
    Lazy::new(|| env::var("DATABASE_URL").expect("Se necesita la variable de entorno"));
