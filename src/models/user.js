import pool from "../db/db.js"

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

    static async editNameUser(id, nombre){
        const [result] = await pool.execute("UPDATE usuarios SET nombre = ? WHERE id = ?", [nombre, id])

        return result
    }
}

