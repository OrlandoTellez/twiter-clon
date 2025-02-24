import {Router} from 'express'
import { register, login, perfil, logout, checkSesion } from '../controllers/authController.js'

const router = Router()

//Ruta del registro de usuario
router.post('/registro', register)

//Ruta del login de usuario
router.post('/login', login)

//Ruta del perfil

router.post("/logout", logout)

router.get("/checkSesion", checkSesion)

export default router