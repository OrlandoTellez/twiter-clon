import pool from "../db/db.js"

export default class User {
  static async create({ nombre_usuario, nombre, apellido, email, password }) {
    const emailExists = await User.findByEmail(email)

    if (emailExists) {
      throw new Error("Email ya registrado")
    }

    const result = await pool.query("INSERT INTO usuarios (nombre_usuario, nombre, apellido, email, password) VALUES ($1, $2, $3, $4, $5) RETURNING id", [nombre_usuario, nombre, apellido, email, password])

    return result.rows[0].id
  }

  static async findByEmail(email) {
    const result = await pool.query("SELECT * FROM usuarios WHERE email = $1", [email])
    return result.rows.length > 0 ? result.rows[0] : null
  }

  static async findById(id) {
    const result = await pool.query("SELECT * FROM usuarios WHERE id = $1", [id])

    return result.rows.length > 0 ? result.rows[0] : null
  }

  static async editNameUser(id, nombre) {
    const result = await pool.query("UPDATE usuarios SET nombre = $1 WHERE id = $2", [nombre, id])

    return result
  }

  static async editBioUser(id, descripcion) {
    const result = await pool.query("UPDATE usuarios SET descripcion = $1 WHERE id = $2", [descripcion, id])

    return result
  }
}

