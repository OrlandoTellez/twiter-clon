import pool from "../config/db.js"

export default class Images {
    static async updateProfileImage(id, imagenPerfilUrl) {
        const [result] = await pool.execute("UPDATE usuarios SET imagen_perfil = ? WHERE id = ?", [imagenPerfilUrl, id])
        
        return result
    }

    static async updateBannerImage(id, imagenBannerUrl) {
        const [result] = await pool.execute("UPDATE usuarios SET imagen_banner = ? WHERE id = ?", [imagenBannerUrl, id])
        
        return result
    }
}