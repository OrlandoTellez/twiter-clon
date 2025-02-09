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

// Middlewares clave
app.use(cors({
  origin: process.env.URLFRONTEND || 'http://localhost:5000',
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}))
app.use(express.json()) // Para parsear JSON en las peticiones

// 1. Servir TODOS los archivos estáticos del directorio raíz
app.use(express.static(ROOT_DIR)) // Esto servirá index.html, explore.html, etc. automáticamente

// 2. Servir rutas específicas para subdirectorios (opcional pero recomendado para claridad)
app.use('/assets', express.static(join(ROOT_DIR, 'assets')))
app.use('/auth', express.static(join(ROOT_DIR, 'auth')))
app.use('/componentes', express.static(join(ROOT_DIR, 'componentes')))

// 3. Manejar rutas de la aplicación (SPA) para HTML5 History Mode
app.get(['/perfil', '/notificaciones', '/explorar'], (req, res) => {
  res.sendFile(join(ROOT_DIR, 'index.html'))
})

// 4. Usar rutas de autenticación
app.use('/api', authRoutes) // Mejor prefijo /api para endpoints

// 5. Manejo de errores mejorado
app.use((err, req, res, next) => {
  console.error('Error:', err.stack)
  res.status(500).sendFile(join(ROOT_DIR, 'error.html')) // Crea esta página
})

// Iniciar servidor
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Servidor listo en puerto ${PORT}`)
})