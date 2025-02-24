import express from 'express'
import cors from 'cors'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import authRoutes from './routes/authRoutes.js'
import tweetRoutes from './routes/tweetsRoutes.js'
import { indexRoute } from './routes/indexRoutes.js'

dotenv.config()
const app = express()
const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT_DIR = join(__dirname, 'views')
const PORT = process.env.PORT || 5000

// Middlewares 
app.use(cors({
  origin: process.env.URLFRONTEND || 'http://localhost:5000',
  credentials: true, 
}))
app.use(express.json()) 
app.use(cookieParser())
app.use(express.static(ROOT_DIR)) 

app.use('/', authRoutes) 
app.use('/content', tweetRoutes)
app.use('/', indexRoute)

app.use((err, req, res, next) => {
  console.error('Error:', err.stack)
  res.status(500).sendFile(join(ROOT_DIR, 'error.html')) 
})

app.listen(PORT, () => {
  console.log(`Servidor listo en puerto http://localhost:${PORT}`)
})