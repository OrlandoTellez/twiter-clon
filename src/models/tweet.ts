import pool from "../db/db"

export interface TweetData {
  id: number;
  contenido: string;
  imagen?: string;
  usuario_id: number;
  fecha_creacion?: Date;
}

export interface TweetWithUser {
  id: number;
  contenido: string;
  imagen?: string;
  usuario_id: number;
  nombre_usuario: string;
  nombre: string;
  apellido: string;
  imagen_perfil?: string;
  totalLikes: number;
  usuario_dio_like: boolean;
}

export default class Tweet {
  static async createTweet({ usuario_id, contenido }: { usuario_id: number; contenido: string }): Promise<number> {
    const result = await pool.query("INSERT INTO tweets (usuario_id, contenido) VALUES ($1, $2) RETURNING id", [usuario_id, contenido])

    return result.rows[0].id
  }

  static async findAllTweets(usuario_id: number | null): Promise<TweetWithUser[]> {
    let query: string;
    let params: number[];
    if (usuario_id === null) {
      query = `
        SELECT
          t.id,
          t.contenido,
          t.imagen,
          t.usuario_id,
          u.nombre_usuario,
          u.nombre,
          u.apellido,
          u.imagen_perfil,
          (SELECT COUNT(*) FROM likes WHERE tweet_id = t.id) AS totalLikes,
          false AS usuario_dio_like
        FROM tweets t
        JOIN usuarios u ON t.usuario_id = u.id
        ORDER BY t.id DESC
      `;
      params = [];
    } else {
      query = `
        SELECT
          t.id,
          t.contenido,
          t.imagen,
          t.usuario_id,
          u.nombre_usuario,
          u.nombre,
          u.apellido,
          u.imagen_perfil,
          (SELECT COUNT(*) FROM likes WHERE tweet_id = t.id) AS totalLikes,
          EXISTS (SELECT 1 FROM likes WHERE tweet_id = t.id AND usuario_id = $1) AS usuario_dio_like
        FROM tweets t
        JOIN usuarios u ON t.usuario_id = u.id
        ORDER BY t.id DESC
      `;
      params = [usuario_id];
    }
    const result = await pool.query(query, params);
    return result.rows;
  }

  static async findUserTweets(id: number | null): Promise<any[]> {
    const query = `
            SELECT
                u.id AS usuario_id,
                u.nombre_usuario,
                u.nombre,
                u.apellido,
                u.email,
                u.imagen_perfil,
                u.imagen_banner,
                t.id AS tweet_id,
                t.contenido,
                t.imagen,
                t.fecha_creacion AS fecha_tweet
            FROM tweets t
            JOIN usuarios u ON t.usuario_id = u.id
            WHERE u.id = $1
            ORDER BY t.fecha_creacion DESC
        `
    const result = await pool.query(query, [id])
    return result.rows
  }

  static async updateTweetImage(id: number, imagenTweetUrl: string): Promise<any> {
    const result = await pool.query("UPDATE tweets SET imagen = $1 WHERE id = $2", [imagenTweetUrl, id])

    return result
  }

  static async contarLikes(tweet_id: number): Promise<number> {
    const result = await pool.query(
      "SELECT COUNT(*) AS totalLikes FROM likes WHERE tweet_id = $1",
      [tweet_id]
    )
    return result.rows[0].totallikes
  }

  static async existeLike(usuario_id: number, tweet_id: number): Promise<boolean> {
    if (!usuario_id || !tweet_id) {
      throw new Error("Error: usuario_id o tweet_id son undefined")
    }

    const result = await pool.query(
      "SELECT 1 FROM likes WHERE usuario_id = $1 AND tweet_id = $2 LIMIT 1",
      [usuario_id, tweet_id]
    )
    return result.rows.length > 0
  }

  static async toggleLike(usuario_id: number, tweet_id: number): Promise<{ liked: boolean }> {
    const client = await pool.connect()
    try {
      await client.query('BEGIN')

      const result = await client.query(
        "SELECT * FROM likes WHERE usuario_id = $1 AND tweet_id = $2",
        [usuario_id, tweet_id]
      )

      let liked;
      if (result.rows.length > 0) {
        await client.query(
          "DELETE FROM likes WHERE usuario_id = $1 AND tweet_id = $2",
          [usuario_id, tweet_id]
        )
        liked = false
      } else {
        await client.query(
          "INSERT INTO likes (usuario_id, tweet_id) VALUES ($1, $2)",
          [usuario_id, tweet_id]
        )
        liked = true
      }

      await client.query('COMMIT')

      return { liked }

    } catch (error) {
      await client.query('ROLLBACK');
      console.error("Error al procesar el like:", error)
      throw new Error("No se pudo procesar el like.")
    } finally {
      client.release()
    }
  }

}
