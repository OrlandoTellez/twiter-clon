import { Router } from "express"
import { authenticate } from '../middlewares/authMiddleware'
import { perfil } from "../controllers/authController"
import { getIndex, getExplore, getNotificaciones } from "../controllers/indexController"

export const indexRoute = Router()

indexRoute.get("/", getIndex)

indexRoute.get("/api/perfil", authenticate, perfil)

indexRoute.get("/notificaciones", authenticate, getNotificaciones)

indexRoute.get("/explore", getExplore)

