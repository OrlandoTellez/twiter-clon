import pool from "../db/db.js"

export default class Images {
  static async updateProfileImage(id, imagenPerfilUrl) {
    const result = await pool.query("UPDATE usuarios SET imagen_perfil = $1 WHERE id = $2", [imagenPerfilUrl, id])

    return result
  }

  static async updateBannerImage(id, imagenBannerUrl) {
    const result = await pool.query("UPDATE usuarios SET imagen_banner = $1 WHERE id = $2", [imagenBannerUrl, id])

    return result
  }
}
