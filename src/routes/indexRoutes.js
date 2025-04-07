import { Router } from "express"
import { authenticate } from '../middlewares/authMiddleware.js'
import { perfil } from "../controllers/authController.js"
import { getIndex, getExplore, getNotificaciones } from "../controllers/indexController.js"

export const indexRoute = Router()

indexRoute.get("/", getIndex)

indexRoute.get("/api/perfil", authenticate, perfil)

indexRoute.get("/notificaciones", authenticate, getNotificaciones)

indexRoute.get("/explore", getExplore)

