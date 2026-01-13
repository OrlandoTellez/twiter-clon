use serde::Deserialize;

#[derive(Deserialize, Debug)]
pub struct CloudinaryResponse {
    pub secure_url: String,
}
