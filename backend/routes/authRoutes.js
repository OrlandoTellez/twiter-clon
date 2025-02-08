import {Router} from 'express'
import {register, login, perfil} from '../controllers/authController.js'
import { authenticate } from '../middlewares/authMiddleware.js'

const router = Router()

//Ruta 

router.get("/", (req, res) => {
    res.render("index.html")
})

//Ruta del registro de usuario
router.post('/auth/registro', register)

//Ruta del login de usuario
router.post('/login', login)

//Ruta del perfil
router.get("/perfil", authenticate, perfil)

export default router