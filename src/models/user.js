import pool from "../config/db.js"

export default class User {
    static async create({username, email, password}){
        const emailExists = await User.findByEmail(email)

        if(emailExists){
            throw new Error("Email ya registrado")
        }

        const [result] = await pool.execute("INSERT INTO users (username, email, password) VALUES (?, ?, ?)", [username, email, password])

        return result.insertId
    }

    static async findByEmail(email){
        const[rows] = await pool.execute("SELECT * FROM users WHERE email = ?", [email])
        return rows[0].length > 0 ? rows[0] : null
    }
}

