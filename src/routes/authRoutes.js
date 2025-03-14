import {Router} from 'express'
import { getRegister, getLogin, register, login, logout, checkSesion } from '../controllers/authController.js'

export const authRouter = Router()

//Ruta del registro de usuario
authRouter.get('/registro', getRegister)
authRouter.post('/registro', register)

//Ruta del login de usuario
authRouter.get('/login', getLogin)
authRouter.post('/login', login)

authRouter.post("/logout", logout)

authRouter.get("/checkSesion", checkSesion)
