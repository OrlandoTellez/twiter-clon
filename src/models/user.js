import pool from "../config/db.js"

export default class User {
    static async create({nombre_usuario, nombre, apellido, email, password}){
        const emailExists = await User.findByEmail(email)

        if(emailExists){
            throw new Error("Email ya registrado")
        }

        const [result] = await pool.execute("INSERT INTO usuarios (nombre_usuario, nombre, apellido, email, password) VALUES (?,?, ?, ?, ?)", [nombre_usuario, nombre, apellido, email, password])

        return result.insertId
    }

    static async findByEmail(email){
        const[rows] = await pool.execute("SELECT * FROM usuarios WHERE email = ?", [email])
        return rows.length > 0 ? rows[0] : null
    }

    static async findById(id){
        const [rows] = await pool.execute("SELECT * FROM usuarios WHERE id = ?", [id])

        return rows.length > 0 ? rows[0] : null
    }

    static async createTweet({usuario_id, contenido}){
        const [result] = await pool.execute("INSERT INTO tweets (usuario_id, contenido) VALUES (?,?)", [usuario_id, contenido])

        return result.insertId
    }

    static async findAllTweets(){
        const [rows] = await pool.execute("SELECT t.id, t.contenido, t.usuario_id, u.nombre_usuario, u.nombre, u.apellido FROM tweets t JOIN usuarios u ON t.usuario_id = u.id ORDER BY t.id DESC")

        return rows
    }

    static async findUserTweets(id){
        const [rows] = await pool.execute("SELECT * FROM tweets WHERE usuario_id = ? ORDER BY id DESC", [id])

        return rows
    }

    static async updateProfileImage(id, imagenUrl) {
        const [result] = await pool.execute("UPDATE usuarios SET imagen_perfil = ? WHERE id = ?", [imagenUrl, id])
        
        return result
    }
}

