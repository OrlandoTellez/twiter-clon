import express from 'express'
import cors from 'cors'
import { join, resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import dotenv from 'dotenv'
import authRoutes from './routes/authRoutes.js'

dotenv.config()
const app = express()
const __dirname = dirname(fileURLToPath(import.meta.url))

const ROOT_DIR = join(__dirname, 'frontend')

// Middlewares 
app.use(cors({
  origin: process.env.URLFRONTEND || 'http://localhost:5000',
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}))
app.use(express.json()) 

app.use(express.static(ROOT_DIR)) 

app.get(['/perfil', '/notificaciones', '/explorar'], (req, res) => {
  res.sendFile(join(ROOT_DIR, 'index.html'))
})

app.use('/assets', express.static(join(ROOT_DIR, 'assets')))
app.use('/auth', express.static(join(ROOT_DIR, 'auth')))
app.use('/componentes', express.static(join(ROOT_DIR, 'componentes')))


app.use('/', authRoutes) 

app.get('/', (req, res) => {
  res.sendFile(join(ROOT_DIR, 'index.html'))
})

console.log('ROOT_DIR:', ROOT_DIR)

app.use((err, req, res, next) => {
  console.error('Error:', err.stack)
  res.status(500).sendFile(join(ROOT_DIR, 'error.html')) 
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Servidor listo en puerto http://localhost:${PORT}`)
})