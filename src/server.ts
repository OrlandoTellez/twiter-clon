import express, { Request, Response, NextFunction } from 'express'
import cors from 'cors'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import { authRouter } from './routes/authRoutes'
import { tweetRouter } from './routes/tweetsRoutes'
import { indexRoute } from './routes/indexRoutes'
import { imageRouter } from './routes/imageRoutes'
import { editRouter } from './routes/editUserProfileRoutes'

dotenv.config()
const app = express()
const __dirname = dirname(fileURLToPath(import.meta.url))
export const ROOT_DIR = join(__dirname, 'views')
const PORT: number = Number(process.env.PORT) || 5000

app.set('views', ROOT_DIR)
app.set('view engine', 'ejs')

// Middlewares 
app.use(cors({
  origin: process.env.URLFRONTEND || 'http://localhost:3000',
  credentials: true, 
  allowedHeaders: ['Content-Type', 'Authorization']
}))
app.use(express.json()) 
app.use(cookieParser())

app.use(express.static(ROOT_DIR)) 

app.use('/auth', authRouter) 
app.use('/image', imageRouter)
app.use('/edit', editRouter)
app.use('/', tweetRouter)
app.use('/', indexRoute)  

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send("Error interno del servidor");
});


app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`))
