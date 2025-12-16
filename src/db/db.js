import mysql from "mysql2/promise"
import dotenv from "dotenv"

dotenv.config()

const dbConfig = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
} 

const pool = mysql.createPool({
    ...dbConfig,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})

pool.getConnection()
  .then(conn => {
    console.log('Conexión exitosa a MySQL')
    conn.release()
  })
  .catch(err => console.error('Error de conexión a MySQL:', err))

export default pool
