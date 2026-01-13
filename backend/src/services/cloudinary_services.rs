use crate::config::cloudinary::CloudinaryConfig;
use crate::models::cloudinary_model::CloudinaryResponse;
use chrono::Utc;
use reqwest::{
    Client,
    multipart::{Form, Part},
};
use sha2::{Digest, Sha256};
use uuid::Uuid;

pub async fn upload_image(
    bytes: Vec<u8>,
    folder: &str,
) -> Result<String, Box<dyn std::error::Error>> {
    // traemos la configuracion de cloudinary
    let config: CloudinaryConfig = CloudinaryConfig::from_env();
    let timestamp: i64 = Utc::now().timestamp();

    // establecemos un id publico
    let public_id: String = Uuid::new_v4().to_string();

    // Firma (como hace cloudinary internamente)
    let mut hasher = Sha256::new();
    hasher.update(format!(
        "folder={}&public_id={}&timestamp={}{}",
        folder, public_id, timestamp, config.cloudinary_secret
    ));
    let signature: String = format!("{:x}", hasher.finalize());

    let form: Form = Form::new()
        .part(
            "file",
            Part::bytes(bytes)
                .file_name("image.png")
                .mime_str("image/png")?,
        )
        .text("api_key", config.cloudinary_key)
        .text("timestamp", timestamp.to_string())
        .text("signature", signature)
        .text("folder", folder.to_string())
        .text("public_id", public_id);

    let url: String = format!(
        "https://api.cloudinary.com/v1_1/{}/image/upload",
        config.cloudinary_name
    );

    let res: CloudinaryResponse = Client::new()
        .post(url)
        .multipart(form)
        .send()
        .await?
        .json::<CloudinaryResponse>()
        .await?;

    Ok(res.secure_url)
}
