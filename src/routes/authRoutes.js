import {Router} from 'express'
import { register, login, logout, checkSesion } from '../controllers/authController.js'

export const authRouter = Router()

//Ruta del registro de usuario
authRouter.post('/registro', register)

//Ruta del login de usuario
authRouter.post('/login', login)

authRouter.post("/logout", logout)

authRouter.get("/checkSesion", checkSesion)
