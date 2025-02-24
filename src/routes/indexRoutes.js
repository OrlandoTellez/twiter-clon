import { Router } from "express"
import { authenticate } from '../middlewares/authMiddleware.js'
import { perfil } from "../controllers/authController.js"

export const indexRoute = Router()

indexRoute.get("/", (req, res) => {
    res.sendFile(join(ROOT_DIR, 'index.html'))
})

indexRoute.get("/perfil", authenticate, perfil)

indexRoute.get(['/perfil', '/notificaciones', '/explorar'], (req, res) => {
    res.sendFile(join(ROOT_DIR, 'index.html'))
})