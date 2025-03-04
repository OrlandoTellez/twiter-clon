import pool from "../db/db.js"

export default class Tweet {
    static async createTweet({usuario_id, contenido}){
        const [result] = await pool.execute("INSERT INTO tweets (usuario_id, contenido) VALUES (?,?)", [usuario_id, contenido])

        return result.insertId
    }

    static async findAllTweets(){
        const [rows] = await pool.execute(`
            SELECT 
            t.id, 
            t.contenido, 
            t.usuario_id, 
            u.nombre_usuario, 
            u.nombre, u.apellido, 
            u.imagen_perfil 
            FROM tweets t 
            JOIN usuarios u 
            ON t.usuario_id = u.id ORDER BY t.id DESC`)

        return rows
    }

    static async findUserTweets(id) {
        const [rows] = await pool.execute(`
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
            t.fecha_creacion AS fecha_tweet
            FROM tweets t
            JOIN usuarios u ON t.usuario_id = u.id
            WHERE u.id = ?
            ORDER BY t.fecha_creacion DESC
        `, [id])
    
        return rows
    }
}
