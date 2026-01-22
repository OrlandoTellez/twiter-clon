use crate::config::cloudinary::CloudinaryConfig;
use crate::models::cloudinary_model::CloudinaryResponse;
use chrono::Utc;
use reqwest::{
    Client,
    multipart::{Form, Part},
};
use sha2::{Digest, Sha256};
use uuid::Uuid;

// Función para detectar el formato de imagen basado en los magic bytes (funciona aajjaj)
fn detect_image_format(bytes: &[u8]) -> (String, &str) {
    if bytes.len() < 4 {
        return ("image.jpg".to_string(), "image/jpeg");
    }

    match bytes {
        // PNG signature: 89 50 4E 47
        [0x89, 0x50, 0x4E, 0x47, ..] => ("image.png".to_string(), "image/png"),
        // JPEG signature: FF D8 FF
        [0xFF, 0xD8, 0xFF, ..] => ("image.jpg".to_string(), "image/jpeg"),
        // GIF signature: 47 49 46 38
        [0x47, 0x49, 0x46, 0x38, ..] => ("image.gif".to_string(), "image/gif"),
        // WebP signature: 52 49 46 46 ... 57 45 42 50
        [0x52, 0x49, 0x46, 0x46, ..] if bytes.len() >= 12 && &bytes[8..12] == b"WEBP" => {
            ("image.webp".to_string(), "image/webp")
        }
        // BMP signature: 42 4D
        [0x42, 0x4D, ..] => ("image.bmp".to_string(), "image/bmp"),
        // TIFF signature (little-endian): 49 49 2A 00
        [0x49, 0x49, 0x2A, 0x00, ..] => ("image.tiff".to_string(), "image/tiff"),
        // TIFF signature (big-endian): 4D 4D 00 2A
        [0x4D, 0x4D, 0x00, 0x2A, ..] => ("image.tiff".to_string(), "image/tiff"),
        // Default a JPEG si no se puede detectar
        _ => ("image.jpg".to_string(), "image/jpeg"),
    }
}

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

    // Detectar el formato de imagen basado en los bytes
    let (file_name, mime_type) = detect_image_format(&bytes);

    let form: Form = Form::new()
        .part(
            "file",
            Part::bytes(bytes.clone())
                .file_name(file_name)
                .mime_str(mime_type)?,
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
