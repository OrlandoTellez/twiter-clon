use serde::{Deserialize, Serialize};

#[derive(Serialize, Debug, Deserialize)]
pub struct ApiResponse<T> {
    pub success: bool,
    pub message: String,
    pub data: T,
}
