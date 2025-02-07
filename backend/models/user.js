import pool from "../config/db.js"

export default class User {
    static async create({email, password}){
        const [result] = await pool.execute("INSERT INTO users (email, password) VALUES (?, ?)", [email, password])

        return result.insertId
    }

    static async findByEmail(email){
        const[rows] = await pool.execute("SELECT * FROM users WHERE email = ?", [email])
        return rows[0]
    }
}

