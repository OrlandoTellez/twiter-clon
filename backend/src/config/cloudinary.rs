use crate::config::constants::{CLOUDINARY_KEY, CLOUDINARY_NAME, CLOUDINARY_SECRET};

pub struct CloudinaryConfig {
    pub cloudinary_name: String,
    pub cloudinary_key: String,
    pub cloudinary_secret: String,
}

impl CloudinaryConfig {
    pub fn from_env() -> Self {
        Self {
            cloudinary_name: CLOUDINARY_NAME.to_string(),
            cloudinary_key: CLOUDINARY_KEY.to_string(),
            cloudinary_secret: CLOUDINARY_SECRET.to_string(),
        }
    }
}
