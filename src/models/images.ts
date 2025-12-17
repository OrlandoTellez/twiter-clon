import pool from "../db/db"

export default class Images {
  static async updateProfileImage(id: number, imagenPerfilUrl: string): Promise<any> {
    const result = await pool.query("UPDATE usuarios SET imagen_perfil = $1 WHERE id = $2", [imagenPerfilUrl, id])

    return result
  }

  static async updateBannerImage(id: number, imagenBannerUrl: string): Promise<any> {
    const result = await pool.query("UPDATE usuarios SET imagen_banner = $1 WHERE id = $2", [imagenBannerUrl, id])

    return result
  }
}
