import pool from "../db/db.js"

export default class Tweet {
    static async createTweet({usuario_id, contenido}){
        const [result] = await pool.execute("INSERT INTO tweets (usuario_id, contenido) VALUES (?,?)", [usuario_id, contenido])

        return result.insertId
    }

    static async findAllTweets(usuario_id) {
        const query = `
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
            IF(? IS NOT NULL, 
               (SELECT EXISTS (
                   SELECT 1 FROM likes WHERE tweet_id = t.id AND usuario_id = ?
               )), 0
            ) AS usuario_dio_like
          FROM tweets t 
          JOIN usuarios u ON t.usuario_id = u.id 
          ORDER BY t.id DESC
        `
        const [rows] = await pool.execute(query, [usuario_id, usuario_id])
        return rows
    }

      static async findUserTweets(id) {
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
            WHERE u.id = ?
            ORDER BY t.fecha_creacion DESC
        `
        const [rows] = await pool.execute(query, [id])
        return rows
    }

    static async updateTweetImage(id, imagenTweetUrl) {
        const [result] = await pool.execute("UPDATE tweets SET imagen = ? WHERE id = ?", [imagenTweetUrl, id])
    
        return result
    }

    static async contarLikes(tweet_id) {
        const [result] = await pool.execute(
            "SELECT COUNT(*) AS totalLikes FROM likes WHERE tweet_id = ?", 
            [tweet_id]
        )
        return result[0].totalLikes
    }

    static async existeLike(usuario_id, tweet_id) {
        if (!usuario_id || !tweet_id) {
            throw new Error("Error: usuario_id o tweet_id son undefined")
        }

        const [result] = await pool.execute(
            "SELECT 1 FROM likes WHERE usuario_id = ? AND tweet_id = ? LIMIT 1",
            [usuario_id, tweet_id]
        )
        return result.length > 0
    }

    static async toggleLike(usuario_id, tweet_id) {
        const connection = await pool.getConnection()
        try {
            await connection.beginTransaction()
    
            const [result] = await connection.execute(
                "SELECT * FROM likes WHERE usuario_id = ? AND tweet_id = ?",
                [usuario_id, tweet_id]
            )
    
            let liked;
            if (result.length > 0) {
                await connection.execute(
                    "DELETE FROM likes WHERE usuario_id = ? AND tweet_id = ?",
                    [usuario_id, tweet_id]
                )
                liked = false
            } else {
                await connection.execute(
                    "INSERT INTO likes (usuario_id, tweet_id) VALUES (?, ?)",
                    [usuario_id, tweet_id]
                )
                liked = true
            }
    
            await connection.commit()
    
            return { liked }
    
        } catch (error) {
            await connection.rollback();
            console.error("Error al procesar el like:", error)
            throw new Error("No se pudo procesar el like.")
        } finally {
            connection.release()
        }
    }
    
}
