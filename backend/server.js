import express from 'express'
import cors from 'cors'
import { join, resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import dotenv from 'dotenv'
import authRoutes from './routes/authRoutes.js'

dotenv.config()
const app = express()
const __dirname = dirname(fileURLToPath(import.meta.url))

// Ruta base del proyecto (sube un nivel desde 'backend')
const ROOT_DIR = resolve(__dirname, '..')

// middlewares
app.use(cors({
  origin: process.env.URLFRONTEND || 'http://localhost:5000',
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}))

// Servir archivos estáticos (solo los que necesitas)
app.use('/assets', express.static(join(ROOT_DIR, 'assets')))
app.use('/css', express.static(join(ROOT_DIR, 'css')))
app.use('/js', express.static(join(ROOT_DIR, 'js')))
app.use('/auth', express.static(join(ROOT_DIR, 'auth')))
app.use('/componentes', express.static(join(ROOT_DIR, 'componentes')))

// Ruta principal para servir el index.html
app.get("/", (req, res) => {
    res.sendFile(join(ROOT_DIR, 'index.html'))
})

// Manejo de rutas de autenticación
app.use('/', authRoutes)

// Middleware de manejo de errores
app.use((err, req, res, next) => {
  console.error('Error en producción:', err.stack)
  res.status(500).json({ error: 'Algo salió mal!' })
})

// Servidor en el puerto definido
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
