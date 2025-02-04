import express from 'express'
import cors from 'cors'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'
import authRoutes from './routes/authRoutes.js'
import profileRoutes from './routes/profileRoutes.js'

dotenv.config()
const __dirname = dirname(fileURLToPath(import.meta.url))
const app = express()

// middlewares
app.use(cors())
app.use(express.json())
app.use(express.static(join(__dirname, '../')))

// rutas
app.use('/api/auth', authRoutes)
app.use('/api/profile', profileRoutes)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });


