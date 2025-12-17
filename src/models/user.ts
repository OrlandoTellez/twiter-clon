import pool from "../db/db"

export interface UserData {
  id: number;
  nombre_usuario: string;
  nombre: string;
  apellido: string;
  email: string;
  password: string;
  imagen_perfil?: string;
  imagen_banner?: string;
  descripcion?: string;
}

export default class User {
  static async create({ nombre_usuario, nombre, apellido, email, password }: {
    nombre_usuario: string;
    nombre: string;
    apellido: string;
    email: string;
    password: string;
  }): Promise<number> {
    const emailExists = await User.findByEmail(email)

    if (emailExists) {
      throw new Error("Email ya registrado")
    }

    const result = await pool.query("INSERT INTO usuarios (nombre_usuario, nombre, apellido, email, password) VALUES ($1, $2, $3, $4, $5) RETURNING id", [nombre_usuario, nombre, apellido, email, password])

    return result.rows[0].id
  }

  static async findByEmail(email: string): Promise<UserData | null> {
    const result = await pool.query("SELECT * FROM usuarios WHERE email = $1", [email])
    return result.rows.length > 0 ? result.rows[0] : null
  }

  static async findById(id: number): Promise<UserData | null> {
    const result = await pool.query("SELECT * FROM usuarios WHERE id = $1", [id])

    return result.rows.length > 0 ? result.rows[0] : null
  }

  static async editNameUser(id: number, nombre: string): Promise<any> {
    const result = await pool.query("UPDATE usuarios SET nombre = $1 WHERE id = $2", [nombre, id])

    return result
  }

  static async editBioUser(id: number, descripcion: string): Promise<any> {
    const result = await pool.query("UPDATE usuarios SET descripcion = $1 WHERE id = $2", [descripcion, id])

    return result
  }
}

