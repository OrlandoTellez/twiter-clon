import pg from "pg"
import dotenv from "dotenv"

dotenv.config()

const dbConfig = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
}

const pool = new pg.Pool({
  ...dbConfig,
})

// Probando conexion a la base de datos haciendo un query
pool.query('SELECT 1')
  .then(() => console.log('Conexión exitosa a PostgreSQL'))
  .catch(err => console.error('Error de conexión a PostgreSQL:', err))

export default pool
