import express from 'express'
import cors from 'cors'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import dotenv from 'dotenv'
import authRoutes from './routes/authRoutes.js'
// import profileRoutes from './routes/profileRoutes.js'

dotenv.config()
const __dirname = dirname(fileURLToPath(import.meta.url))
const app = express()

// middlewares
app.use(cors({
  origin: process.env.URLFRONTEND || 'http://localhost:5000',
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'] 
}))
app.use(express.static(join(__dirname, '../')))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// rutas
app.use('/', authRoutes)
// app.use('/api/profile', profileRoutes)

app.use((err, req, res, next) => {
  console.error('Error en producción:', err.stack)
  res.status(500).json({ error: 'Algo salió mal!' })
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });


